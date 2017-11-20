const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const invitation = require('../../models/invitation');
const _ = require('lodash');

const chunk = (array, callback) => {
	let chunks 		= [],
		tempArray 	= [];

	const length 	= array.length

	if (length > 1000) {
		array.forEach( (e, i) => {
			tempArray.push(e)
			if (tempArray.length >= 1000) {
				chunks.push(tempArray)
				tempArray = []
			}
			if (i === length - 1) {
				chunks.push(tempArray)
				return callback(chunks);
			}	
		});
	} else
		return callback([array])
}

const updateInvitation = (uid, mails) => {
 	const parseMails = (typeof mails === 'string' || typeof mails === 'object') ? JSON.parse(mails) : mails;

 	console.log('TYPE OF MAILSSSSS ======> ', typeof mails)
 	console.log('TYPE OF PARSEMAILSSS ======>', typeof parseMails);

	return db(TABLES.INVITATION)
		.whereIn('mail_to', parseMails)
		.del()
		.then(r => {
			let newArray = []
			parseMails.forEach(mail => {
				newArray.push({ user_id: uid, mail_to: mail });
			});
			if (newArray.length)
				return db.batchInsert('invitations', newArray)
					.then(r => parseMails);
		})
};

// const deleteGmailContacts = uid => {
// 	db(TABLES.GMAILCONTACTS)
// 		.where('user_id', uid)
// 		.del()
// 		.then( r => {
// 			console.log('All mails have been deleted !');
// 		})
// }

const send_mail = (data, sender, u_skills, invite, category = false) => {
	console.log('SEND MAIL CALLED');
	
	data.forEach( subArray => {
		let mail = new helper.Mail();
		wm.from(mail, 'notifications@wittycircle.com', sender.fullName + ' via Witty');
		wm.content(mail);
		wm.reply(mail, 'notifications@wittycircle.com');
		mail.setTemplateId(TEMPLATES.invite_user);

		if (category) mail.addCategory({ category });
		else {
			const otherCategory = new helper.Category('invite_user');
			mail.addCategory(otherCategory);
		}

		subArray.forEach( (e, i) => {
			let pers = new helper.Personalization();
			let subject = "*|UF_NAME|*'s invitation is still waiting for you";
			let sub = {
				'*|UF_NAME|*' 		: sender.first_name,
				'*|UL_NAME|*' 		: sender.last_name,
				'*|U_PICTURE|*' 	: wm.transform(sender.picture),
				'*|UFU_NAME|*' 		: sender.fullName,
				'*|U_DESC|*' 		: wm.truncate(sender.description) || '',
				'*|I_URL|*' 		: wm.url(`/invite/${invite}`), 
				'*|LOCATION_BLOC|*' : wm.location_bloc(wm.location(sender)),
				'*|NETWORK_BLOC|*' 	: wm.network_bloc(u_skills[0].network),
				'*|SKILL_BLOC|*' 	: wm.skills_bloc(u_skills[0].skills),
				MAIL: e
			};
			wm.subject(pers, subject);
			wm.to(pers, e);

			wm.substitutions(pers, sub);
			mail.addPersonalization(pers);
		});

		wm.send(mail, 'invite_user');
	});
	return null

};
// args{ mail: [], invite_id}

const invite_user = args => {
	let request = db
		.distinct(
			h.p_uarray.concat([
				h.format_location,
				db.raw('CONCAT(loc.city, ", ", loc.country) as location')
			])
		)
		.from(TABLES.PROFILES + ' as p')
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
		.join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
		.where('p.user_id', args.uid)

	const user_skills = db
		.select(
			'p.user_id as user_id',
			'nl.name as network',
			db.raw(`GROUP_CONCAT(DISTINCT sk.name) as skills`))
		.from(TABLES.PROFILES + ' as p')
		.join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.user_id')
		.join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
		.leftJoin(TABLES.SKILLS + ' as sk', 'sk.id', 'us.skill_id')
		.where('us.user_id', args.uid);

	let invite = db(TABLES.USERS).first('invite_link').where('id', args.uid);

	updateInvitation(args.uid, JSON.stringify(args.mailList)).then( emails => {
		return Promise.all([
			request,
			invite,
			user_skills
		]).then(([sender, invite, u_skills]) => {
			// if (args.type === 'gmail_auth')
			// 	deleteGmailContacts(args.uid);
			chunk(emails, emailsArray => {
				console.log(emailsArray);
				send_mail(emailsArray, sender[0], u_skills, invite.invite_link, args.type)
			});
		});
	});
}; //exports

module.exports = invite_user;
