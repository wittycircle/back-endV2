const main_tables = (db) => Promise.all([
// ------------------ users ------------------
	db.schema.createTableIfNotExists('users', function(t) {
		t.increments();
		t.string('email', 128).notNullable();
		t.string('password', 128).notNullable();
		t.string('username', 128).notNullable();
		t.boolean('valid').defaultTo(0).notNullable();
		t.boolean('moderator').defaultTo(0).notNullable();
		t.boolean('fake').defaultTo(0).notNullable();
		t.string('invite_link', 64).notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		t.charset('utf8')
	}),

// ------------------ categories ------------------
	db.schema.createTableIfNotExists('categories', function(t) {
		t.increments();
		t.string('name', 128).notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
	
		t.unique('name');
		t.charset('utf8');
	}),
// ------------------ account validation ------------------
	db.schema.createTableIfNotExists('account_validation', function(t) {
		t.increments();
		t.string('token', 128).notNullable();
		t.string('email', 128).notNullable();
		t.boolean('mail_sent').defaultTo(0);
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	}),
// ------------------ skills ------------------
	db.schema.createTableIfNotExists('skills', function(t) {
		t.increments();
		t.string('name', 128).notNullable();
		t.string('category', 128).defaultTo('unknown');
		t.integer('priority')
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	}),
// ------------------ location ------------------
	db.schema.createTableIfNotExists('location', function(t) {
		t.increments();
		t.string('city', 128);
		t.string('state', 128);
		t.string('country', 128).notNullable();
		t.float('latitude')
		t.float('longitude')
		t.string('name', 128);
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	}),
// ------------------ interests ------------------
	db.schema.createTableIfNotExists('interests', function(t) {
		t.increments();
		t.string('name', 128).notNullable();
		t.integer('priority').defaultTo(0);
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
		t.unique('name');
	}),
// ------------------ article_tags ------------------
	db.schema.createTableIfNotExists('article_tags', function(t) {
		t.increments();
		t.string('name').notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));

		t.charset('utf8');
		t.unique('name');
	}),
// ------------------ rooms ------------------
	db.schema.createTableIfNotExists('rooms', function(t) {
		t.increments();
		t.string('name', 128);
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	}),

/*	**************************************************************
				thoses that needs location
	************************************************************** */

// ------------------ university_list ------------------
	db.schema.createTableIfNotExists('university_list', function(t) {
		t.increments();
		t.integer('loc_id').unsigned().notNullable();
		t.string('name', 128).notNullable();
		t.string('url', 128);
		t.boolean('launched');
		t.boolean('popular');
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	//			*** relations ***
		t.foreign('loc_id').references('location.id').onDelete('cascade');
		
	}),
// ------------------ networks ------------------
	db.schema.createTableIfNotExists('networks', function(t) {
		t.increments();
		t.integer('loc_id').unsigned().notNullable();
		t.string('title', 128).notNullable();
		t.string('type', 128).notNullable();
		t.string('url',128).notNullable();
		t.string('logo',128);
		t.text('story');
		t.string('token', 128);
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
		//			*** relations ***
		t.foreign('loc_id').references('location.id').onDelete('cascade');
	}),
]);

module.exports = main_tables;