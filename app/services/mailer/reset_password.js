const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

// const args = {
// 	token: 'blalblabla',
// 	email: 'sequoya@wittycircle.com'
// };

const send_mail = (data, token) => {
	let mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
	wm.content(mail);
	wm.reply(mail, 'noreply@wittycircle.com');
	mail.setTemplateId(TEMPLATES.reset_password);
	const category = new helper.Category('reset_password');
	mail.addCategory(category);

	data.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject = 'Reset password';
		let sub = {
			'*|ffname|*': e.first_name || '',
			'*|EMAIL|*': e.email || '',
			'*|FURL|*': wm.url(`reset/password/${token}`)
		};
		// console.log(sub)
		// console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, e.email);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);
	}); //foreach
	wm.send(mail, 'reset_password');
	return null;
};

const reset_password = args => {
	const request = h.spe_profile({ 'u.email': args.email }).select('u.email');

	return request.then(data => send_mail(data, args.token));
}; //exports

module.exports = reset_password;
