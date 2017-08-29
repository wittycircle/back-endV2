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
	mail.setTemplateId(TEMPLATES.complete_project);

	const category = new helper.Category('complete_project');
	mail.addCategory(category);

	const projectUrl = 'https://www.wittycircle.com/project/update?id='

	data.splice(0, 1);
	data.forEach((e) => {
		let pers = new helper.Personalization();
		let subject = 'To Determine'
		let sub = {
			'*|PROJECT_URL|*': projectUrl + e.public_id,
			'*|PROJECT_NAME|*': e.title.replace(/ /g, '-')
		};
		wm.subject(pers, subject);
		wm.to(pers, 'jayho@wittycircle.com' /* e.email */);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);

	});
	wm.send(mail, 'complete_project');
	return null;
};

const completeProject = (day) => {
	let c_project = db
		.select('pr.id',
				'pr.title',
				'pr.public_id',
				'u.email')
		.from(TABLES.PROJECTS + ' as pr')
		.innerJoin(TABLES.USERS + ' as u', 'u.id', 'pr.user_id')
		.where( function() { 
			this.whereNull('logo').orWhereNull('picture').orWhere('logo', '').orWhere('picture', '') })
		.andWhereRaw(`date(pr.creation_date) = curdate() - interval ${day} day`)

	return Promise.all([c_project])
		.then( ([r]) => {
			send_mail(r);
		})
		.catch(console.error);
}; //exports


module.exports = completeProject;