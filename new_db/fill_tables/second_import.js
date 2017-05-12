tools = require('./toolbox');

const second_import = (db,old, h) => {
return	Promise.all([

	/*	**************************************************************
				| Field              | Type         | Null | Key | Default           | Extra          |
+--------------------+--------------+------+-----+-------------------+----------------+
| id                 | int(11)      | NO   | PRI | NULL              | auto_increment |
| user_id            | int(11)      | NO   | MUL | NULL              |                |
| category_id        | int(11)      | NO   | MUL | NULL              |                |
| title              | varchar(512) | NO   |     | NULL              |                |
| description        | varchar(512) | NO   |     | NULL              |                |
| city               | varchar(128) | NO   |     | NULL              |                |
| state              | varchar(128) | YES  |     | NULL              |                |
| country            | varchar(128) | NO   |     | NULL              |                |
| picture            | varchar(128) | NO   |     | NULL              |                |
| about              | mediumtext   | YES  |     | NULL              |                |
| status             | varchar(128) | NO   |     | NULL              |                |
| video              | varchar(128) | YES  |     | NULL              |                |
| public_id          | int(11)      | NO   | UNI | NULL              |                |
| project_visibility | tinyint(1)   | YES  |     | NULL              |                |
| creation_date      | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
| network            | varchar(128) | YES  |     | NULL              |                |
| link               | varchar(255) | YES  |     | NULL              |                |
| app                | varchar(255) | YES  |     | NULL              |                |
| logo               | varchar(255) | YES  |     | NULL              |                |
+--------------------+--------------+------+-----+-------------------+----------------+
		************************************************************** */
// ------------------ projects ------------------
		old('projects')
		.select(['user_id as uid', 'category_id', 'city as loc_id',
		 'title', 'description', 'about', 'status', 
		 'picture', 'video', 'link', 'app', 'logo',
		 'public_id',
		 'project_visibility'

		 ])
		.then(r => {
			r = h.transform(r, ['users', 'location'])
			return db.batchInsert('projects', r)
		}),
// ------------------ profiles ------------------
		old('profiles as p')
		.join('users as u', 'u.profile_id', 'p.id')
		.select(['u.id as uid', 'city as loc_id', 'network as network_id',
			'first_name', 'last_name', 'profile_picture as picture', 'cover_picture', 'description',
			'about', 'genre', 'creation_date',
			])
		.then(r => {
			r = h.transform(r, ['users', 'location', 'networks'])
			return db.batchInsert('profiles', r)
		}),

// ------------------ reset_passwords ------------------
			// old('reset_passwords')
			// .select(['user_id as uid', 'token', db.raw('1 as mail_sent')])
			// .then(r => {
			// 	r = h.transform(r, ['users'])
			// 	return db.batchInsert('reset_passwords', r)
			// }),

// // ------------------ networks_group ------------------
	// old('networks_group')
	// // .select('*')
	// .select(['title', 'logo', 'cover_picture', 'story', 'creation_date', 'city'])
	// .then(r => {
	// 	r.forEach(e => {
	// 		e.loc_id = h.location[e.city] || 1
	// 		delete e.city;
	// 	})
	// return db.batchInsert('networks_group', r)
	// }),
]); //promise_all

};

module.exports = second_import
