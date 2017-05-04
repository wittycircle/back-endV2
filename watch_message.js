const {db, TABLES} = require('./app/models'),
	mailer = require('./app/services/mailer');


let HALF_HOUR = 3600 * 500; 
let ONE_DAY = 3600 * 24 * 1000;


module.exports = () => {
	setInterval(mailer.new_message, HALF_HOUR);
	setInterval(mailer.profile_views, ONE_DAY)
}
