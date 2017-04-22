const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

// const args = {
// 	follower: 737, //req.user.id
// 	following: 5385 //req.params.id -> profile_id
// };


const send_mail = (follower, followed) => {
	let	mail = new helper.Mail();
	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
	wm.content(mail)
	wm.reply(mail, "noreply@wittycircle.com");
	mail.setTemplateId(TEMPLATES.user_follow)
	
		let pers = new helper.Personalization();
		let subject = '*|FFNAME|*  *|FLNAME|* is now following you';
		let sub = {
			"*|FNAME|*": followed.first_name,
			"*|FFNAME|*": follower.first_name,
			"*|FLNAME|*": follower.last_name,
			"*|FIMG|*": follower.profile_picture,
			"*|FLOC|*": follower.location,
			"*|FDESC|*": wm.truncate(follower.description) || ' ',
			"*|FURL|*": wm.url(`${follower.username}`),
			"*|EMAIL|*": followed.email,
		};
		console.log(sub)
		console.log("\n-------------------------------------------------\n")
		wm.subject(pers, subject);
		wm.to(pers, followed.email);
		wm.substitutions(pers, sub)
	    mail.addPersonalization(pers)
	wm.send(mail); 
	return null;
};
	
const user_follow = (args) => {
	const follower = h.spe_profile({'u.id': args.follower})
			.select(h.format_location)

// console.log(h.format_location)
// console.log(follower.toString())
	const following = h.spe_profile({'u.id': args.following}).select('u.email')
						// .join(wm.notif('user_follow'), 'n.user_id', 'u.id')

	return Promise.all([follower, following])
			.then(([follower, following]) => {
				if (following.length)
					return send_mail(follower[0], following[0])
				else
					return console.log("Too bad, no notifs !")
			})
	// return request.then(() => send_mail())
};//exports

module.exports = user_follow
