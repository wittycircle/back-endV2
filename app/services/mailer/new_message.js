const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

/*
args: {

}

fields : {
	"-FNAME-" : receivers,
	"-FFNAME-" : [data.first_name],
	"-FLNAME-": [data.last_name],
	"-FIMG-": images,
	"-FDESC-": messages,
	"-FLOC-": locations,
}
*/
const new_message = (args) => {

	let	mail = new helper.Mail(),
	pers = new helper.Personalization();

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
			's.email', 'r.first_name as receiver',
			's.first_name', 's.last_name',
			's.city', 's.country', 's.state',
			's.profile_picture'
		];


return db.select(selection)
		.from(TABLES.OMESSAGES + ' as m')
		.join(sender, 's.uid', 'm.from_user_id')
		.join(receiver, 'r.uid', 'm.to_user_id')
		.where('m.m_read', 0)
		.andWhere('m.m_send', 0)
		.then(data => {
			let subject = data.first_name + ' ' + data.last_name + 'sent you a message';
			let mailto = data.map(e => e.email)
			let receivers = data.map(e => e.receiver)
			let messages = data.map(e => e.message.length > 76 ? e.message.substring(0, 76) + "...": e.message.substring(0, 76))
			let locations = data.map(e => e.country ? e.city + ', ' + e.country : e.state ? e.city + ', ' + e.state: e.city);
			let images = data.map(e => e.profile_picture)

			let sub = {
				"-FNAME-" : receivers,
				"-FFNAME-" : [data.first_name],
				"-FLNAME-": [data.last_name],
				"-FIMG-": images,
				"-FDESC-": messages,
				"-FLOC-": locations,
			}

			wm.subject(mail, pers, subject);
			wm.to(pers,'sequoya@wittycircle.com');
			wm.bcc(mailto);
		  	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
			wm.substitutions(pers, sub)
			wm.content(mail)
			wm.reply(mail, "noreply@wittycircle.com");
		    mail.addPersonalization(pers)
			mail.setTemplateId(TEMPLATES.welcome)

		  wm.send(mail);
		  return null;

		});
};//exports

module.exports = new_message