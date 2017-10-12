const { wm, TEMPLATES } = require('./wittymail');
const h = require('../../models/helper'); //NIK
const helper = require('sendgrid').mail;
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

/*
args: {
	project_id: number,
	user_id: number,
	message: text,
	title: text
}
*/

const ask_project = args => {
	let mail = new helper.Mail();

	const category = new helper.Category('ask_project');
	mail.addCategory(category);

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
		.where('us.user_id', args.user_id);

	const fromUser = h.spe_profile({ 'u.id': args.user_id })

	common_array = ['u.id', 'u.email', 'pr.title', 'pr.public_id'];

	const fromProject = db(TABLES.USERS + ' as u')
		.distinct(common_array)
		.join(TABLES.PROJECT_LIKES + ' as l', 'l.user_id', 'u.id')
		.join(TABLES.PROJECTS + ' as pr', function() {
			this.on('l.project_id', 'pr.id');
			this.orOn('pr.user_id', 'u.id');
		})
		.leftJoin(wm.notif('ask_project'), 'n.user_id', 'u.id')
		.where('pr.id', args.project_id)
		.andWhere('u.id', '!=', args.user_id)
		.union(function() {
			this.select(common_array)
				.from(TABLES.USERS + ' as u')
				.join(TABLES.PROJECT_MEMBERS + ' as m', 'm.user_id', 'u.id')
				.join(TABLES.PROJECTS + ' as pr', 'pr.id', 'm.project_id')
				.join(wm.notif('ask_project'), 'n.user_id', 'u.id')
				.where('m.project_id', args.project_id);
		});

	return Promise.all([fromUser, user_skills, fromProject])
		.then(([users, u_skills, projects]) => {
			u = users[0];
			let subject = '*|UFU_NAME|* just commented about *|PR_TITLE|*';
			wm.from(mail, 'notifications@wittycircle.com', 'Witty');
			wm.content(mail);
			wm.reply(mail, 'notifications@wittycircle.com');
			mail.setTemplateId(TEMPLATES.ask_project);
			if (!projects.length) {
				return;
			}
			projects.forEach(p => {
				let pers = new helper.Personalization();
				let sub = {
					'*|UF_NAME|*' 		: u.first_name,
					'*|UFU_NAME|*' 		: u.fullName,
					'*|PR_TITLE|*' 		: p.title,
					'*|U_DESC|*' 		: wm.truncate(u.description) || '',
					'*|U_PICTURE|*' 	: u.picture,
					'*|PR_URL|*' 		: wm.url(`project/${p.public_id}/${p.title}`),
					'*|LOCATION_BLOC|*' : wm.location_bloc(wm.location(u_skills[0])),
					'*|NETWORK_BLOC|*'	: wm.network_bloc(u_skills[0].network),
					'*|SKILL_BLOC|*' 	: wm.skills_bloc(u_skills[0].skills),
					'*|EMAIL|*' 		: p.email
				};
				// console.log(sub)
				// console.log("\n")
				wm.to(pers, p.email);
				wm.substitutions(pers, sub);
				wm.subject(pers, subject);
				mail.addPersonalization(pers);
			}); //foreach
			// wm.send(mail, 'ask_project');
			return null;
		})
		.catch(console.error); //then
}; //exports

module.exports = ask_project;
