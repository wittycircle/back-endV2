const config = require('./app/private'),
    db = require('knex')(config.database);

//articles
//article_tags => tags for article
// tag_articles => relation table

// ------------------ Articles  ------------------

//Put drop Table in right order, to allow foreign key constraints

const drop_tables = () => db.schema.dropTableIfExists('tag_articles')
							.dropTableIfExists('article_tags');

const alter_articles = () => db.schema.hasColumn('articles', 'creator_user_id')
	.then(exists => {
		if (exists)
			return db.schema.table('articles', t => t.renameColumn('creator_user_id', 'author_id'))
	});
// const alter_articles = () => {
// 	if (db.schema.hasColumn('articles', 'creator_user_id'))
// 	{
// 	db.schema.table('articles', function(t) {
// 			t.renameColumn('creator_user_id', 'author_id');
// 		});

// 	}
// 	return ;
// }

const articles_tags = () => db.schema.createTable('article_tags', function(t) {
		t.increments();
		t.string('name').notNullable();
		t.unique('name');
});

const tag_articles = () => db.schema.createTable('tag_articles', function(t) {
		t.increments();
		t.integer('article_id').notNullable();
		t.integer('tag_id').unsigned().notNullable();
		t.foreign('article_id').references('articles.id').onDelete('cascade');
		t.foreign('tag_id').references('article_tags.id').onDelete('cascade');
});

const test_insert = () => {
	let x = [];
	return db.distinct('tag_name').from('old_article_tags').then(selection => {
		selection = selection.map(r => r.tag_name)
	selection.forEach((r) => {
		x.push(db('article_tags').insert({name: r}).return());
	});
	return Promise.all(x).then(() => console.log("inserted succesffuly"))
	});
};

const modify_db = () => {
	return drop_tables()
	.then(() => alter_articles())
	.then(() => articles_tags())
	.then(() => tag_articles())
	.then(() => test_insert())
// //			***	Done	***
	.then(() => process.exit(1))
	.catch(console.error)
};

modify_db();