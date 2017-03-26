const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

const new_message = () => {


const	p_uarray = ['p.id', 'u.id as uid', 'p.first_name', 'p.last_name', 'u.email',
		'u.username', db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName'),
		'p.profile_picture', 'p.about', 'p.cover_picture', 'p.description', 'p.network',
		'p.city', 'p.country', 'p.state'];

const		sender = db.select(p_uarray).from(TABLES.USER_PROFILES + ' as p')
					.join(TABLES.USERS + ' as u', 'u.profile_id', 'p.id').as('s');

const		receiver = db.select(p_uarray).from(TABLES.USER_PROFILES + ' as p')
					.join(TABLES.USERS + ' as u', 'u.profile_id', 'p.id').as('r');

const selection = [
			'm.to_user_id', 'm.from_user_id', 'm.message', 'm.id',
			'r.email', 'r.first_name as receiver',
			's.first_name', 's.last_name',
			's.city', 's.country', 's.state',
			's.profile_picture'
		];

	let	mail = new helper.Mail();

const send_mail = (data) => {
	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
	wm.content(mail)
	wm.reply(mail, "noreply@wittycircle.com");
	mail.setTemplateId(TEMPLATES.new_message)
	
	data.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject = '-FFNAME-  -FLNAME- sent you a message';
		let sub = {
			"-FNAME-" : e.receiver,
			"-FFNAME-" : e.first_name,
			"-FLNAME-": e.last_name,
			"-FIMG-": e.profile_picture,
			"-FDESC-": wm.truncate(e.message)
			"-FLOC-": wm.location(e)
			email: e.email
		};
		console.log("\n-------------------------------------------------\n")
		console.log(sub)
		wm.subject(pers, subject);
		wm.to(pers, e.email);
		wm.substitutions(pers, sub)
	    mail.addPersonalization(pers)
	});
  wm.send(mail);
  return null;
};

return db.select(selection)
		.from(TABLES.OMESSAGES + ' as m')
		.join(sender, 's.uid', 'm.from_user_id')
		.join(receiver, 'r.uid', 'm.to_user_id')
		.join(wm.notif('new_message'), 'n.user_id', 'm.to_user_id')
		.where('m.m_read', 0)
		.andWhere('m.m_send', 0)
		.then(send_mail)
};//exports

module.exports = new_message