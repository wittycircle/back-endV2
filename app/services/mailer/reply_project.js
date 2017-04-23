const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

// const args = {
// 	id: 162,
// 	from: 1,
// 	message: 'The reply is non sense!'
// };

const send_mail = (message, discussion, sender) => {
	if (!message || !discussion || !discussion.length || !sender)
		return null;
	let	mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
	wm.content(mail)
	wm.reply(mail, "noreply@wittycircle.com");
	mail.setTemplateId(TEMPLATES.reply_project)
	discussion.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject =`${sender.fullName} commented on ${e.title} discussion !`;
		let sub = {
			"*|FNAME|*": sender.first_name,
			"*|FDESC|*": wm.truncate(message),
			"*|FIMG|*": sender.profile_picture,
			"*|FURL|*": wm.url(`/project/${e.public_id}/${e.title}/feedback`),
			"*|FUNAME|*": sender.fullName,
			"*|FPROJECT|*": e.title,
			"*|MAIL|*": e.email,

		};
		// console.log(sub)
		// console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, e.email);
		wm.substitutions(pers, sub)
	    mail.addPersonalization(pers)
	}); //foreach
	wm.send(mail); 
	return null;
};
	
const reply_project = (args) => {
	console.log("IN REPLY")
	const sender = h.spe_profile({'u.id': args.from});

	const discussion = db.select('u.email', 'p.title', 'p.public_id')
						.from(TABLES.PROJECT_DISCUSSION + ' as d')
						.join(TABLES.PROJECTS + ' as p', 'd.project_id', 'p.id')
						.leftJoin(TABLES.PROJECT_DISCUSSION_REPLIES + ' as r', 'r.project_discussion_id', 'd.id')
						.join(TABLES.USERS + ' as u', function() {
							this.on('u.id', 'p.user_id')
							.orOn('u.id', 'd.user_id')
							.orOn('u.id', 'r.user_id')
						})
	 						.join(wm.notif('reply_project'), 'n.user_id', 'u.id')
						.whereRaw(`u.id <> ${args.from}`)
						.andWhere('d.id', args.id)

	
	return Promise.all([discussion, sender])
		.then(([d, [s]]) => send_mail(args.message, d, s))
		.catch(console.error)
};//exports

module.exports = reply_project
