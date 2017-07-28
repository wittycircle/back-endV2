const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const invitation = require('../../models/invitation');
const _ = require('lodash');

const updateInvitation = (uid, mails) => {
	const parseMails = typeof mails === 'string' ? JSON.parse(mails) : mails;
	return db(TABLES.INVITATION)
		.whereIn('mail_to', parseMails)
		.del()
		.then(r => {
			let newArray = []
			console.log('HELLO =====>' , parseMails);
			parseMails.forEach(mail => {
				newArray.push({ user_id: uid, mail_to: mail });
			});
			if (newArray.length) 
				return db.batchInsert('invitations', newArray)
					.then(r => parseMails);
		})
}

const send_mail = (data, sender, invite, category = false) => {
	console.log('SEND MAIL CALLED');
	let mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
	wm.content(mail);
	wm.reply(mail, 'noreply@wittycircle.com');
	mail.setTemplateId(TEMPLATES.invite_user);

	if (category) mail.addCategory({ category });
	else {
		const otherCategory = new helper.Category('invite_user');
		mail.addCategory(otherCategory);
	}

	data.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject = sender.fullName + ' invited you to join Wittycircle';
		let sub = {
			'*|FNAME|*': sender.first_name,
			'*|FLNAME|*': sender.last_name,
			'*|PIMG|*': wm.transform(sender.picture),
			'*|FUNAME|*': sender.fullName,
			'*|FLOC|*': wm.location(sender),
			'*|URL|*': wm.url(`/invite/${invite}`),
			MAIL: e
		};
		wm.subject(pers, subject);
		wm.to(pers, e);
		// console.log('PERS', pers);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);
	});
	wm.send(mail, 'invite_user');
	return null;
};
// args{ mail: [], invite_id}

const deleteGmailContacts = uid => {
	db(TABLES.GMAILCONTACTS)
		.where('user_id', uid)
		.del()
		.then( r => {
			console.log('All mails have been deleted !');
		})
}

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

	let invite = db(TABLES.USERS).first('invite_link').where('id', args.uid);

	if (args.checked) {
		updateInvitation(args.uid, JSON.stringify(args.mailList)).then( emails => {
			return Promise.all([
				request,
				invite
			]).then(([sender, invite]) => {
				deleteGmailContacts(args.uid);
				send_mail(emails, sender[0], invite.invite_link, 'gmail_auth')
			});
		});
	} else {
		invitation.verifyInvite(args.mailList).then(verifiedEmails => {
			if (!verifiedEmails || !verifiedEmails.length) {
				console.log('All already invited, [verified emails is empty]');
				return null;
			}
			updateInvitation(args.uid, verifiedEmails).then( emails => {
				return Promise.all([
					request,
					invite
				]).then(([sender, invite]) =>
					send_mail(emails, sender[0], invite.invite_link, args.category)
				);
			})
		});
	}
}; //exports

module.exports = invite_user;
