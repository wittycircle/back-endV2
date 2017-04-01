const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');


const send_mail = (data) => {
	let	mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
	wm.content(mail)
	wm.reply(mail, "noreply@wittycircle.com");
	mail.setTemplateId(TEMPLATES.validate_account)
	
		let pers = new helper.Personalization();
		let subject = 'Validate your Wittycircle account';
		let sub = {
			"*|LINK|*": wm.url(data.token),
			"*|EMAIL|*": data.email,
		};
		console.log(sub)
		console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, /*data.email*/ 'sequoya@wittycircle.com');
		wm.substitutions(pers, sub)
	    mail.addPersonalization(pers)
	wm.send(mail); 
	return null;
};
	
const validate_account = (args) => {
	return send_mail(args)
}; //exports

module.exports = validate_account

