const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

let toInsertToo = (name, location, date, picture, url) => {
	return `
	<table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto" width="350px">
<tbody> <tr> <td><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2240%22%2C%22height%22%3A%2240%22%2C%22alt_text%22%3A%22profile_picture%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//res.cloudinary.com/dqpkpmrgk/image/upload/w_40%2Ch_40%2Cc_fill%2Cg_face/v1493332197/rzxugrlqswu6veak8gqe.jpg%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%2C%22link%22%3A%22%22%7D"><img height="40"
	 src=${picture} style="width: 40px; height: 40px; border-radius: 50%;" width="40" /></span></td>
	<td> <div style="width: 200px; margin: 0 auto;"> <div><span style="font-family: Helvetica; word-break: break-word;">${name}</span><br />
	<span style="color:#545454;"><span style="font-size:12px; font-family: Helvetica; position: relative; bottom: 2px;">
	${location}</span></span>&nbsp;</div> <div><span style="color:#a0a0a0;"><span style="font-size:10px; font-family: Helvetica; position: relative; bottom: 4px;">
	${date}</span></span></div> </div> </td> <td><span ><a href="${url}" ><button style="padding: 3px 10px; background-color: #fff; border: 1px solid #545454; font-family: 'Helvetica'; border-radius: 4px; font-size: 14px; ">Follow</button></a></span></td>
</tr> </tbody> </table> <br></br>
	`;
};

const fillSub = (d, sub, i) => {
	return toInsertToo(
		`${d.first_name} ${d.last_name}`,
		d.location,
		d.date,
		wm.transform(d.picture),
		wm.url(d.username)
	);
};
// ---------------------- old stuff ----------------------

const send_mail = (data, bail) => {

	let mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
	wm.content(mail);
	wm.reply(mail, 'noreply@wittycircle.com');
	mail.setTemplateId('b3a26bb4-6291-4a9f-9676-b97f74d52061');
	const category = new helper.Category('profile_views');
	mail.addCategory(category);

	data.forEach((e, i) => {
		let pers = new helper.Personalization();
		let subject =
			'You may have something special 🙈  *|NVIEW|* people recently visited your profile.';
		let notif = e.notif.split(',');
		let laString = '';
		let nview = notif.length;
		let newRank = e.rank == 1
			? 1
			: e.rank < 10 ? e.rank - 1 : e.rank - Math.random() * 10;
		let sub = {
			'*|FNAME|*': e.first_name,
			'*|RANK|*': `${e.rank}`,
			'*|NEW_RANK|*': `${Math.floor(newRank)}`,
			'*|FURL2|*': wm.url('statistics'),
			'*|NVIEW|*': nview.toString(),
			'*|EMAIL|*': e.email
		};
		bail[i].forEach((b, j) => {
			if (j < 4) laString += fillSub(b, sub, j + 1);
		});
		sub['*|TOUSLESBAILS|*'] = laString;
		// console.log('\n-------------------------------------------------\n');
		// console.log(sub);
		wm.subject(pers, subject);
		wm.to(pers, e.email /*e.email*/);
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
		// .andWhere('mail_sent', 0)
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
					db.raw('DATE_FORMAT(v.date, "%W %d %M %r") as date'),
					db.raw('CONCAT(loc.city, ", ", loc.country) as location')
				])
			)
			.from(TABLES.PROFILES + ' as p')
			.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
			.join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
			.leftJoin(lesDates(notif), 'v.user_id', 'u.id')
			.whereIn('u.id', notif)
			.andWhere('u.id', '<>', viewed)
			.groupBy('u.id');
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
