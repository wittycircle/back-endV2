
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

const getMatchingId = (db, old, table) => {
	let data = {}
	let old_u = old(table).select('id');
	let new_u = db(table).select('id');
	return 	Promise.all([old_u, new_u]).then(([r, rr]) => {
		let l = r.length;
		for(let i = 0;i< l;i++){
			let k =	 r[i].id;
			let v = rr[i].id;
			data[k] = v
		}
		return data;
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
				interests[e.id] = x;
				})
				return interests;
		})
};

const getFromName = (db, old, table, value = "name" ) => {
	let o = {};
	return db(table).select('id', value)
		.then(r => {
			r.forEach(e =>  o[e[value]] = e.id )
			return o;
		})
};

module.exports.moreStuff = (db, old, h) => {
	return Promise.all([
		getMatchingId(db, old, 'projects'),
	]).then(([projects]) => {
		h.projects = projects;
	});
}


module.exports.stuff = (db, old, h) => {
	return Promise.all([
		getMatchingId(db, old, 'users'),
		getFromName(db, old, 'location', 'city'),
		getFromName(db, old, 'networks_list'),
		getInterests(db, old),
		getFromName(db, old, 'partnerships'),
	 	getFromName(db, old, 'rooms')])
	.then(([users, location, networks, interests, partnerships, rooms]) => {
		h.users = users;
		h.location = location;
		h.networks = networks;
		h.interests = interests;
		h.partnerships = partnerships;
		h.rooms = rooms;
		h.transform = (r, t) => {
		let nik = []
		r.forEach(e => {
				if (t.indexOf('users') !== -1){
					e.user_id = h.users[e.user_id] || 0
				}
				if (t.indexOf('viewed') !== -1){
					e.viewed = h.users[e.viewed]
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
				if (t.indexOf('partnerships') !== -1){
					e.partnership_id = h.partnerships[e.partnership_id]
				}
				if (t.indexOf('rooms') !== -1) {
					e.room_id = h.rooms[e.room_id]
				}
				if (t.indexOf('projects') !== -1) {
					e.project_id = h.projects[e.project_id]
				}
				if (e.user_id !== 0)
					nik.push(e)
			});
			return nik;
		}
	});
}
