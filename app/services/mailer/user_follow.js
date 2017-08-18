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
	let subject = '*|FFNAME|* *|FLNAME|* just started following you';
	let sub = {
		'*|FNAME|*': followed.first_name,
		'*|FFNAME|*': follower.first_name,
		'*|FLNAME|*': follower.last_name,
		'*|FIMG|*': wm.transform(follower.picture),
		'*|FLOC|*': follower.location,
		'*|FDESC|*': wm.truncate(follower.description) || ' ',
		'*|FURL|*': wm.url(`${follower.username}`),
		'*|EMAIL|*': followed.email
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
	const follower = h
		.spe_profile({ 'u.id': args.follower })
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
		.select(
			'p.*',
			h.format_location,
			db.raw('CONCAT(loc.city, ", ", loc.country) as location')
		);

	// console.log(h.format_location)
	// console.log(follower.toString())
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
