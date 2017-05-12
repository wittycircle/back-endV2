const first_import = (db, old) => {
return	Promise.all([
// ------------------ users ------------------
			 old('users as u')
			.select(['email', 'password', 'username',
			 'valid', 'moderator', 'fake', 'invite_id as invite_link'])
			.leftJoin('share_invite_link as s', 'u.id', 's.user_id')
			.then(r => {
			return db.batchInsert('users', r)
			}),
// ------------------ categories ------------------ 
			 old('categories')
			.select(['name']) 
			.then(r => {
			return db.batchInsert('categories', r) 
			}),
// ------------------ account_validation ------------------
		 old('account_validation')
		.select(['token', 'user_email as email'])
		.then(r => {
			return db.batchInsert('account_validation', r)
		}),
// ------------------ skills ------------------
		 old('skills')
		.select(['name', 'category', 'priority'])
		.then(r => {
			return db.batchInsert('skills', r)
		}),
// ------------------ interests ------------------
		 old('interests')
		.distinct(['name', db.raw('MAX(priority) as priority')])
		.then(r => {
			return db.batchInsert('interests', r)
		}),
// ------------------ article_tags ------------------
		 old('article_tags')
		.select(['name'])
		.then(r => {
			return db.batchInsert('article_tags', r)
		}),
// ------------------ rooms ------------------
		 old('old_messages')
		.distinct([db.raw('CONCAT(from_user_id,"_", to_user_id) as name'),
			db.raw('MIN(creation_date) as creation_date')])
		.groupBy('creation_date')
		.then(r => {
			return db.batchInsert('rooms', r)
		}),
// ------------------ networks_list ------------------
		old('university_list')
		.select(['name', 'website as url', 'launched', 'popular', 'country'])
		.then(r => {
			r = [{name: "Unknown"}, ...r]
		return db.batchInsert('networks_list', r)
		}),
// ------------------ partnerships ------------------
		old('networks')
		.select(['name', 'type', 'url_name as url', 'token'])
		.then(r => {
		return db.batchInsert('partnerships', r)
		}),
	]);
};

module.exports = first_import;

