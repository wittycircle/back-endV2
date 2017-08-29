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
	mail.setTemplateId(TEMPLATES.complete_profile);

	const category = new helper.Category('complete_profile');
	mail.addCategory(category);

	const wittyUrl = 'https://www.wittycircle.com/'

	data.forEach((e) => {
		let pers = new helper.Personalization();
		let subject = `People want to know more about you, ${e.first_name}`;
		let sub = {
			'*|PROFILE_URL|*': wittyUrl + e.username,
		};
		wm.subject(pers, subject);
		wm.to(pers, e.email /* e.email */);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);

	});
	wm.send(mail, 'complete_profile');
	return null;
};

const completeProfile = () => {
	let c_profile = db
		.select('u.id',
				'p.first_name',
				'u.username', 
				'u.email',
				'u.creation_date')
		.from(TABLES.USERS + ' as u')
		.leftJoin(TABLES.USER_SKILLS + ' as us', 'u.id', 'us.user_id')
		.leftJoin(TABLES.USER_EXPERIENCES + ' as ue', 'u.id', 'ue.user_id')
		.innerJoin(TABLES.PROFILES + ' as p', 'u.id', 'p.user_id')
		.where( function() { this.whereNull('us.user_id').orWhereNull('ue.user_id') })
		.andWhereRaw('date(u.creation_date) = curdate() - interval 1 day')
		.groupBy('id');


	return Promise.all([c_profile])
		.then( ([r]) => {
			send_mail(r);
		})
		.catch(console.error);
}; //exports

module.exports = completeProfile;