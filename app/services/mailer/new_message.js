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

		// if (data.length > 1)
		// 	data = data.slice(0, 1);
		data.forEach((e, i) => {
			e.members.forEach(member => {
				let pers = new helper.Personalization();
				let subject = '*|UF_NAME|* *|UL_NAME|* just sent you a new message';
				let sub = {
					'*|PF_NAME|*' 		: member.firstName,
					'*|UF_NAME|*' 		: e.first_name,
					'*|UL_NAME|*' 		: e.last_name,
					'*|U_PICTURE|*' 	: wm.transform(e.picture),
					'*|U_DESC|*' 		: wm.truncate(e.description) || '',
					'*|NETWORK_BLOC|*'	: wm.network_bloc(e.network),
					'*|LOCATION_BLOC|*'	: wm.location_bloc(wm.location(e)),
					'*|SKILL_BLOC|*' 	: wm.skills_bloc(e.skills),
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
		'p.description',
		'nl.name as network',
		db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName'),
		'p.picture',
		h.format_location
	];

	const sender = db
		.select(p_uarray)
		.from(TABLES.PROFILES + ' as p')
		.join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
		.join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
		.as('s');

	const user_skills = db
		.select(
			'us.user_id as usid',
			db.raw(`GROUP_CONCAT(DISTINCT sk.name) as skills`))
		.from((TABLES.USER_SKILLS) + ' as us')
		.leftJoin(TABLES.SKILLS + ' as sk', 'sk.id', 'us.skill_id')
		.groupBy('us.user_id')
		.as('usk')

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
		.whereRaw('rs.creation_date <= DATE_SUB(NOW(),INTERVAL 1 HOUR)')
		.groupBy('r.id')
		.limit(5)
		.as('enroule');
	//
	const qq = db(q)
		.join(sender, 's.uid', 'enroule.sender')
		.leftJoin(user_skills, 'usk.usid', 's.uid')
		.select('*')

	qq.then(r => {
		r.forEach((e, i) => {
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
