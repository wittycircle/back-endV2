/*
[line number]
	ask_project: controllers/projects  [106]
	upvote_project: UNDEFINED,
	invite_user: UNDEFINED, 
	invite_team: UNDEFINED,
	new_message: UNDEFINED,
	new_project: controllers/projects [35],
	reply_project: controllers/discussion [56],
	reset_password: controllers/account [74],
	suggestion_profile: ,
	suggestion_project: ,
	uc_invitation: UNDEFINED,
	user_follow: controllers/profiles [71],
	validate_account: ,
	validation-network: ,
	verification_network: ,
	profile_views:,
	welcome : controllers/account [59]
*/
// const files = require('fs').readdirSync('./app/services/mailer')
// 				.filter(e => e !== 'index.js');


// let o = {};

// 	files.forEach(e => {
// 		let n = e.split('.')[0]
// 		o[n]  = (args) => require(`./${n}`)(args)
// 	});

module.exports = {
	ask_project: (args) => require('./ask_project')(args),
	// upvote_project: (args) => require('./upvote_project')(args),
	welcome: (args) => require('./welcome')(args),
	new_message: (args) => require('./new_message')(args),

};
