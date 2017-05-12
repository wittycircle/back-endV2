/*	**************************************************************
				CONFIG
	************************************************************** */

const special_config = {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: '', 
    },
    pool: {
        min: 0,
        max: 1
    }
},
    old_config = {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: '', 
    },
    pool: {
        min: 0,
        max: 1
    }
};


special_config.connection.database = process.argv[2];
special_config.connection.password = process.argv[3];
old_config.connection.password = process.argv[3];
old_config.connection.database = process.argv[4];


const db = require('knex')(special_config);
const old = require('knex')(old_config);
var https = require('https');


/*	**************************************************************
				Import
	************************************************************** */

const first_import = require('./first_import'),
second_import = require('./second_import'),
third_import = require('./third_import'),
fourth_import = require('./fourth_import'),
fifth_import = require('./fifth_import'),
generate = require('./generate_stuff'),
toolbox = require('./toolbox'),
_ = require('lodash');

/*	
*/

const fill_location = (db, old) => {
	location_list = require('./data/location_data');
	if (location_list){
		console.log("IT WORKED")
		return db.batchInsert('location', location_list)
	}
};

const fill_tables =  (db, old) => {
	let h = {};

	return fill_location(db, old)
	.then(() => first_import(db, old))
	.then(() => generate.stuff(db, old, h))
	.then(() => second_import(db, old, h))
	.then(() => console.log("Done import"))
	.then(() => {
		process.exit()
	})
	    .catch(err => {
        if (err.code === 'ER_ACCESS_DENIED_ERROR'){
            console.log("Bad password")
            process.exit()
        }
        else if (err.code === 'ER_BAD_DB_ERROR'){
            console.log("Bad db name [old db]")
            process.exit()
        }
        else{
            console.log(` err.code : \n ${err.code}`)
            console.error(err)
        }
    })

};

fill_tables(db, old)
