/*
[line number]
	ask_project: controllers/projects  [106]
	upvote_project: ,
	invite_user:, 
	invite_team: ,
	new_message: undefined_for_Now
	new_project: ,
	reply_project: ,
	reset_password: ,
	suggestion_profile: ,
	suggestion_project: ,
	uc_invitation: ,
	user_follow:,
	validate_account: ,
	validation-network: ,
	verification_network: ,
	profile_views:,
	welcome : controllers/account [59]
*/

module.exports = {
	ask_project: (args) => require('./ask_project')(args),
	// upvote_project: (args) => require('./upvote_project')(args),
	welcome: (args) => require('./welcome')(args),
	new_message: (args) => require('./new_message')(args),

};
