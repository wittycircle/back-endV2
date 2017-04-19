const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

/*
args: {
	project_id: number,
	user_id: number
}
*/

const upvote_project = (args) => {
let	mail = new helper.Mail(),
	pers = new helper.Personalization();


const fromUser = h.spe_profile({'u.id': args.user_id})


const fromProject = db(TABLES.PROJECTS).first('title').where('id', args.project_id)

 common_array = ['u.id', 'u.email', 'p.first_name']

 const toUsers = db .distinct(common_array)
 				.from(TABLES.USERS + ' as u')
				.join(TABLES.USER_PROFILES + ' as p', 'p.id', 'u.profile_id')
				.join(TABLES.PROJECT_LIKES + ' as l', 'l.user_id', 'u.id')
				.join(wm.notif('follow_project'), 'n.user_id', 'u.id')
				.where('l.project_id', args.project_id)
				.union(function() {
					this.select(common_array)
					.from(TABLES.USERS + ' as u')
					.join(TABLES.USER_PROFILES + ' as p', 'p.id', 'u.profile_id')
					.join(TABLES.PROJECT_MEMBERS + ' as m', 'm.user_id', 'u.id')
					.join(wm.notif('follow_project'), 'n.user_id', 'u.id')
					.where('m.project_id', args.project_id)
				})
				.union(function() {
					this.select(common_array)
						.from(TABLES.USERS + ' as u') 
						.join(TABLES.USER_PROFILES + ' as p', 'p.id', 'u.profile_id')
						.join(TABLES.PROJECTS + ' as pr', 'pr.user_id', 'u.id')
						.join(wm.notif('follow_project'), 'n.user_id', 'u.id')
						.where('pr.id', args.project_id)
				});

return Promise.all([fromUser, fromProject, toUsers])
	.then(([[f], p, t]) => {
		let subject = 'About that last email'
	  	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
		wm.content(mail)
		wm.reply(mail, "noreply@wittycircle.com");
		mail.setTemplateId(TEMPLATES.upvote_project)
		let i = 0;
		t.forEach(t => {
			let subject = '*|FFNAME|* *|FLNAME|* upvoted *|FTITLE|*'
			let sub = {
				 "*|FNAME|*" : t.first_name,
				 "*|FFNAME|*": f.first_name,
				 "*|FLNAME|*": f.last_name,
				 "*|FIMG|*": f.profile_picture,
				 "*|FDESC|*":  wm.truncate(f.description),
				 "*|FLOC|*": wm.location(f),
				 "*|FURL|*": wm.url(f.username),
				 "*|FTITLE|*": p.title,
				 "FEMAIL": t.email,
				 "FID": t.id
				};
				// console.log(sub)
				// console.log("\n*|-------------------------------\n")
				// console.log(f)
				// console.log(++i)

				wm.to(pers, t.email);
				wm.substitutions(pers, sub)
				wm.subject(pers, subject);
			    mail.addPersonalization(pers)
			
		})//foreach

		  wm.send(mail);
		  return null;

	}).catch(console.error);//then

};//exports
module.exports = upvote_project