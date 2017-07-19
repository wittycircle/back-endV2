const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

const send_mail = (email, sender, token) => {
	let mail = new helper.Mail();
	const from = sender.id == 9
		? 'olivier@wittycircle.com'
		: 'quentin@wittycircle.com';
	wm.from(mail, from, sender.id == 9 ? 'Olivier Hamelin' : 'Quentin Verriere');
	wm.content(mail);
	wm.reply(mail, from);
	mail.setTemplateId(TEMPLATES.invite_user);
	const category = new helper.Category('admin_invite');
	mail.addCategory(category);

	let pers = new helper.Personalization();
	let subject = sender.fullName + ' invited you to join Wittycircle';
	let sub = {
		'*|FNAME|*': sender.first_name,
		'*|FLNAME|*': sender.last_name,
		'*|PIMG|*': wm.transform(sender.picture),
		'*|FUNAME|*': sender.fullName,
		'*|FLOC|*': wm.location(sender),
		'*|URL|*': wm.url(`/invite/projects/${token}`)
	};
	console.log(sub);
	console.log('\n-------------------------------------------------\n');
	wm.subject(pers, subject);
	wm.to(pers, email);
	wm.substitutions(pers, sub);
	mail.addPersonalization(pers);
	// });
	wm.send(mail, 'admin_invite');
	return null;
};
const admin_invite = args => {
	if (!args || !args.email || !args.token) {
		console.log('admin invite mail: no args');
		throw 'admin invite mail: no args';
	} else {
		let request = h
			.spe_profile({ 'u.id': args.uid })
			.select(h.format_location)
			.join('location as loc', 'loc.id', 'p.loc_id');

		return request.then(x => {
			console.log('x', x);
			console.log('x[0]', x[0]);
			send_mail(args.email, x[0], args.token);
		});
	}
}; //exports

module.exports = admin_invite;
