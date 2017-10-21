const special_config = {
	client: 'mysql',
	connection: process.env.DATABASE_URL || {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: ''
	},
	pool: {
		min: 0,
		max: 1
	}
};

special_config.connection.database = process.argv[2];
special_config.connection.password = process.argv[3];

const db = require('knex')(special_config);

/*** MODIFY ABOUT PROFILES ***/

const modifyAboutProfiles = () => {

	const modify1 = db('profiles')
		.where('about', 'Discover new things')
		.update('about', 'to meet smart people')

	const modify2 = db('profiles')
		.where('about', 'Find teammates')
		.update('about', "to share what I'm working on")

	const modify3 = db('profiles')
		.where('about', 'Join projects')
		.update('about', 'for a full time position')

	Promise.all([
		modify1,
		modify2,
		modify3
	]).then(r => {
		console.log('MODIFYING DONE !');
	});
};

modifyAboutProfiles();