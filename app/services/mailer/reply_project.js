const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

// const args = {
// 	id: 162,
// 	from: 1,
// 	message: 'The reply is non sense!'
// };

const send_mail = (message, discussion, sender, u_skills) => {
	if (!message || !discussion || !discussion.length || !sender) return null;
	let mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
	wm.content(mail);
	wm.reply(mail, 'noreply@wittycircle.com');

	const category = new helper.Category('reply_project');
	mail.addCategory(category);
	mail.setTemplateId(TEMPLATES.reply_project);

	discussion.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject = `${sender.fullName} commented on ${e.title} discussion !`;
		let sub = {
			'*|UF_NAME|*' 		: sender.first_name,
			'*|U_DESC|*' 		: wm.truncate(e.description) || '',
			'*|U_PICTURE|*' 	: wm.transform(sender.picture),
			'*|PR_URL|*' 		: wm.url(`/project/${e.public_id}/${e.title}`),
			'*|UFU_NAME|*' 		: sender.fullName,
			'*|PR_TITLE|*' 		: e.title,
			'*|LOCATION_BLOC|*' : wm.location_bloc(wm.location(u_skills[0])),
			'*|NETWORK_BLOC|*'	: wm.network_bloc(u_skills[0].network),
			'*|SKILL_BLOC|*' 	: wm.skills_bloc(u_skills[0].skills),
			'*|MAIL|*' 	 		: e.email
		};
		// console.log(sub)
		// console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, e.email);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);
	}); //foreach
	wm.send(mail, 'reply_project');
	return null;
};

const reply_project = args => {
	console.log('IN REPLY');
	const sender = h.spe_profile({ 'u.id': args.from });

	const members = db(TABLES.PROJECT_MEMBERS)
		.select('*')
		.where('accepted', 1)
		.as('pm');

	const discussion = db
		.distinct('u.email', 'p.title', 'p.public_id')
		.from(TABLES.DISCUSSIONS + ' as d')
		.join(TABLES.PROJECTS + ' as p', 'd.project_id', 'p.id')
		.leftJoin(members, 'pm.project_id', 'p.id')
		.leftJoin(TABLES.DISCUSSION_MESSAGES + ' as r', 'r.discussion_id', 'd.id')
		.join(TABLES.USERS + ' as u', function() {
			this.on('u.id', 'p.user_id')
				.orOn('u.id', 'd.user_id')
				.orOn('u.id', 'pm.user_id')
				.orOn('u.id', 'r.user_id');
		})
		.leftJoin(wm.notif('reply_project'), 'n.user_id', 'u.id')
		.whereRaw(`u.id <> ${args.from}`)
		.andWhere('d.id', args.id);

	const user_skills = db
		.select(
			'p.user_id as user_id',
			'nl.name as network',
			h.format_location,
			db.raw(`GROUP_CONCAT(DISTINCT sk.name) as skills`))
		.from(TABLES.PROFILES + ' as p')
		.join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.user_id')
		.join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
		.leftJoin(TABLES.SKILLS + ' as sk', 'sk.id', 'us.skill_id')
		.where('us.user_id', args.from);

	return Promise.all([discussion, sender, user_skills])
		.then(([d, [s], u]) => send_mail(args.message, d, s, u))
		.catch(console.error);
}; //exports

module.exports = reply_project;
