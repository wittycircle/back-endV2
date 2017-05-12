
const _ = require('lodash'),
user_list = require('./data/users_data'),
location_list = require('./data/location_data');


const getUsers = (db, old) => {
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
};

const getLocation = (db, old) => {
	let loc = {}
	return db('location').select('city', 'id')
	.then((r) => {
		r.forEach(e => {
			loc[e.city] = e.id
		})
		return loc;
	})
};

const getNetworks = (db, old) => {
	let networks = {};
	return db('networks_list').select('id', 'name')
	.then(r => {
		r.forEach(e => {
			networks[e.name] = e.id;
		})
		return networks;
	})
};

const getInterests = (db, old) => {
	let interests = {};
	let new_interests = db('interests').select('id', 'name');
	let old_interests = old('interests').select('id', 'name');
	return Promise.all([new_interests, old_interests])
		.then(([nr, or]) => {
			or.forEach(e => {
				let x = nr.find(n => n.name == e.name).id
				// console.log(e.name, e.id, x)
				interests[e.id] = x;
				})
				return interests;
		});
}


module.exports.stuff = (db, old, h) => {
	return Promise.all([getUsers(db, old), getLocation(db, old),
		 getNetworks(db, old), getInterests(db, old)])
	.then(([users, location, networks, interests]) => {
		h.users = users;
		h.location = location;
		h.networks = networks;
		h.interests = interests;
		h.transform = (r, t) => {
			return r.map(e => {
				if (t.indexOf('users') !== -1){
					e.uid = h.users[e.uid] || 1
				}
				if (t.indexOf('location') !== -1){
					e.loc_id = h.location[e.loc_id] || 1
				}
				if (t.indexOf('networks') !== -1){
					e.network_id = h.networks[e.network_id] || 1
				}
				if (t.indexOf('interests') !== -1){
					e.interest_id = h.interests[e.interest_id] || 1
				}
				return e;
			});
		}
	});
}
