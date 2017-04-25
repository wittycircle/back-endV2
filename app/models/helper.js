const {db, TABLES} = require('./index');

const format_location = db.raw(` 
	CASE WHEN (p.city IS NOT NULL)
		THEN
			CASE WHEN (p.state != NULL)
				THEN CONCAT(p.city, ', ', p.state)
			WHEN (p.country IS NOT NULL)
				THEN CONCAT(p.city, ', ', p.country)
				ELSE ' '
			END
		ELSE ' '
	END as location 
`);

const location = ['p.city', 'p.country', 'p.state']
	const h = {
    p_array :['p.id', 'p.first_name', 'p.last_name', 'p.profile_picture',
    		 'p.about', 'p.cover_picture', 'p.description', 'p.network'],
            p_uarray: ['p.id', 'u.id as uid', 'p.first_name', 'p.last_name',
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
h.exist = (table, value, name) => db(table).select('id').whereRaw(`${name || 'id'} LIKE "%${value}%"`)
	h.owner = (table, id, uid) => db(table).select('id').where({'id': id, 'user_id': uid})
	h.admin = admin
h.format_location = format_location
h.username = db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName')
h.spe_profile = (cond) => db.select(h.p_uarray.concat(location)).from(TABLES.USER_PROFILES + ' as p')
    .join(TABLES.USERS + ' as u', 'u.profile_id', 'p.id').where(cond).as('p');
h.unix_time = (x, y) => db.raw(`UNIX_TIMESTAMP(${x} as ${y})`)


module.exports = h;
