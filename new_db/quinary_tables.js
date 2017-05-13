const quinary_tables = (db) => Promise.all([
	db.schema.createTableIfNotExists('discussion_likes', function(t) {
		t.increments();
		t.integer('user_id').unsigned().notNullable();
		t.integer('message_id').unsigned().notNullable();
	    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
		//t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

		t.charset('utf8');
	//			*** relations ***
		t.foreign('user_id').references('users.id').onDelete('cascade');
		t.foreign('message_id').references('discussion_messages.id').onDelete('cascade')
	}),
]);

module.exports = quinary_tables
