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
toolbox = require('./toolbox'),
_ = require('lodash');

/*	
*/

const fill_location = (db, old) => {
	location_list = require('./data/espoir');
	if (location_list){
		console.log("IT WORKED")
		return db.batchInsert('location', location_list)
	}
	// else {
	// 	console.log("GOOGLE THINGY")
	// 	return	old('profiles').distinct(['city']) 
	// 	.union(old('projects').distinct(['city'])) 
	// 	.then(r => {
	// 		let toInsert = [] 
	// 		let toPromise = [] 
	// 		r.forEach((e,i) => {
	// 			setInterval(() => 
	// 			toPromise.push(toolbox.google_loc(e.city) 
	// 				.then(r => {
	// 					toInsert.push(r)
	// 					console.log(r)
	// 				}) 
	// 				.catch(err=> console.error("wrg")) ) 
	// 			, 1000)
	// 		}) 
	// 		return Promise.all(toPromise).then(() => {
	// 			return db.batchInsert('location', toInsert) }); 
	// 			}) 
	// } 
};

const fill_tables =  (db, old) => {
	let h = {}
	fill_location(db, old)
	.then((r) => generate.location(db, old))
	.then(r => h.location = r)
	.then(() => first_import(db, old, h))
	.then(() => generate.users(db, old))
	.then(r => h.users = r)
	// .then(r => console.log(h))
	// // .then(() => second_import(db, old, h))
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
