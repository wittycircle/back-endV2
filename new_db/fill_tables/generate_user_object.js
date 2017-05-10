
_ = require('lodash')
module.exports.users = (db, old) => {
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
	return db('location').select('city', 'state', 'country', 'id') 
	.then((r) => {
		r.forEach(e => {
			let key = `${e.city}_${e.state}_${e.country}`.toUpperCase();
			key = key.toUpperCase();
			console.log(key);
			loc[key] = e.id
		}) 
		return loc;
	})
}


