const {db, TABLES} = require('./index');

const location = ['p.city', 'p.country', 'p.state']
	const h = {
    p_array :['p.id', 'p.first_name', 'p.last_name', 'p.profile_picture',
    		 'p.about', 'p.cover_picture', 'p.description', 'p.network'],
	p_uarray : ['p.id', 'u.id as uid', 'p.first_name', 'p.last_name',
			'u.username', db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName'),
			 'p.profile_picture', 'p.about', 'p.cover_picture', 'p.description', 'p.network'],
    },
	admin = (table, id, uid) => {
		let x = []
		x.push(h.exist(table, id))
		x.push(db(TABLES.USERS)
			.select('id').where({id: uid, moderator: 1}))
		return Promise.all(x)
	};

//prototype
	h.up_array = h.p_array.concat('u.id as uid');
	h.sub_user = db.select('id', 'profile_id').from(TABLES.USERS).as('u');
	h.sub_profile = db.select(h.p_uarray).from(TABLES.USER_PROFILES + ' as p')
					.join(TABLES.USERS + ' as u', 'u.profile_id', 'p.id').as('p');
	h.u_profile = db.select(h.up_array).from(h.sub_profile).join(h.sub_user, 'u.profile_id', 'p.id').groupBy('p.id').as('p');
	h.ws_profile = (cond) => db.select(h.p_array).from(TABLES.USER_PROFILES + ' as p').where(cond).as('p');
	h.exist = (table, value, name) => db(table).select('id').where(name || 'id', value)
	h.owner = (table, id, uid) => db(table).select('id').where({'id': id, 'user_id': uid})
	h.admin = admin
	h.username = db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName')
	h.spe_profile = (cond) => db.select(h.p_uarray.concat(location)).from(TABLES.USER_PROFILES + ' as p')
					.join(TABLES.USERS + ' as u', 'u.profile_id', 'p.id').where(cond).as('p');


module.exports = h;
