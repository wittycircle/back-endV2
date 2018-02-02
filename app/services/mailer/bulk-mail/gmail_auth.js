const { wm, TEMPLATES } = require('../wittymail');
const helper = require('sendgrid').mail;
const h = require('../../../models/helper'); //NIK
const { db, TABLES } = require('../../../models/index');
const invitation = require('../../../models/invitation');

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

const send_mail = (data) => {

	chunk(data, dataArray => {

		dataArray.forEach(subArray => {
			let mail = new helper.Mail();
			wm.from(mail, 'noreply@wittycircle.com', 'Witty');
			wm.content(mail);
			wm.reply(mail, 'noreply@wittycircle.com');
			mail.setTemplateId(TEMPLATES.invite_bulk);
			const category = new helper.Category('bulk_gmail_emails');
			mail.addCategory(category);

			subArray.forEach((e, i) => {
				let pers = new helper.Personalization();
				let subject = '38 people from your network recently joined us / Your premium invite';
				let sub = {
					// '*|MESSAGE|*': u.message,
					// '*|FNAME|*': s.first_name,
					// '*|PIMG|*': wm.transform(s.picture),
					// '*|FUNAME|*': s.fullName,
					// '*|FDESC|*': s.description,
					// '*|URL|*': wm.url(`welcome/${u.url}/${u.token}`),
					// '*|FNETWORK|*': u.url
				};
				// console.log(sub);
				// console.log('\n-------------------------------------------------\n');
				wm.subject(pers, subject);
				wm.to(pers, e);
				wm.substitutions(pers, sub);
				mail.addPersonalization(pers);
			}); //foreach

			console.log('Sent');
			wm.send(mail, 'invite_user');
		});
	});
	return null;
};

const calculateDate = () => {
	const ONE_DAY = 1000 * 60 * 60 * 24
	let refDate, dateNow, difference_ms, dateFlow, numberInvite;

	refDate 		= new Date('2018-02-01T19:26:54.066Z').getTime();
	dateNow 		= (new Date).getTime();

	difference_ms 	= Math.abs(dateNow - refDate);
	dateFlow 		= Math.round(difference_ms/ONE_DAY);

	numberInvite 	= 5000 + (5000 * ( 10 * dateFlow / 100 ));

	return numberInvite
};

const update_bulk_gmail = (emails) => {
	const query = db('gmail_auth_contacts')
		.whereIn('mail_to', emails)
		.update({ 
			sent : 1,
			sent_date : new Date()
		})

	Promise.all([query]);
};

const bulk_gmail = () => {

	const mail = db.distinct('mail_to')
		.from('gmail_auth_contacts')
		.where('sent', '0')
		.andWhereRaw('mail_to NOT LIKE "%angel.co" AND user_id != 6269')
		.limit(calculateDate())

	const secondCheckMail = (mails) => db // CHECK NO DUPLICATE AND ALREADY SENT FROM AT LAST 2 WEEKS AGO
		.select(
			'mail_to',
			db.raw('max(sent_date) as last_sent')
		)
		.from('gmail_auth_contacts')
		.whereIn('mail_to', mails)
		.groupByRaw('mail_to HAVING DATE(last_sent) < NOW() - INTERVAL 14 DAY OR last_sent IS NULL');

	Promise.all([mail]).then(r => {
		invitation.verifyUsers(r[0].map(e => e.mail_to))
			.then(emails => {
				Promise.all([secondCheckMail(emails)])
					.then(readyMails => {
						readyMails = readyMails[0].map(el => {
							return el.mail_to;
						});
						send_mail(readyMails);
						update_bulk_gmail(readyMails);
					})
			});
	});
};

const runTime = () => {
	// bulk_gmail();
	setInterval(() => {
		bulk_gmail() 
	}, (1000 * 60 * 60 * 24));
}

runTime();