const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

const send_mail = (sender, public_id, title) => {
	let mail = new helper.Mail();
	wm.from(mail, 'notifications@wittycircle.com', 'Witty');
	wm.content(mail);
	wm.reply(mail, 'notifications@wittycircle.com');
	mail.setTemplateId(TEMPLATES.new_project);
	const category = new helper.Category('new_project');
	mail.addCategory(category);

	sender.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject = "Your project is now live - What's next?";
		let sub = {
			'*|FNAME|*' 	: e.first_name,
			'*|PLINK|*' 	: wm.url(`project/${public_id}/${title}`),
			'*|BASICS|*' 	: wm.url(`project/update?id=${public_id}`),
			'*|STORY|*' 	: wm.url(`project/update?id=${public_id}`),
			'*|NEEDS|*' 	: wm.url('meet'),
			MAIL: e.email
		};
		// console.log(sub)
		// console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, e.email);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);
	});
	wm.send(mail, 'new_project');
	return null;
};

const new_project = args => {
	let sender = h.spe_profile({ 'u.id': args.uid }).select('u.email');

	return sender.then(e => send_mail(e, args.public_id, args.title));
}; //exports

module.exports = new_project;
