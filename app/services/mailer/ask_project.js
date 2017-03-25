const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

/*
args: {
	email: string
}
*/

const welcome = (args) => {
let	mail = new helper.Mail(),
	pers = new helper.Personalization();

// return db.first('p.first_name as username')
// 		.from(TABLES.USERS + ' as u')
// 		.join(TABLES.USER_PROFILES + ' as p', 'u.profile_id', 'p.id')
// 		.where('u.email', args.email)

const fromUser = 

const fromProject = db.select(['title', im])
		.from(TABLES.PROJECTS)
		.where(id, args.project_id)

return Promise.all([fromUser, fromProject])
	.then(([u, p]) => {
		let subject = '-FNAME- asked a question about -FPROJECT-'
			sub = {
			 "-FNAME-" : u.first_name + ' ' + u.last_name,
			 "-FPROJECT-" : p.title,
			 "-FMTITLE-": args.title,
			 "-FDESC-": args.message,
			 "-FIMG-": p.img,
			 "-FURL-": wm.url('projects/' + p.public + '/' + p.title + '/feedback');
			};
			wm.subject(pers, "Welcome to Witty !");
			wm.to(pers, /*args.email*/ 'sequoya@wittycircle.com');
		  	wm.from(mail, 'noreply@wittycircle.com', "wittycircle");
			wm.substitutions(pers, sub)
			wm.content(mail)
			wm.reply(mail, "noreply@wittycircle.com");
		    mail.addPersonalization(pers)
			mail.setTemplateId(TEMPLATES.ask_project)

		  wm.send(mail);
		  return null;

	}).catch(console.error);//then



};//exports

module.exports = welcome