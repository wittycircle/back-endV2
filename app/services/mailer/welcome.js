const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

/*
args: {
	email: string
}
*/

const send_mail = (email, data) => {
	let	mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
	wm.content(mail)
	wm.reply(mail, "noreply@wittycircle.com");
	mail.setTemplateId(TEMPLATES.welcome)
	
		let pers = new helper.Personalization();
		let subject = '*|FFNAME|*  *|FLNAME|* sent you a message';
		let sub = {
			"*|FNAME|*": data,
		};
		console.log(sub)
		console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, email);
		wm.substitutions(pers, sub)
	    mail.addPersonalization(pers)
	wm.send(mail); 
	return null;
};
	
const welcome = (args) => {
	const request = db.first('p.first_name as username')
		.from(TABLES.USERS + ' as u')
		.join(TABLES.USER_PROFILES + ' as p', 'u.profile_id', 'p.id')
		.where('u.email', args.email)


	return request.then((username) => send_mail(args.email, username.username))
};//exports

module.exports = welcome
