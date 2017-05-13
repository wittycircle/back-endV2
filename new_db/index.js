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
};

    special_config.connection.database = process.argv[2];
    special_config.connection.password = process.argv[3];



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
        t.float('lat')
        t.float('lng')
        t.string('name', 128);
        t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
        t.charset('utf8');
    });
    });
};

 const create_db = () => {
    const db = require('knex')(special_config);

    return location_first(db)
        .then(main_tables(db))
        .then(secondary_tables(db))
        .then(ternary_tables(db))
        .then(quaternary_tables(db))
        .then(quinary_tables(db))
        .then(console.log("\n"))
        .then(console.log("Done creating db, will now import data"))
        .then(e => {
        process.exit(1);
        });
 };

    create_db()
    .catch(err => {
        if (err.code === 'ER_ACCESS_DENIED_ERROR'){
            console.log("Bad password")
            process.exit()
        }
        else if (err.code === 'ER_BAD_DB_ERROR'){
            console.log("Bad db name")
            process.exit()
        }
        else{
            console.log(` err.code : \n ${err.code}`)
            console.error(err)
        }
    })
