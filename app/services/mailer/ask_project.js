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

	const fromUser = h.spe_profile({ 'u.id': args.user_id });

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
		.union(function() {
			this.select(common_array)
				.from(TABLES.USERS + ' as u')
				.join(TABLES.PROJECT_MEMBERS + ' as m', 'm.user_id', 'u.id')
				.join(TABLES.PROJECTS + ' as pr', 'pr.id', 'm.project_id')
				.join(wm.notif('ask_project'), 'n.user_id', 'u.id')
				.where('m.project_id', args.project_id);
		});

	return Promise.all([fromUser, fromProject])
		.then(([users, projects]) => {
			u = users[0];
			let subject = '*|FNAME|* asked a question about *|FPROJECT|*';
			wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
			wm.content(mail);
			wm.reply(mail, 'noreply@wittycircle.com');
			mail.setTemplateId(TEMPLATES.ask_project);
			if (!projects.length) {
				return;
			}
			projects.forEach(p => {
				let pers = new helper.Personalization();
				let sub = {
					'*|FNAME|*': u.fullName,
					'*|FPROJECT|*': p.title,
					// '*|FMTITLE|*': args.title,
					'*|FDESC|*': args.message,
					'*|FIMG|*': u.picture,
					'*|FURL|*': wm.url(`project/${p.public_id}/${p.title}`),
					'*|EMAIL|*': p.email
				};
				// console.log(sub)
				// console.log("\n")
				wm.to(pers, p.email);
				wm.substitutions(pers, sub);
				wm.subject(pers, subject);
				mail.addPersonalization(pers);
			}); //foreach
			// console.log("done")
			wm.send(mail, 'ask_project');
			return null;
		})
		.catch(console.error); //then
}; //exports

module.exports = ask_project;
