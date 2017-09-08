const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

// const args = {
// 	follower: 737, //req.user.id
// 	following: 5385 //req.params.id -> profile_id
// };

const send_mail = (follower, followed) => {
	let mail = new helper.Mail();
	wm.from(mail, 'notifications@wittycircle.com', 'Witty');
	wm.content(mail);
	wm.reply(mail, 'notifications@wittycircle.com');
	mail.setTemplateId(TEMPLATES.user_follow);
	const category = new helper.Category('user_follow');
	mail.addCategory(category);

	let pers = new helper.Personalization();
	let subject = '*|UF_NAME|* *|UL_NAME|* just started following you';
	let sub = {
		'*|PF_NAME|*' 		: followed.first_name,
		'*|UF_NAME|*' 		: follower.first_name,
		'*|UL_NAME|*' 		: follower.last_name,
		'*|U_PICTURE|*' 	: wm.transform(follower.picture),
		'*|U_DESC|*' 		: wm.truncate(follower.description) || '',
		'*|U_URL|*' 		: wm.url(`${follower.username}`),
		'*|LOCATION_BLOC|*'	: wm.location_bloc(wm.location(follower)),
		'*|NETWORK_BLOC|*' 	: wm.network_bloc(follower.network),
		'*|SKILL_BLOC|*' 	: wm.skills_bloc(follower.skills),
		'*|EMAIL|*' 		: followed.email
	};
	// console.log(sub);
	// console.log('\n-------------------------------------------------\n');
	wm.subject(pers, subject);
	wm.to(pers, followed.email);
	wm.substitutions(pers, sub);
	mail.addPersonalization(pers);
	wm.send(mail, 'user_follow');
	return null;
};

const user_follow = args => {

	const user_skills = db
		.select(
			'p.user_id as user_id',
			'nl.name as network',
			db.raw(`GROUP_CONCAT(DISTINCT sk.name) as skills`))
		.from(TABLES.PROFILES + ' as p')
		.join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.user_id')
		.join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
		.leftJoin(TABLES.SKILLS + ' as sk', 'sk.id', 'us.skill_id')
		.groupBy('us.user_id')
		.as('usk')


	const follower = h
		.spe_profile({ 'u.id': args.follower })
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
		.join(user_skills, 'usk.user_id', 'u.id')
		.select(
			'p.*',
			'usk.*',
			h.format_location,
			db.raw('CONCAT(loc.city, ", ", loc.country) as location')
		);

	const following = h
		.spe_profile({ 'u.id': args.following })
		.select('u.email')
		.leftJoin(wm.notif('user_follow'), 'n.user_id', 'u.id');

	return Promise.all([follower, following]).then(([follower, following]) => {
		if (following.length) return send_mail(follower[0], following[0]);
		else return console.log('Too bad, no notifs !');
	});
}; //exports

module.exports = user_follow;
