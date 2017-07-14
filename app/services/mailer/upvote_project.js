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
  const fromUser = h.spe_profile({ 'u.id': args.user_id });
  const fromProject = db(TABLES.PROJECTS)
    .first('title')
    .where('id', args.project_id);

  common_array = ['u.id', 'u.email', 'p.first_name'];

  const toUsers = db
    .select(common_array)
    .from(TABLES.USERS + ' as u')
    .join(TABLES.USER_PROFILES + ' as p', 'p.user_id', 'u.id')
    .join(TABLES.PROJECTS + ' as pr', 'pr.user_id', 'u.id')
    .leftJoin(wm.notif('follow_project'), 'n.user_id', 'u.id')
    .where('pr.id', args.project_id);

  return Promise.all([fromUser, fromProject, toUsers])
    .then(([[f], p, [t]]) => {
      console.log('F ', f);
      console.log('P ', p);
      console.log('T ', t);
      let mail = new helper.Mail(),
        pers = new helper.Personalization();

      const category = new helper.Category('upvote_project');
      mail.addCategory(category);
      wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
      wm.content(mail);
      wm.reply(mail, 'noreply@wittycircle.com');
      mail.setTemplateId(TEMPLATES.upvote_project);
      // t.forEach(t => {
      let subject = '*|FFNAME|* *|FLNAME|* upvoted *|FTITLE|*';
      let sub = {
        '*|FNAME|*': t.first_name,
        '*|FFNAME|*': f.first_name,
        '*|FLNAME|*': f.last_name,
        '*|FIMG|*': wm.transform(f.picture),
        '*|FDESC|*': wm.truncate(f.description),
        '*|FLOC|*': wm.location(f),
        '*|FURL|*': wm.url(f.username),
        '*|FTITLE|*': p.title
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
