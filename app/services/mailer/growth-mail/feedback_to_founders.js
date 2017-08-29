const { wm, TEMPLATES } = require('../wittymail');
const helper = require('sendgrid').mail;
// const h = require('../../../models/helper');
// const invitation = require('../../models/invitation');
const { db, TABLES } = require('../../../models/index');

const send_mail = (data) => {
	let mail = new helper.Mail();
	/* Mail Header */
	wm.from(mail, 'notifications@wittycircle.com', 'Witty');
	wm.content(mail);
	wm.reply(mail, 'notifications@wittycircle.com');
	mail.setTemplateId(TEMPLATES.feedback);

	const category = new helper.Category('feedback-to-founder');
	mail.addCategory(category);

	data.forEach( (e) => {
		let pers = new helper.Personalization();
		let subject = 'Are you free this week, *|FNAME|*';
		let sub = {
			'*|FNAME|*': e.first_name,
		};
		wm.subject(pers, subject);
		wm.to(pers, e.email /* e.email */);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);

	});
	wm.send(mail, 'feedback-to-founder');
	return null;
};

const feedback = () => {
	let users = db(TABLES.USERS + ' as u')
		.select('u.id', 'email', 'p.first_name')
		.join(TABLES.PROFILES + ' as p', 'u.id', 'p.user_id')
		.whereRaw("date(u.creation_date) = curdate() - 3 && email not like '%witty.com%'")

	return Promise.all([users])
		.then( ([r]) => {
		    console.log('SEND');
			send_mail(r)
		})
		.catch(console.error);
}; //exports

module.exports = feedback;
