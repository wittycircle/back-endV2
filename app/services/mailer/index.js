/*
welcome : controllers/account [59]
*/

module.exports = {
	welcome: (args) => require('./welcome')(args),
	new_message: (args) => require('./new_message')(args),
};
