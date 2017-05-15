const { db, TABLES } = require('./index');

const format_location = db.raw(`
	CASE WHEN (loc.city IS NOT NULL)
		THEN
			CASE WHEN (loc.state != NULL)
				THEN CONCAT(loc.city, ', ', loc.state)
			WHEN (loc.country IS NOT NULL)
				THEN CONCAT(loc.city, ', ', loc.country)
				ELSE ' '
			END
		ELSE ' '
	END as location
`);

const location = ['p.city', 'p.country', 'p.state'];
const h = {
  p_array: [
    'p.id',
    'p.first_name',
    'p.last_name',
    'p.picture',
    'p.about',
    'p.cover_picture',
    'p.description',
    'p.network'
  ],
  p_uarray: [
    'p.id',
    'u.id as uid',
    'p.first_name',
    'p.last_name',
    'u.username',
    db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName'),
    'p.picture',
    'p.about',
    'p.cover_picture',
    'p.description',
    'p.network'
  ]
},
  admin = (table, id, uid) => {
    let x = [];
    x.push(h.exist(table, id));
    x.push(db(TABLES.USERS).select('id').where({ id: uid, moderator: 1 }));
    return Promise.all(x);
  };

//prototype
h.up_array = h.p_array.concat('u.id as uid');
h.sub_user = db.select('id', 'profile_id').from(TABLES.USERS).as('u');
h.sub_profile = db
  .select(h.p_uarray)
  .from(TABLES.USER_PROFILES + ' as p')
  .join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
  .as('p');
h.u_profile = db
  .select(h.up_array)
  .from(h.sub_profile)
  .join(h.sub_user, 'u.id', 'p.user_id')
  .groupBy('p.id')
  .as('p');
h.ws_profile = cond =>
  db.select(h.p_array).from(TABLES.USER_PROFILES + ' as p').where(cond).as('p');
h.exist = (table, value, name) =>
  db(table).select('id').whereRaw(`${name || 'id'} LIKE "%${value}%"`);
h.owner = (table, id, uid) =>
  db(table).select('id').where({ id: id, user_id: uid });
h.admin = admin;
h.format_location = format_location;
h.getLocation = id => db(TABLES.LOCATION).select(h.format_location);

h.fullname = db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName');
h.spe_profile = cond =>
  db
    .select(h.p_uarray.concat(location))
    .from(TABLES.USER_PROFILES + ' as p')
    .join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
    .where(cond)
    .as('p');
h.unix_time = (x, y) => db.raw(`UNIX_TIMESTAMP(${x} as ${y})`);

module.exports = h;
