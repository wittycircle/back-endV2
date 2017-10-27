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

/*** ADD CATEGORIES ***/

const addCategories = () => {
	const addCat = db('categories')
		.insert([{ name: 'education' }, { name: 'health' }, { name: 'mobility' }])

	Promise.all([addCat])
		.then(r => {
			console.log('ADD DONE !');
		});
}

addCategories();