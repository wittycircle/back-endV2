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

const addTrackingTable = () => {
	const createPageModalList = db.schema.createTableIfNotExists('page_modal_list', function(t) {
		t.increments();
		t.string('name', 64).notNullable();
		t.string('type', 32).notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	});

	const createZoneList = db.schema.createTableIfNotExists('zone_list', function(t) {
		t.increments();
		t.string('name', 64).notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	});

	const createZoneView = db.schema.createTableIfNotExists('zone_view_activities', function(t) {
		t.increments();
		t.integer('rate').defaultTo(0);
		t.integer('page_modal_id').notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	});

	const createZoneClick = db.schema.createTableIfNotExists('zone_click_activities', function(t) {
		t.increments();
		t.integer('zone_id').notNullable();
		t.integer('page_modal_id').notNullable();
		t.integer('rate').defaultTo(0);
		t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	});

	const createUserView = db.schema.createTableIfNotExists('user_view_activities', function(t) {
		t.increments();
		t.integer('user_id').notNullable();
		t.integer('page_id').notNullable();
		t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	});

	const createUserClick = db.schema.createTableIfNotExists('user_click_activities', function(t) {
		t.increments();
		t.integer('user_id').notNullable();
		t.integer('zone_id').notNullable();
		t.integer('page_id').notNullable();
		t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	});

	const insertZoneList = db('zone_list')
		.insert([
			{ name: 'home_header' },
			{ name: 'discover_header' },
			{ name: 'meet_header' },
			{ name: 'learn_header' },
			{ name: 'post_header' }
		]);

	const insertPageModalList = db('page_modal_list')
		.insert([
			{ name: 'inv_bulk', type: 'page' },
			{ name: 'inv_user', type: 'page' },
			{ name: 'inv_network', type: 'page' },
			{ name: 'landing_page', type: 'page' },
			{ name: 'home_page', type: 'page' },
			{ name: 'discover_page', type: 'page' },
			{ name: 'meet_page', type: 'page' },
			{ name: 'learn_page', type: 'page' },
		]);

	Promise.all([
		createPageModalList,
		createZoneList,
		createZoneView,
		createZoneClick,
		createUserView,
		createUserClick,
		insertZoneList,
		insertPageModalList
	]).then(r => {
		console.log('ADDING DONE !');
	});
};

addTrackingTable();