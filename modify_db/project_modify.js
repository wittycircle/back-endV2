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

const modifyProjectStatus = () => {
	const modify1 = db('projects')
		.where('status', 'Drafted project')
		.update('status', 'Prototype')
	
	const modify2 = db('projects')
		.where('status', 'Beta project')
		.update('status', 'Beta product')

	const modify3 = db('projects')
		.where('status', 'Live project')
		.update('status', 'Company')

	const modify4 = db('projects')
		.where('status', 'all')
		.del()

	Promise.all([
		modify1,
		modify2,
		modify3,
		modify4
	]).then(r => {
		console.log('MODIFYING DONE !');
	});
}

modifyProjectStatus();