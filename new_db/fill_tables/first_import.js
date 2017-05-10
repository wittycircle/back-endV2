const first_import = (db, old, h) => {
return	Promise.all([
// ------------------ users ------------------
			 old('users as u')
			.select(['email', 'password', 'username',
			 'valid', 'moderator', 'fake', 'invite_id as invite_link'])
			.leftJoin('share_invite_link as s', 'u.id', 's.user_id')
			.then(r => {
			db.batchInsert('users', r)
			}),
// ------------------ categories ------------------ 
			 old('categories')
			.select(['name']) 
			.then(r => {
			db.batchInsert('categories', r) 
			}),
// ------------------ account_validation ------------------
		 old('account_validation')
		.select(['token', 'user_email as email'])
		.then(r => {
			db.batchInsert('account_validation', r)
		}),
// ------------------ skills ------------------
		 old('skills')
		.select(['name', 'category', 'priority'])
		.then(r => {
			db.batchInsert('skills', r)
		}),
// ------------------ interests ------------------
		 old('interests')
		.distinct(['name', db.raw('MAX(priority) as priority')])
		.then(r => {
			db.batchInsert('interests', r)
		}),
// ------------------ article_tags ------------------
		 old('article_tags')
		.select(['name'])
		.then(r => {
			db.batchInsert('article_tags', r)
		}),
// ------------------ rooms ------------------
		 old('old_messages')
		.distinct([db.raw('CONCAT(from_user_id,"_", to_user_id) as name'),
			db.raw('MIN(creation_date) as creation_date')])
		.groupBy('creation_date')
		.then(r => {
			db.batchInsert('rooms', r)
		}),
// ------------------ university_list ------------------
		old('university_list')
		.select(['name', 'website as url', 'launched', 'popular', 'country'])
		.then(r => {
		db.batchInsert('university_list', r)
		}),

/*	**************************************************************
				LES BAILS DENROULES ICI A FAIRE
	************************************************************** */

// ------------------ networks ------------------
			old('networks')
			.select(['name', 'type', 'url_name as url', 'token'])
			.then(r => {
			db.batchInsert('networks', r)
			}),
// ------------------ networks_group ------------------
			old('networks_group')
			.select(['title', 'logo', 'cover_picture', 'story', 'creation_date',
				'city', 'state', 'country'])
			.then(r => {
				r.forEach(e => {
					let key = `${e.city}_${e.state}_${e.country}`.toUpperCase();
					e.loc_id = 1;
				})
			db.batchInsert('networks_group', r)
			}),


	]); //promise_all
};

module.exports = first_import;

