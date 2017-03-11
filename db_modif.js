const config = require('./app/private'),
    {db, TABLES} = require('./app/models/index');

//articles
//article_tags => List of tags for article
// tag_articles => relation table

// ------------------ Articles  ------------------

//Put drop Table in right order, to allow foreign key constraints

const add_admin = () => 
	db(TABLES.USERS).update('moderator', 1).where('id', 3719)

const profile_description_text = () => 
	db.schema.raw('alter table profiles change column description description TEXT(10000)');


const all_utf8 = () => {
	let x = [];
	for (var key in TABLES) {
	   if (TABLES.hasOwnProperty(key)) {
	   	x.push(db.schema.raw('alter table ' + TABLES[key] + '  CONVERT TO CHARACTER SET utf8').return());
	   }
	};
   return Promise.all(x).then(r => r)
};

const drop_tables = () => db.schema.dropTableIfExists('tag_articles')
							.dropTableIfExists('article_tags');

// ------------------ Alter tables ------------------

//			***	Articles ***
const alter_articles = () => {
	return Promise.all([
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
					t.foreign('user_id').references('users.id').onDelete('cascade')
					t.foreign('article_id').references('articles.id').onDelete('cascade')
				})
	})
		]);

};

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
return	db.schema.hasColumn('project_followers', 'follow_project_id')
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
const articles_tags = () => db.schema.createTable('article_tags', function(t) {
		t.increments();
		t.string('name').notNullable();
		t.unique('name');
		t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'))
		t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
});

const tag_articles = () => db.schema.createTable('tag_articles', function(t) {
		t.increments();
		t.integer('article_id').notNullable();
		t.integer('tag_id').unsigned().notNullable();
		t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'))
		t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
//			***	Relations	***		
		t.foreign('article_id').references('articles.id').onDelete('cascade');
		t.foreign('tag_id').references('article_tags.id').onDelete('cascade');
});

// ------------------ Insert tables ------------------
const insert_article_tags = () => {
	let x = [];
	let tags = ['mentoring', 'entrepreneurship', 'community', 'event', 'generationstartup', 'popcorn'];
	tags.forEach((r) => {
		x.push(db('article_tags').insert({name: r}).return());
	});
	return Promise.all(x).then(() => console.log("inserted succesffuly"))
	
};
const modify_db = () => {
	return drop_tables()
	.then(() => add_admin())
	//			*** Create ***
	.then(() => articles_tags())
	.then(() => tag_articles())
	//			*** Alter ***
	.then(() => alter_articles())
	.then(() => alter_location('profiles'))
	.then(() => alter_location('projects'))
	.then(() => alter_project_followers())
	.then(() => alter_projects())
	.then(() => alter_project_openings())
	//			*** Insert ***
	.then(() => insert_article_tags())
	//			*** Modify ***
	.then(() => profile_description_text())
	.then(() => all_utf8())
// //			***	Done	***
	.then(() => {
		console.log("Done modifying db")
		process.exit(1)
	})
	.catch(console.error)
};

modify_db();