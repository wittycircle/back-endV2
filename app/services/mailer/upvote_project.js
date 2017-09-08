const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

/*
args: {
	project_id: number,
	user_id: number
}
*/

const upvote_project = args => {
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
    
	const fromUser = h.spe_profile({ 'u.id': args.user_id });
	const fromProject = db(TABLES.PROJECTS)
		.first('title')
		.where('id', args.project_id);

	common_array = ['u.id', 'u.email', 'p.first_name'];

	const toUsers = db
		.select(common_array)
		.from(TABLES.USERS + ' as u')
		.join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
		.join(TABLES.PROJECTS + ' as pr', 'pr.user_id', 'u.id')
		.leftJoin(wm.notif('follow_project'), 'n.user_id', 'u.id')
		.where('pr.id', args.project_id);

    return Promise.all([fromUser, fromProject, toUsers, user_skills])
		.then(([[f], p, [t], us]) => {
			// console.log('F ', f);
			// console.log('P ', p);
			// console.log('T ', t);
			let mail = new helper.Mail(),
				pers = new helper.Personalization();

			const category = new helper.Category('upvote_project');
			mail.addCategory(category);
			wm.from(mail, 'notifications@wittycircle.com', 'Witty');
			wm.content(mail);
			wm.reply(mail, 'notifications@wittycircle.com');
			mail.setTemplateId(TEMPLATES.upvote_project);
			// t.forEach(t => {
			let subject = '*|UF_NAME|* *|UL_NAME|* upvoted *|PR_TITLE|*';
			let sub = {
				'*|PF_NAME|*' 	 	: t.first_name,
				'*|UF_NAME|*' 	 	: f.first_name,
				'*|UL_NAME|*' 	 	: f.last_name,
				'*|U_PICTURE|*'  	: wm.transform(f.picture),
				'*|U_DESC|*' 	 	: wm.truncate(f.description),
				// '*|U_LOC|*' 	 	: wm.location(l),
				'*|U_URL|*' 	 	: wm.url(f.username),
				'*|PR_TITLE|*' 		: p.title,
				'*|LOCATION_BLOC|*' : wm.location_bloc(wm.location(us[0])),
				'*|NETWORK_BLOC|*' 	: wm.network_bloc(us[0].network),
				'*|SKILL_BLOC|*'	: wm.skills_bloc(us[0].skills),
			};
			// console.log(sub)
			// console.log("\n*|-------------------------------\n")
			// console.log(f)
			wm.to(pers, t.email);
			wm.substitutions(pers, sub);
			wm.subject(pers, subject);
			mail.addPersonalization(pers);

			// })//foreach

			wm.send(mail, 'upvote_project');
			return null;
		})
		.catch(console.error); //then
}; //exports
module.exports = upvote_project;

// ------------------ If decide in future to send to all that follow the project ------------------
// const toUsers = db .distinct(common_array)
// 				.from(TABLES.USERS + ' as u')
// 			.join(TABLES.USER_PROFILES + ' as p', 'p.user_id', 'u.id')
// 			.join(TABLES.PROJECT_LIKES + ' as l', 'l.user_id', 'u.id')
// 			.join(wm.notif('follow_project'), 'n.user_id', 'u.id')
// 			.where('l.project_id', args.project_id)
// 			.union(function() {
// 				this.select(common_array)
// 				.from(TABLES.USERS + ' as u')
// 				.join(TABLES.USER_PROFILES + ' as p', 'p.user_id', 'u.id')
// 				.join(TABLES.PROJECT_MEMBERS + ' as m', 'm.user_id', 'u.id')
// 				.join(wm.notif('follow_project'), 'n.user_id', 'u.id')
// 				.where('m.project_id', args.project_id)
// 			})
// 			.union(function() {
// 				this.select(common_array)
// 					.from(TABLES.USERS + ' as u')
// 					.join(TABLES.USER_PROFILES + ' as p', 'p.user_id', 'u.id')
// 					.join(TABLES.PROJECTS + ' as pr', 'pr.user_id', 'u.id')
// 					.join(wm.notif('follow_project'), 'n.user_id', 'u.id')
// 					.where('pr.id', args.project_id)
// 			});
