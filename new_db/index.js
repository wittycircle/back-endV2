const special_config = {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: '127.0.0.1',
        user: 'root',
        password: '14725803',
        database: 'newdb', //The one for test
    },
    pool: {
        min: 0,
        max: 1
    }
};

const db = require('knex')(special_config),
    _ = require('lodash');

 // ------------------ TODO ------------------
 /*
models statistics: remove notif_list and replace by views
 */
 // ------------------  ------------------


const main_tables = require('./main_tables'),
secondary_tables = require('./secondary_tables'),
ternary_tables = require('./ternary_tables');
quaternary_tables = require('./quaternary_tables');
quinary_tables = require('./quinary_tables');

// ------------------ Create new database ------------------

// ------------------ location ------------------
const location_first = (db) => db.schema.createTableIfNotExists('location', function(t) {
        t.increments();
        t.string('city', 128);
        t.string('state', 128);
        t.string('country', 128).notNullable();
        t.float('latitude')
        t.float('longitude')
        t.string('name', 128);
        t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
        t.charset('utf8');
    });


 const create_db = () => {
	return location_first(db)
        .then(main_tables(db))
		.then(secondary_tables(db))
		.then(ternary_tables(db))
        .then(quaternary_tables(db))
 };

 create_db()
 .then(console.log("Success"))
 .catch(err => console.error(err))


 /*	**************************************************************
	'users'
	'categories'
	'projects'
	'profiles'
	'social_profiles'
 	************************************************************** */
 
