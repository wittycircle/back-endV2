const {db, TABLES} = require('./app/models/index');
const {wm, TEMPLATES} = require('./app/services/mailer/wittymail');
const helper = require('sendgrid').mail;

const h = require('./app/models/helper'),
    // redis = require('ioredis')(require('./app/private').redis),//<= sale
 _ = require('lodash');


const table_creation_foreign = [
    db.schema.createTableIfNotExists('project_invites', function (t) {
        t.increments();
        t.integer('project_id').notNullable();
        t.integer('accepted').notNullable().defaultTo(0);
        t.string('token').notNullable();
        t.unique('project_id');
        t.unique('token');
        t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
        t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
//			***	Relations	***
        t.foreign('project_id').references('projects.id').onDelete('cascade');
    })
    ];

const modify_db = () => {
    return Promise.all(table_creation_foreign)
    .then(() => {
        console.log("project_invites table should be created")
        process.exit(1)
    }).catch(console.error)
}

modify_db()