const special_config = {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: '', //The one for test
    },
    pool: {
        min: 0,
        max: 1
    }
};

const laider = () => {
    let readline = require('readline'); 
    let Writable = require('stream').Writable;
 
 let mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
        if (!this.muted) 
            process.stdout.write(chunk, encoding); 
        callback(); 
    } 
});
 
 mutableStdout.muted = false;
 
 let rl = readline.createInterface({
    input: process.stdin, 
    output: mutableStdout, 
    terminal: true 
});

 rl.question('Password: ', function(password) {
    console.log('\nPassword is ' + password); 
    special_config.connection.password = password; 
    create_db() 
    rl.close(); 
});
 mutableStdout.muted = true; 
}

if (!process.argv[2]) {
    console.log("Please enter the database name as argument")
    process.exit()
}
else {
    special_config.connection.database = process.argv[2]    
    laider()
}

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
const location_first = (db) => {
    return db.schema.hasTable('location').then(function(exists) {
        if (exists){
            console.error("Tables already existed. Need a db without tables")
            process.exit();
        }
    return db.schema.createTableIfNotExists('location', function(t) {
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
    });
};

 const create_db = () => {
    console.log(special_config)   
	// return location_first(db)
 //        .then(main_tables(db))
	// 	.then(secondary_tables(db))
	// 	.then(ternary_tables(db))
 //        .then(quaternary_tables(db))
 };

 // create_db()
 // .then(console.log("Success"))
 // .catch(err => console.error(err))


 /*	**************************************************************
	'users'
	'categories'
	'projects'
	'profiles'
	'social_profiles'
 	************************************************************** */
 