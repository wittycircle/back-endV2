
_ = require('lodash')
module.exports.users = (db, old) => {
	let users = {}
	return old('users').select('id').then(r => {
		return db('users').select('id').then(rr => {
			let l = r.length;
			for(let i = 0;i< l;i++){
				let k =	 r[i].id;
				let v = rr[i].id;
				users[k] = v
			}
			return users;
		})
	})
}

module.exports.location = (db, old) => {
	let loc = {}
	return db('location').select('city', 'state', 'country', 'id') 
	.then((r) => {
		r.forEach(e => {
			let key = `${e.city}_${e.state}_${e.country}`;
			key = key.toUpperCase();
			console.log(key);
			loc[key] = e.id
		}) 
		// console.log(loc)
		return loc;
	})
}


