const first_import = (db,old) => {
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
		.distinct([db.raw('CONCAT(from_user_id,"_", to_user_id) as name'), 'creation_date'])
		.then(r => {
			db.batchInsert('rooms', r)
		}),
	]); //promise_all
};

module.exports = first_import;

