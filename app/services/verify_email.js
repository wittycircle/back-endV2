const legit = require('legit');
const { wm, TEMPLATES } = require('./mailer/wittymail');
const { db, TABLES } = require('../models/index');
const helper = require('sendgrid').mail;

// Quick version
// const verifyEmailExistence = (email, callback) => { 
// 	if (email && email.indexOf('@') >= 0) {
// 		legit(email, (err, validation, addresses) => {
// 		    if (validation == true) {
// 		        callback(true)
// 		    } else {
// 		        callback(false)
// 		    }
// 		});
// 	} else
// 		callback(false);
// };

const chunk = (array, callback) => {
	let chunks 		= [],
		tempArray 	= [];

	const length 	= array.length

	array.forEach( (e, i) => {
		tempArray.push(e.mail_to)
		if (tempArray.length >= 1000) {
			chunks.push(tempArray)
			tempArray = []
		}
		if (i === length - 1) {
			chunks.push(tempArray)
			return callback(chunks);
		}	
	});
}

const send_mail = (data) => {
	console.log('SEND MAIL CALLED');
	
	data.forEach((sub, i) => {
		let mail = new helper.Mail();
		wm.from(mail, 'notifications@wittycircle.com via Witty');
		wm.content(mail);
		wm.reply(mail, 'notifications@wittycircle.com');
		mail.setTemplateId(TEMPLATES.invite_user);

		mail.addCategory('hello');
		sub.forEach( (e, i) => {
			console.log(i);
			let pers = new helper.Personalization();
			let subject = '*|FUNAME|* just sent you a private invite to join Witty';
			let sub = {
				MAIL: e
			};
			wm.subject(pers, subject);
			wm.to(pers, e);

			wm.substitutions(pers, sub);
			mail.addPersonalization(pers);
		})
		console.log('hello')
	});
	return null

};

const retrieveEmails = () => {
	db(TABLES.GMAILCONTACTS)
	.select('mail_to')
	.then(r => {
		chunk(r, newArray => {

			send_mail(newArray)
		});
	});
};

retrieveEmails();