const wm = require('./wittymail');
const helper = require('sendgrid').mail;
const {db, TABLES} = require('../../models/index');

/*
args : {
	email, str
}

*/
const welcome = (args) => {
console.log("ARGS ARGS ARGS", args)
let	mail = new helper.Mail(),
	pers = new helper.Personalization();


return db.first(db.raw('CONCAT (p.first_name, " ", p.last_name) as username'))
		.from(TABLES.USERS + ' as u')
		.join(TABLES.USER_PROFILES + ' as p', 'u.profile_id', 'p.id')
		.where({email: args.email})
	.then(username => {
		console.log("USERNAME")
		console.log(username)
		console.log(wm)
		// return "toto";
			sub = { "-FNAME-" : username };
			list_mail = [args.email, "sequoya@wittycircle.com"]

			wm.subject(mail, pers, "Welcome to Witty !");
			wm.to(pers, "noreply@nope.nope");
		  	wm.from(mail, "bail@test.com", "Growth Hacker");
		  	wm.bcc(pers, list_mail)
			wm.substitutions(pers, sub)
			wm.content(mail)
			wm.reply(mail, "reply@bail.com");
		    mail.addPersonalization(pers)
			mail.setTemplateId("db2fc916-37b5-42dd-b7b7-99d6163fd6ff")

		  wm.send(mail);
		  return null;

	}).catch(console.error);//then



};//exports

module.exports = welcome