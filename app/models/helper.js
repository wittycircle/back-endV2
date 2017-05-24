const { db, TABLES } = require('./index');

//TODO:
// Do a generic thing to find the location [set loc_id]
//If not found, create it [like from searchProject where there is the google bla]

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

const getLocationId = data =>
  db(TABLES.LOCATION)
    .first('id')
    .where({ city: data.city })
    .orWhere({ country: data.country })
    .orWhere({ state: data.state });

const h = {
  p_array: [
    'p.id',
    'p.first_name',
    'p.last_name',
    'p.picture',
    'p.about',
    'p.cover_picture',
    'p.description',
    'p.network_id'
  ],
  p_uarray: [
    'p.id',
    'p.loc_id',
    'p.user_id as uid',
    'p.network_id',
    'p.first_name',
    'p.last_name',
    'u.username',
    db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName'),
    'p.picture',
    'p.about',
    'p.cover_picture',
    'p.description'
  ]
},
  admin = (table, id, uid) => {
    const x = [];
    x.push(h.exist(table, id));
    x.push(db(TABLES.USERS).select('id').where({ id: uid, moderator: 1 }));
    return Promise.all(x);
  };

// prototype
h.sub_profile = db
  .select(h.p_uarray)
  .from(`${TABLES.PROFILES} as p`)
  .join(`${TABLES.USERS} as u`, 'u.id', 'p.user_id')
  .as('p');
h.u_profile = db.select(h.p_uarray).from(h.sub_profile).groupBy('p.id').as('p');
h.exist = (table, value, name) =>
  db(table).select('id').whereRaw(`${name || 'id'} LIKE "%${value}%"`);
h.owner = (table, id, uid) => db(table).select('id').where({ id, user_id: uid });
h.admin = admin;
h.format_location = format_location;
h.getLocationId = getLocationId;

h.fullname = db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName');
h.spe_profile = cond =>
  db
    .select(h.p_uarray)
    .from(`${TABLES.PROFILES} as p`)
    .join(`${TABLES.USERS} as u`, 'u.id', 'p.user_id')
    .where(cond)
    .as('p');

h.loc_profile = db
  .select('p.*', h.format_location)
  .from(h.sub_profile)
  .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id');

h.unix_time = (x, y) => db.raw(`UNIX_TIMESTAMP(${x} as ${y})`);

module.exports = h;
