// const filt = e => e !== 'templates'
// && e !== 'index.js'
// && e !== 'wittymail.js'
// && e !== 'example_kitchen.js';

// const files = require('fs').readdirSync('../app/services/mailer')
//     .filter(filt);

const files = [
	'ask_project',
	'invite_team',
	'invite_user',
	'new_message',
	'new_project',
	'profile_views',
	'reply_project',
	'reset_password',
	'suggestion_profile',
	'uc_invitation',
	'upvote_project',
	'user_follow',
	'validate_account',
	'verification_network',
	'welcome',
	'admin_invite'
];

let mails = {};

if (process.env.NODE_ENV === 'development') {
	files.forEach(e => {
		mails[e] = args => console.log(`no [ ${e} ] mail, dev environment`);
	});
} else {
	// ------------------ PROD ENVIRONMENT ------------------
	files.forEach(e => {
		mails[e] = args => require(`./${e}`)(args);
	});
}

// mails['new_message'] = args => require('./new_message')(args);

// ------------------ DEV ENVIRONMENT ------------------

// files.forEach(e => {
// 	let n = e.split('.')[0]
// 	mails[n]  = (args) => console.log(`no [ ${n} ] mail, dev environment`)
// });

module.exports = mails;
