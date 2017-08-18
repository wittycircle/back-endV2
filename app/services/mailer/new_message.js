const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const { db, TABLES } = require('../../models/index');
const h = require('../../models/helper');
const _ = require('lodash');

const new_message = () => {
	let mail = new helper.Mail();

	const send_mail = data => {
		wm.from(mail, 'notifications@wittycircle.com', 'Witty');
		wm.content(mail);
		wm.reply(mail, 'notifications@wittycircle.com');
		mail.setTemplateId(TEMPLATES.new_message);

		const category = new helper.Category('new_message');
		mail.addCategory(category);

		if (!data.length) {
			console.log('no new message');
			return null;
		}
		data.forEach((e, i) => {
			e.members.forEach(member => {
				let pers = new helper.Personalization();
				let subject = '*|FFNAME|* *|FLNAME|* just sent you a new message';
				let sub = {
					'*|FNAME|*': member.firstName,
					'*|FFNAME|*': e.first_name,
					'*|FLNAME|*': e.last_name,
					'*|FIMG|*': wm.transform(e.picture),
					'*|FDESC|*': wm.truncate(e.message),
					'*|FLOC|*': wm.location(e),
					email: member.email
				};
				// console.log('\n-------------------------------------------------\n');
				// console.log(sub);
				wm.subject(pers, subject);
				wm.to(pers, member.email);
				wm.substitutions(pers, sub);
				mail.addPersonalization(pers);
			});
		});
		wm.send(mail, 'new_message');
		return null;
	}; //sendmail

	const p_uarray = [
		'u.id as uid',
		'p.first_name',
		'p.last_name',
		db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName'),
		'p.picture',
		h.format_location
	];

	const sender = db
		.select(p_uarray)
		.from(TABLES.PROFILES + ' as p')
		.join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
		.as('s');

	let last_message = db.raw(
		`SUBSTRING_INDEX(GROUP_CONCAT(message ORDER BY m.creation_date desc), ',', 1) as message`
	);

	let sender_id = db.raw(
		`SUBSTRING_INDEX(GROUP_CONCAT(m.user_id ORDER BY m.creation_date desc), ',', 1) as sender`
	);

	let members = db.raw(
		` GROUP_CONCAT(DISTINCT
		CONCAT('{"user_id": ', rm.user_id,
		', "firstName": "', p.first_name,
		'", "email": "', u.email,
		'"}')
		SEPARATOR "|")
		as members`
	);

	const selection = [
		last_message,
		sender_id,
		members,
		'r.id as roomId',
		'rs.id as status_id'
	];
	let q = db
		.distinct(selection)
		.from(TABLES.ROOMS + ' as r')
		.join(TABLES.MESSAGES + ' as m', 'm.room_id', 'r.id')
		.join(TABLES.ROOM_STATUS + ' as rs', 'rs.room_id', 'r.id')
		.join(TABLES.ROOM_MEMBERS + ' as rm', 'rm.room_id', 'r.id')
		.join(TABLES.USERS + ' as u', 'u.id', 'rm.user_id')
		.join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
		.where('rs.read', 0)
		.andWhere('rs.mail_sent', 0)
		.whereRaw('rs.creation_date <= DATE_SUB(NOW(),INTERVAL 2 HOUR)')
		.groupBy('r.id')
		.limit(5)
		.as('enroule');
	//
	const qq = db(q).join(sender, 's.uid', 'enroule.sender').select('*');

	qq.then(r => {
		r.forEach(e => {
			e.members = e.members
				.split('|')
				.map(JSON.parse)
				.filter(member => member.user_id !== +e.sender);
		});
		send_mail(r);
		const status_ids = r.map(e => e.status_id);
		return db(TABLES.ROOM_STATUS)
			.update('mail_sent', 1)
			.whereIn('id', status_ids);
	});
};

module.exports = new_message;
