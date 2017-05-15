/*	**************************************************************
				tables that need user
	************************************************************** */

const secondary_tables = db =>
  Promise.all([
    // ------------------ projects ------------------
    db.schema.createTableIfNotExists('projects', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('category_id').unsigned().notNullable();
      t.integer('loc_id').unsigned().notNullable();
      t.string('status', 128).notNullable();
      t.string('title', 512).notNullable();
      t.string('description', 512).notNullable();
      t.text('about');
      t.string('picture', 128).notNullable();
      t.string('video', 128);
      t.string('link');
      t.string('app');
      t.string('logo');
      t.integer('public_id').notNullable();
      t.boolean('project_visibility').defaultTo(1);

      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      t
        .timestamp('updated_at')
        .defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t
        .foreign('category_id')
        .references('categories.id')
        .onDelete('cascade')
        .onUpdate('cascade');
      t.foreign('loc_id').references('location.id').onDelete('cascade');
    }),

    // ------------------ profiles ------------------
    db.schema.createTableIfNotExists('profiles', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('loc_id').unsigned().notNullable();
      t.integer('network_id').unsigned().notNullable();
      t.string('first_name', 128).notNullable();
      t.string('last_name', 128).notNullable();
      t.string('picture', 128).notNullable();
      t.string('cover_picture', 128).notNullable();
      t.text('description');
      t.string('about', 128);
      t.string('genre', 128);
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      t
        .timestamp('updated_at')
        .defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t.foreign('loc_id').references('location.id').onDelete('cascade');
      t.foreign('network_id').references('networks_list.id').onDelete('cascade');
    }),
    // ------------------ reset_passwords ------------------
    db.schema.createTableIfNotExists('reset_passwords', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.string('token', 128).notNullable();
      t.boolean('mail_sent').defaultTo(0);
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
    }),
    // ------------------ user_skills ------------------
    db.schema.createTableIfNotExists('user_skills', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('skill_id').unsigned().notNullable();
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t.foreign('skill_id').references('skills.id').onDelete('cascade');
    }),
    // ------------------ user_experiences ------------------
    db.schema.createTableIfNotExists('user_experiences', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('loc_id').unsigned().notNullable();
      t.string('title', 128).notNullable();
      t.string('company', 128).notNullable();
      t.string('date_from', 128).notNullable();
      t.string('date_to', 128).notNullable();
      t.string('description', 128);

      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      //t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t.foreign('loc_id').references('location.id').onDelete('cascade');
    }),
    // ------------------ user_followers ------------------
    db.schema.createTableIfNotExists('user_followers', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('followed').unsigned().notNullable();
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t.foreign('followed').references('users.id').onDelete('cascade');
    }),
    // ------------------ user_interests ------------------
    db.schema.createTableIfNotExists('user_interests', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('interest_id').unsigned().notNullable();
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      //t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t.foreign('interest_id').references('interests.id').onDelete('cascade');
    }),
    // ------------------ articles ------------------
    db.schema.createTableIfNotExists('articles', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.string('title').notNullable();
      t.text('text', 'longtext');
      t.string('picture', 128).notNullable();
      t.integer('views').unsigned();
      t.integer('public_id').unsigned();
      t.integer('read_time').unsigned();
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
    }),
    // ------------------ notification_permission ------------------
    db.schema.createTableIfNotExists('notification_permission', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.string('notif_type', 64).notNullable();
      t.boolean('permission').notNullable();
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      //t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
    }),
    // ------------------ partnerships_invite ------------------
    db.schema.createTableIfNotExists('partnerships_invite', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('partnership_id').unsigned().notNullable();
      t.integer('nb_students').unsigned().defaultTo(0);
      t.text('message');
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t
        .foreign('partnership_id')
        .references('partnerships.id')
        .onDelete('cascade');
    }),
    // ------------------ views ------------------
    db.schema.createTableIfNotExists('views', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('viewed').unsigned().notNullable();
      t.boolean('mail_sent').defaultTo(0);
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t.foreign('viewed').references('users.id').onDelete('cascade');
    }),
    // ------------------ room_members ------------------
    db.schema.createTableIfNotExists('room_members', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('room_id').unsigned().notNullable();
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      //t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
      t.foreign('room_id').references('rooms.id').onDelete('cascade');
    }),
    // ------------------ messages ------------------
    db.schema.createTableIfNotExists('messages', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('room_id').unsigned().notNullable();
      t.text('message').notNullable();
      t.boolean('read').defaultTo(0);
      t.boolean('mail_sent').defaultTo(0);
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      //t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('room_id').references('rooms.id').onDelete('cascade');
      t.foreign('user_id').references('users.id').onDelete('cascade');
    }),
    // ------------------ invitations ------------------
    db.schema.createTableIfNotExists('invitations', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.string('mail_to', 128).notNullable();
      t.boolean('mail_sent').defaultTo(0);
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      //t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
    }),
    // ------------------ networks_info ------------------
    db.schema.createTableIfNotExists('networks_info', function(t) {
      t.increments();
      t.integer('loc_id').unsigned().notNullable();
      t.integer('network_id').unsigned().notNullable();
      t.string('logo', 128);
      t.string('cover_picture', 128);
      t.text('story');
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      t.charset('utf8');
      //			*** relations ***
      t.foreign('loc_id').references('location.id').onDelete('cascade');
      t.foreign('network_id').references('networks_list.id').onDelete('cascade');
    }),
    // ------------------ network_verification ------------------
    db.schema.createTableIfNotExists('network_verification', function(t) {
      t.increments();
      t.integer('network_id').unsigned().notNullable();
      t.integer('user_id').unsigned().notNullable();
      t.boolean('verification').defaultTo(0);
      t.string('token').notNullable();
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));

      t.charset('utf8');
      //			*** relations ***
      t.foreign('network_id').references('networks_list.id').onDelete('cascade');
      t.foreign('user_id').references('users.id').onDelete('cascade');
    }),
    // ------------------ ranks ------------------
    db.schema.createTableIfNotExists('ranks', function(t) {
      t.increments();
      t.integer('user_id').unsigned().notNullable();
      t.integer('rank').unsigned().notNullable();
      //			*** relations ***
      t.foreign('user_id').references('users.id').onDelete('cascade');
    })
  ]);

module.exports = secondary_tables;
