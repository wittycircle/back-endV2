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

/*** MODIFY OPENINGS STATUS ***/

const modifyOpeningStatus = (status) => {
	const modify1 = db('openings')
		.where('status', 'Feedback')
		.update('status', 'for feedback')

	const modify2 = db('openings')
		.where('status', 'Any help')
		.orWhere('status', 'Tips')
		.orWhere('status', 'Mentor')
		.update('status', "for help")

	const modify3 = db('openings')
		.where('status', 'Teammate')
		.update('status', 'to hire someone')

	Promise.all([
		modify1,
		modify2,
		modify3
	]).then(r => {
		console.log(status + ' MODIFYING DONE !');
	});
};


/*** ADD POSITION OPENINGS ***/

const addOpeningPosition = (status) => {
	const add1 = db.schema.alterTable('openings', function(t) {
		t.string('position', 256);
	});

	Promise.all([
		add1
	]).then(r => {
		console.log(status + ' MODIFYING DONE !');
	});
};

const execution = () => {
	if (process.argv[4] === 'modifStatus')
		modifyOpeningStatus('modif status');
	else if (process.argv[4] === 'addPosition') {
		console.log('OKKK');
		addOpeningPosition('add position');
	}
};

execution();

