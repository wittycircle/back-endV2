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
generate = require('./generate_user_object'),
_ = require('lodash');

const fill_location = (db, old) => {

return	old('profiles').distinct(['city', 'state', 'country'])
	.union(old('projects').distinct(['city', 'state', 'country']))
	.then(r => {
		return db.batchInsert('location', r)
	})
}


const fill_tables =  (db, old) => {
	let h = {}
	fill_location(db, old)
	.then(() => generate.location(db, old))
	.then(r => h.location = r)
	.then(() => first_import(db, old, h))
	.then(() => generate.users(db, old))
	.then(r => h.users = r)
	.then(r => console.log(_.size(h)))
	// .then(() => second_import(db, old, h))
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
