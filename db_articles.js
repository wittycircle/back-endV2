// const config = require('./app/private'),
//     db = require('knex')(config.database);

// const options = onDelete('cascade').notNullable();

// db.schema.createTable('article_tags', function(t) {
// 	t.increments(),
// 	t.foreign('article_id').references('articles.id').onDelete('cascade').notNullable()
// });
