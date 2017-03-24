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

return db.first('p.first_name as username')
		.from(TABLES.USERS + ' as u')
		.join(TABLES.USER_PROFILES + ' as p', 'u.profile_id', 'p.id')
		.where('u.email', args.email)
	.then(username => {
			sub = { "-FNAME-" : username.username };
			wm.subject(pers, "Welcome to Witty !");
			wm.to(pers, /*args.email*/ 'sequoya@wittycircle.com');
		  	wm.from(mail, 'quentin@wittycircle.com', "Quentin Verriere");
			wm.substitutions(pers, sub)
			wm.content(mail)
			wm.reply(mail, "noreply@wittycircle.com");
		    mail.addPersonalization(pers)
			mail.setTemplateId(TEMPLATES.welcome)

		  wm.send(mail);
		  return null;

	}).catch(console.error);//then



};//exports

module.exports = welcome