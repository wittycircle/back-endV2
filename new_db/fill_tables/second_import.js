tools = require('./toolbox');

const second_import = (db,old, o) => {
return	Promise.all([
	// ------------------ room_members ------------------
				old('old_messages')
				.select([''])
				.then(r => {
					r = match_id(o, r)
				db.batchInsert('room_members', r)
				}),
	
	]);
};

module.exports = second_import
