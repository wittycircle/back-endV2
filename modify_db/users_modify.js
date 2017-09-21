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

const addAmbassadorToUser = () => {
	const add1 = db.schema.table('users', function (t) {
			t.boolean('ambassador').defaultTo(0).notNullable();
		});

	Promise.all([
			add1
		]).then(r => {
			console.log('MODIFYING DONE !');
		});
};

addAmbassadorToUser();