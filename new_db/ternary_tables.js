
/*	**************************************************************
				Tables that need project
	************************************************************** */

const ternary_tables = (db) => Promise.all([
// ------------------ user_socials ------------------
	db.schema.createTableIfNotExists('user_socials', function(t) {
		t.increments();
		t.integer('user_id').unsigned().notNullable();
		t.string('website_url', 128);
		t.string('facebook_url', 128);
		t.string('google_url', 128);
		t.string('twitter_url', 128);
		t.string('linkedin_url', 128);
		t.string('github_url', 128);

		t.bigint('facebook_id');
		t.bigint('google_id');
		t.bigint('twitter_id');
		t.bigint('linkedin_id');
		t.bigint('github_id');
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	//			*** relations ***
		t.foreign('user_id').references('users.id').onDelete('cascade')
	}),
// ------------------ project_followers ------------------
	db.schema.createTableIfNotExists('project_followers', function(t) {
		t.increments();
		t.integer('user_id').unsigned().notNullable();
		t.integer('project_id').unsigned().notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	//			*** relations ***
		t.foreign('user_id').references('users.id').onDelete('cascade');
		t.foreign('project_id').references('projects.id').onDelete('cascade')
	}),
// ------------------ project_users ------------------
	db.schema.createTableIfNotExists('project_users', function(t) {
		t.increments();
		t.integer('user_id').unsigned().notNullable();
		t.integer('invited_by').unsigned().notNullable();
		t.integer('project_id').unsigned().notNullable();
		t.boolean('accepted').defaultTo(0);
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		//t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

		t.charset('utf8');
	//			*** relations ***
		t.foreign('user_id').references('users.id').onDelete('cascade');
		t.foreign('invited_by').references('users.id').onDelete('cascade');
		t.foreign('project_id').references('projects.id').onDelete('cascade')

	}),
// ------------------ discussions ------------------
	db.schema.createTableIfNotExists('discussions', function(t) {
		t.increments();
		t.integer('project_id').unsigned().notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	//			*** relations ***
		t.foreign('project_id').references('projects.id').onDelete('cascade')
	}),
// ------------------ project_invites ------------------
	db.schema.createTableIfNotExists('project_invites', function(t) {
		t.increments();
		t.integer('project_id').unsigned().notNullable();
		t.string('token');
		t.boolean('accepted').defaultTo(0);

	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		t.charset('utf8');

		t.unique('token');
		t.unique('project_id');
	//			*** relations ***
		t.foreign('project_id').references('projects.id').onDelete('cascade')
	}),
// ------------------ project_openings ------------------
	db.schema.createTableIfNotExists('openings', function(t) {
		t.increments();
		t.integer('project_id').unsigned().notNullable();
		t.string('status', 128).notNullable().defaultTo('Any help');
		t.string('description', 512).notNullable();
		t.string('picture', 128).notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	//			*** relations ***
		t.foreign('project_id').references('projects.id').onDelete('cascade')
	}),
// ------------------ tag_articles ------------------
	db.schema.createTableIfNotExists('tag_articles', function(t) {
		t.increments();
		t.integer('article_id').unsigned().notNullable();
		t.integer('tag_id').unsigned().notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	//			*** relations ***
		t.foreign('article_id').references('articles.id').onDelete('cascade');
		t.foreign('tag_id').references('article_tags.id').onDelete('cascade');
	}),
// ------------------ article_likes ------------------
	db.schema.createTableIfNotExists('article_likes', function(t) {
		t.increments();
		t.integer('user_id').unsigned().notNullable();
		t.integer('article_id').unsigned().notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));

		t.charset('utf8');
	//			*** relations ***
		t.foreign('user_id').references('users.id').onDelete('cascade');
		t.foreign('article_id').references('articles.id').onDelete('cascade');
	}),
// ------------------ article_messages ------------------
	db.schema.createTableIfNotExists('article_messages', function(t) {
		t.increments();
		t.integer('article_id').unsigned().notNullable();
		t.integer('user_id').unsigned().notNullable();
		t.text('message').notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));

		t.charset('utf8');
	//			*** relations ***
		t.foreign('article_id').references('articles.id').onDelete('cascade');
		t.foreign('user_id').references('users.id').onDelete('cascade');
	}),
]);

module.exports = ternary_tables
