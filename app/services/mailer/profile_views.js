const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

let toInsertToo = (picture, name, date, description, location, network, skills, username) => {

	return `<div class="main-class"><div class="bloc1" style="display: inline-block;"><div class="first-container" style="margin-bottom: 10px;"><img style="border-radius: 50%; width: 50px;" src="${picture}" alt="profile_picture"></div>
<div class="second-container" style="margin: 0 10px 10px 10px;"><h2 class="sc-1">${name}</h2><h3 class="space-normal sc-2">${description}</h3><div class="location" style="margin-bottom: 10px;"><span class="sc-3"><img style="width: 7px; margin-right: 3px;" src="https://marketing-image-production.s3.amazonaws.com/uploads/8b5975218013c94ed4ab5a52303771966218a241dca84fc6a49b3c7423e73222ae645cd8ea518428a0f316877b1d8b4f673a267aa85099a8bd1ba106c55a5e11.png" alt="location_icon"> ${location}</span>${wm.network_bloc(network)}</div>
<div class="skill-list space-normal"><ul class="noPadding noMargin">${wm.skills_bloc2(skills)}</ul></div></div></div>
<div class="third-container"><a href="https://www.wittycircle.com/${username}" class="button">View profile</a></div></div>`
};

const fillSub = (d, sub, i) => {
	return toInsertToo(
		wm.transform(d.picture),
		`${d.first_name} ${d.last_name}`,
		d.date,
		wm.shortenerText(d.description, true, 76, ' ...'),
		d.location,
		d.network_name,
		d.skills,
		d.username
	);
};
// ---------------------- old stuff ----------------------

const send_mail = (data, bail) => {
	let mail = new helper.Mail();
	wm.from(mail, 'notifications@wittycircle.com', 'Witty');
	wm.content(mail);
	wm.reply(mail, 'notifications@wittycircle.com');
	mail.setTemplateId(TEMPLATES.profile_views);
	const category = new helper.Category('profile_views');
	mail.addCategory(category);

	data = data.slice(0, 1);
	data.forEach((e, i) => {
		let pers = new helper.Personalization();
		let notif = e.notif.split(',');
		let laString = '';
		let nview = notif.length;
		let subject =
			'This week on Witty - ' + bail[i][0].first_name + ' and ' + nview.toString() + ' others viewed your profile';
		let newRank = e.rank == 1
			? 1
			: e.rank < 10 ? e.rank - 1 : e.rank - Math.random() * 10;
		let sub = {
			'*|PF_NAME|*': e.first_name,
			'*|RANK|*': `${e.rank}`,
			'*|NEW_RANK|*': `${Math.floor(newRank)}`,
			'*|FURL2|*': wm.url('statistics'),
			'*|NVIEW|*': nview.toString(),
			'*|EMAIL|*': e.email
		};
		bail[i].forEach((b, j) => {
			if (j < 3) laString += fillSub(b, sub, j + 1);
		});
		sub['*|PROFILES_BLOC|*'] = laString;
		// console.log('\n-------------------------------------------------\n');
		// console.log(sub);
		wm.subject(pers, subject);
		wm.to(pers, e.email);
		wm.substitutions(pers, sub);
		mail.addPersonalization(pers);

	}); //foreach
	// return ;
	wm.send(mail, 'profile_views');
	return null;
};

const profile_views = args => {
	const request = db
		.distinct(
			'v.viewed',
			'u.email',
			'r.rank',
			'p.first_name',
			'p.description',
			db.raw('GROUP_CONCAT(distinct v.user_id order by v.user_id)  as notif')
		)
		.countDistinct('v.user_id as vcount')
		.from('views as v')
		.join(TABLES.USERS + ' as u', 'v.viewed', 'u.id')
		.join(TABLES.RANK + ' as r', 'r.user_id', 'u.id')
		.join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
		.join(wm.notif('profile_view'), 'n.user_id', 'v.viewed')
		.having('vcount', '>=', 1)
		.andWhere('mail_sent', 0)
		.andWhere('u.fake', 0)
		.groupBy('v.viewed');

	const lesDates = notif =>
		db('views')
			.select(['user_id', 'viewed', db.raw('max(creation_date) as date')])
			.groupBy('viewed')
			.whereIn('user_id', notif)
			.as('v');

	const reqAll = (notif, viewed) =>
		db
			.distinct(
				h.p_uarray.concat([
					h.format_location,
					'nl.name as network_name',
					db.raw('DATE_FORMAT(v.date, "%W %M %D") as date'),
					db.raw('CONCAT(loc.city, ", ", loc.country) as location'),
					db.raw(`GROUP_CONCAT(DISTINCT sk.name) as skills`)
				])
			)
			.from(TABLES.PROFILES + ' as p')
			.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
			.join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
			.join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.user_id')
			.join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
			.leftJoin(TABLES.SKILLS + ' as sk', 'sk.id', 'us.skill_id')
			.leftJoin(lesDates(notif), 'v.user_id', 'u.id')
			.whereIn('u.id', notif)
			.andWhere('u.id', '<>', viewed)
			.groupBy('u.id');

	// const user_skills = db
	// 	.select(
	// 		'us.user_id as usid',
	// 		db.raw(`GROUP_CONCAT(DISTINCT sk.name) as skills`))
	// 	.from((TABLES.USER_SKILLS) + ' as us')
	// 	.leftJoin(TABLES.SKILLS + ' as sk', 'sk.id', 'us.skill_id')
	// 	.groupBy('us.user_id')
	// 	.as('usk')

	const setToOne = ids =>
		db('views').update('mail_sent', 1).whereIn('viewed', ids);

	return request.then(array => {
		if (!array.length) {
			console.log(request.toString());
			console.log('empty');
			return null;
		}
		let x = [];
		let ids = array.map(e => e.viewed);
		array.forEach((e, i) => {
			let notif = e.notif.split(',').splice(0, 7);
			x.push(
				reqAll(notif, e.viewed).then(x => {
					return x;
				})
			);
		}); //foreach
		x.push(setToOne(ids).return());
		return Promise.all(x).then(bail => {
			send_mail(array, bail);
		});
	});
}; //exports
// profile_views();
module.exports = profile_views;

// profile_views();
