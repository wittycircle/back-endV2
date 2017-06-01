const { db, TABLES } = require('./index');
//TODO
//Ranking problem [refresh your own profile]
//show dantzer index socket server profile view redis publish line 124
const setLocation = data => {
  if (!data) {
    return new Promise((ok, ko) => ok(['nolocation']));
  }

  const query = db(TABLES.LOCATION).first('id').where({ city: data.city });

  return query.then(r => {
    if (r && r.id) {
      // console.log('ALREADY EXIST', data, r);
      return [r.id];
    } else {
      // console.log('CREATING NEW ONE', data);
      return db(TABLES.LOCATION).insert({
        city: data.city,
        country: data.country,
        state: data.state,
        lat: data.latitude,
        lng: data.longitude
      });
    }
  });
};

const format_location = db.raw(`
  loc.city as city, loc.state as state, loc.country as country
`);

const getLocationId = data =>
  db(TABLES.LOCATION)
    .first('id')
    .where({ city: data.city || '' })
    .orWhere({ country: data.country || '' })
    .orWhere({ state: data.state || '' });

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
    'u.invite_link',
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
h.setLocation = setLocation;

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
