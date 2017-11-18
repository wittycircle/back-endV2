const { wm, TEMPLATES } = require('../wittymail');
const helper = require('sendgrid').mail;
const h = require('../../../models/helper'); //NIK
const { db, TABLES } = require('../../../models/index');
const invitation = require('../../../models/invitation');


const send_mail = (data) => {
	let mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', 'Witty');
	wm.content(mail);
	wm.reply(mail, 'noreply@wittycircle.com');
	mail.setTemplateId(TEMPLATES.invite_bulk);
	const category = new helper.Category('bulk_gmail_emails');
	mail.addCategory(category);

	data.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject = '5 people from your network recently joined us';
		let sub = {
			// '*|MESSAGE|*': u.message,
			// '*|FNAME|*': s.first_name,
			// '*|PIMG|*': wm.transform(s.picture),
			// '*|FUNAME|*': s.fullName,
			// '*|FDESC|*': s.description,
			// '*|URL|*': wm.url(`welcome/${u.url}/${u.token}`),
			// '*|FNETWORK|*': u.url
		};
		console.log(sub);
		console.log('\n-------------------------------------------------\n');
		wm.subject(pers, subject);
		wm.to(pers, e);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);
	}); //foreach
	wm.send(mail, 'bulk_gmail_emails');
	return null;
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

const bulk_gmail = (number) => {
	const mail = db.distinct('mail_to')
		.from('gmail_auth_contacts')
		.where('sent', '0')
		.limit(number)

	Promise.all([mail]).then(r => {
		invitation.verifyUsers(r[0].map(e => e.mail_to))
			.then(emails => {
				send_mail(emails);
				update_bulk_gmail(emails);
			});
	});
};

bulk_gmail(1000);
