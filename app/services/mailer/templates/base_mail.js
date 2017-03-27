const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('./app/models/helper');
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

const send_mail = (data) => {
	let	mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
	wm.content(mail)
	wm.reply(mail, "noreply@wittycircle.com");
	mail.setTemplateId(TEMPLATES.new_mail)
	
	data.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject = '*|FFNAME|*  *|FLNAME|* sent you a message';
		let sub = {
			"*|SUBSTITUTIONS|*": 'VALUE',
		};
		console.log(sub)
		console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, e.email);
		wm.substitutions(pers, sub)
	    mail.addPersonalization(pers)
	}); 
	wm.send(mail); 
	return null;
};
	
const new_mail = () => {
	const request = db.select(selection).from(TABLES)
	
	return request.then(() => send_mail())
};//exports

module.exports = new_mail