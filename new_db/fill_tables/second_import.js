tools = require('./toolbox');

const second_import = (db,old, h) => {
return	Promise.all([
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
			old('reset_passwords')
			.select(['user_id as uid', 'token', db.raw('1 as mail_sent')])
			.then(r => {
				r = h.transform(r, ['users'])
				return db.batchInsert('reset_passwords', r)
			}),
// ------------------ user_skills ------------------
			old('user_skills')
			.select(['user_id as uid', 'skill_id'])
			.then(r => {
				r = h.transform(r, ['users'])
				return db.batchInsert('user_skills', r)
			}),
// ------------------ user_experiences ------------------
			old('user_experiences')
			.select(['user_id as uid', 'location_city as loc_id',
				'title', 'company', 'date_from', 'date_to', 'description'])
			.then(r => {
				r = h.transform(r, ['users', 'location'])
				return db.batchInsert('user_experiences', r)
			}),
// ------------------ user_interests ------------------
			old('user_interests')
			.select(['user_id as uid', 'interest_id'])
			.then(r => {
				r = h.transform(r, ['users', 'interests'])
				return db.batchInsert('user_interests', r)
			}),



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
