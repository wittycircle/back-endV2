const quaternary_tables = (db) => Promise.all([
	db.schema.createTableIfNotExists('discussion_messages', function(t) {
		t.increments();
		t.integer('user_id').unsigned().notNullable();
		t.integer('discussion_id').unsigned().notNullable();
		t.text('message').notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		//t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
	
		t.charset('utf8');
	//			*** relations ***
		t.foreign('discussion_id').references('discussions.id').onDelete('cascade');
		t.foreign('user_id').references('users.id').onDelete('cascade');
		
	}),
	db.schema.createTableIfNotExists('opening_tags', function(t) {
		t.increments();
		t.integer('opening_id').unsigned().notNullable();
		t.integer('skill_id').unsigned().notNullable();
		t.integer('order').defaultTo(1);
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		t.charset('utf8');
	//			*** relations ***
		t.foreign('opening_id').references('openings.id').onDelete('cascade');
		t.foreign('skill_id').references('skills.id').onDelete('cascade');
	}),
]);


module.exports = quaternary_tables