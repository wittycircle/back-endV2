
const _ = require('lodash'),
user_list = require('./data/users_data'),
location_list = require('./data/location_data');


module.exports.users = (db, old) => {
	if (user_list)
		return user_list;
	let users = {}
	let old_u = old('users').select('id');
	let new_u = db('users').select('id');
return 	Promise.all([old_u, new_u]).then(([r, rr]) => {
			let l = r.length;
			for(let i = 0;i< l;i++){
				let k =	 r[i].id;
				let v = rr[i].id;
				users[k] = v
			}
			return users;
	})
}

module.exports.location = (db, old) => {
	let loc = {"unknown" : 1}
	return db('location').select('city', 'id')
	.then((r) => {
		r.forEach(e => {
			loc[e.city] = e.id
		}) 
		return loc;
	})
}


