const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

const send_mail = (data, sender) => {
	let	mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
	wm.content(mail)
	wm.reply(mail, "noreply@wittycircle.com");
	mail.setTemplateId(TEMPLATES.invite_user)
	
	data.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject = sender.fullName + " invited you to join Wittycircle";
		let sub = {
			"*|FNAME|*": sender.first_name,
			"*|FLNAME|*": sender.last_name,
			"*|PIMG|*": sender.profile_picture,
			"*|FUNAME|*": sender.fullName,
			"*|FLOC|*": wm.location(sender),
			"*|URL|*": wm.url(''),
			"MAIL": e,
			
		};
		console.log(sub)
		console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, e);
		wm.substitutions(pers, sub)
	    mail.addPersonalization(pers)
	});
  wm.send(mail);
  return null;
};

const invite_user = (args) => {
	let request = h.spe_profile({'u.id': args.uid})

	let x = []
	args.mailList.map(e => x.push({user_id: args.uid, invite_email: e}))

	let table_invite = db.batchInsert('invitation', x)
		
	return 	Promise.all([table_invite, request])
			.then(([x, sender]) => send_mail(args.mailList, sender[0]))
};//exports

module.exports = invite_user;