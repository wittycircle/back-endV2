

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
				bails de google pour la magie de location
				//plus tard?
	************************************************************** */
/*
const google_loc = (city) => {
	let bla = ""
	// let or = {
	// 	city,
	// 	state, "",
	// 	country, "",
	// 	latitude: "",
	// 	longitude: "",
	// };

	let API_KEY = "AIzaSyAz20i0p6h1gXdaQz4OgYEA-9GGdJ4hv_0"; 
	let url_path = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}` 
	https.get(url_path, res => {
		res.setEncoding('utf8') 
		res.on('data', d => bla += d)
		res.on('end', d => {
			bla = JSON.parse(bla)
			console.log(bla.results[0].address_components)
		})
	})
}
*/

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
	let o = {}
	fill_location(db, old)
	.then(first_import(db, old))
	.then(() => generate(db, old).then(r => o = r))
	.then(r => console.log(_.size(r)))
	.then(() => console.log("Done import"))
	.catch(err => console.error("NIK NIK NIK LES ERRORs"))

};

fill_tables(db, old)