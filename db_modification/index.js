const special_config = {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: '127.0.0.1',
        user: 'root',
        password: 'dbwitty',
        database: 'test_prod', //The one for test
    },
    pool: {
        min: 0,
        max: 1
    }
};

if (!process.argv[2]) {
    console.log("Please enter the database name as argument")
    process.exit()
}
else {
    special_config.connection.database = process.argv[2]    
}


const db = require('knex')(special_config),
    {notthedbused, TABLES} = require('../app/models/index'),
    _ = require('lodash');

/*
 // ------------------ TABLES THAT SEEMS UNUSED ------------------
 - notification_view
 - history
 - portfolios_likes
 - project_polls
 - project_networks

 // ------------------ ROW to remove ------------------
 projects -> network
 */

//articles
//article_tags => List of tags for article
// tag_articles => relation table

// ------------------ Articles  ------------------

//Put drop Table in right order, to allow foreign key constraints

// const add_admin = () =>
//     db(TABLES.USERS).update('moderator', 1).where('id', 3719);

const profile_description_text = () =>
    db.schema.raw('alter table profiles change column description description TEXT(10000)');

const messageToOldMessage = () =>
    db.schema.hasTable('old_messages').then(function (exists) {
        if (!exists) {
            console.log("DOES NOT EXIST")
            return db.schema.renameTable('messages', 'old_messages')
        } else {
            return db.schema.dropTableIfExists('messages')
            console.log("Already exist")
        }
    })

const all_utf8 = () => {
    let x = [];
    for (var key in TABLES) {
        if (TABLES.hasOwnProperty(key)) {
            x.push(db.schema.raw('alter table ' + TABLES[key] + '  CONVERT TO CHARACTER SET utf8').return());
        }
    }
    return Promise.all(x).then(r => r)
};

// ------------------ DROP ------------------
const drop_tables = () => db.schema
    .dropTableIfExists('tag_articles')
    .dropTableIfExists('article_tags')
    .dropTableIfExists('networks_group')
    .dropTableIfExists('opening_tags');
// ------------------ Alter tables ------------------

//          *** Articles ***
const alter_articles = () => {
    return Promise.all([
        db.schema.raw('alter table articles CHANGE COLUMN picture picture varchar(512) NULL DEFAULT NULL'),
        db.schema.raw('alter table articles CHANGE COLUMN article_id article_id int(11) NULL DEFAULT NULL'),
        db.schema.hasColumn('articles', 'creator_user_id')
            .then(exists => {
                if (exists)
                    return db.schema.table('articles',
                        t => t.renameColumn('creator_user_id', 'author_id'))
            }),
        db.schema.hasColumn('articles', 'view')
            .then(exists => {
                if (exists)
                    return db.schema.table('articles',
                        t => t.renameColumn('view', 'views'))
            }),
        db.schema.hasColumn('articles', 'user_id')
            .then(exists => {
                if (exists)
                    return db.schema.table('articles',
                        t => {
                            t.foreign('user_id').references('users.id').onDelete('cascade');
                            t.foreign('article_id').references('articles.id').onDelete('cascade')
                        })
            })
    ]);

};


//            *** Profiles ***
const alter_profiles = () => {
    return Promise.all([
        db.schema.raw('alter table profiles change COLUMN facebook_id facebook_id bigint(20) unsigned NULL DEFAULT NULL'),
        db.schema.raw('alter table profiles change COLUMN twitter_id twitter_id bigint(20) unsigned NULL DEFAULT NULL'),
        db.schema.raw('alter table profiles change COLUMN google_id google_id varchar(255) NULL DEFAULT NULL'),

        db.schema.raw('alter table profiles change COLUMN facebook_token facebook_token varchar(255) NULL DEFAULT NULL'),
        db.schema.raw('alter table profiles change COLUMN twitter_token twitter_token varchar(255) NULL DEFAULT NULL'),
        db.schema.raw('alter table profiles change COLUMN google_token google_token varchar(255) NULL DEFAULT NULL')

    ])

}
//			***	Location ***
const alter_location = (table) => {
    return Promise.all([
        db.schema.hasColumn(table, 'location_city')
            .then(exists => {
                if (exists)
                    return db.schema.table(table,
                        t => t.renameColumn('location_city', 'city'))
            }),

        db.schema.hasColumn(table, 'location_country')
            .then(exists => {
                if (exists)
                    return db.schema.table(table,
                        t => t.renameColumn('location_country', 'country'))
            }),

        db.schema.hasColumn(table, 'location_state')
            .then(exists => {
                if (exists)
                    return db.schema.table(table,
                        t => t.renameColumn('location_state', 'state'))
            })
    ]);
};
//			*** Project followers ***
const alter_project_followers = () => {
    return db.schema.hasColumn('project_followers', 'follow_project_id')
        .then(exists => {
            if (exists)
                return db.schema.table('project_followers',
                    t => t.renameColumn('follow_project_id', 'project_id'))
        });
};
//			*** Projects ***
const alter_projects = () => {
    return Promise.all([
        db.schema.hasColumn('projects', 'creator_user_id')
            .then(exists => {
                if (exists)
                    return db.schema.table('projects',
                        t => t.renameColumn('creator_user_id', 'user_id'))
            }),

        db.schema.hasColumn('projects', 'main_video')
            .then(exists => {
                if (exists)
                    return db.schema.table('projects',
                        t => t.renameColumn('main_video', 'video'))
            }),

        db.schema.hasColumn('projects', 'post')
            .then(exists => {
                if (exists)
                    return db.schema.table('projects',
                        t => t.renameColumn('post', 'about'))
            })
    ]);
};

//			*** Project openings ***

const alter_project_openings = () => {
    db.schema.hasColumn('project_openings', 'taggs')
        .then(exists => {
            if (exists)
                return db.schema.table('project_openings',
                    t => t.renameColumn('taggs', 'tags'))
        });
};


// ------------------ Create tables ------------------
const table_creation_no_foreign = [
    db.schema.createTableIfNotExists('article_tags', function (t) {
        t.increments();
        t.string('name').notNullable();
        t.unique('name');
        t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
        t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    }),
    db.schema.createTableIfNotExists(TABLES.MESSAGES, function (t) {
        t.increments();
        t.integer('room_id').unsigned().notNullable();
        t.integer('user_id').unsigned().notNullable();
        t.string('data').defaultTo(null);
        t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
        t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    }),
    db.schema.createTableIfNotExists('networks_group', function (t) {
        t.increments();
        t.string('title');
        t.string('logo');
        t.string('city');
        t.string('state');
        t.string('country');
        t.text('story');
        t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
    }),
];

const table_creation_foreign = [
    db.schema.createTableIfNotExists('tag_articles', function (t) {
        t.increments();
        t.integer('article_id').notNullable();
        t.integer('tag_id').unsigned().notNullable();
        t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
        t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
//			***	Relations	***
        t.foreign('article_id').references('articles.id').onDelete('cascade');
        t.foreign('tag_id').references('article_tags.id').onDelete('cascade');
    }),
    db.schema.createTableIfNotExists('opening_tags', function (t) {
        t.increments();
        t.integer('opening_id').notNullable();
        t.string('tag').notNullable();
        t.foreign('opening_id').references('project_openings.id').onDelete('cascade');
        t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
    })
];
// ------------------ Insert tables ------------------
const table_insert = () => [
    db.batchInsert(TABLES.ARTICLE_TAGS,
        ['mentoring', 'entrepreneurship', 'community', 'event', 'startup generation', 'popcorn']
            .map(tag => {
                return {name: tag}
            })
    ),
    db.batchInsert(TABLES.MESSAGES, [
        {room_id: 1, user_id: 1, data: 'Hello world'},
        {room_id: 1, user_id: 2, data: 'This is a test'},
        {room_id: 2, user_id: 3, data: 'This is another test'}
    ]),
    db.batchInsert(TABLES.TAG_ARTICLES, [
        {article_id: 4, tag_id: 2},
        {article_id: 4, tag_id: 5},
        {article_id: 4, tag_id: 3}
    ]),
    db.batchInsert('networks_group', require('./data_insert/data_networks_group')),
    db.batchInsert('opening_tags', require('./data_insert/data_opening_tags'))

];


const modify_db = () => {
    return drop_tables()
    // .then(() => add_admin())
        .then(() => messageToOldMessage())
        //			*** Create ***
        .then(() => Promise.all(table_creation_no_foreign))
        .then(() => Promise.all(table_creation_foreign))
        //			*** Alter ***
        .then(() => alter_articles())
        .then(() => alter_profiles())
        .then(() => alter_location('profiles'))
        .then(() => alter_location('projects'))
        .then(() => alter_project_followers())
        .then(() => alter_projects())
        .then(() => alter_project_openings())
        //			*** Insert ***
        .then(() => Promise.all(table_insert())) //regler ca
        //			*** Modify ***
        .then(() => profile_description_text())
        .then(() => all_utf8())
        // //			***	Done	***
        .then(() => {
            console.log("Done modifying db");
            process.exit(1)
        })
        .catch(console.error)
};

modify_db();