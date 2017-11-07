const { db, TABLES } = require('./index');

const setLocation = data => {
    if (!data) {
        return new Promise((ok, ko) => ok(['nolocation']));
    }

    const query = db(TABLES.LOCATION)
        .first('id')
        .where({ city: data.city });

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

const addLocation = (table, location, query) => {
    if (!_.isEmpty(location)) {
        let selected = '';
        let _location = location
            .split(',')
            .filter(e => e != '')
            .map(e => e.trim());
        _location.forEach((e, i) => {
            selected += `WHEN ${table}.city LIKE "${e}" THEN ${(i + 1) * 1000} `;
            selected += `WHEN ${table}.state LIKE "${e}" THEN ${(i + 1) * 100} `;
            selected += `WHEN ${table}.country LIKE "${e}" THEN ${(i + 1) * 10} `;
        });
        query.orderByRaw('CASE ' + selected + ' else 1 END DESC');
    }
};

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
            'p.description',
            'u.ambassador'
        ]
    },
    admin = (table, id, uid) => {
        const x = [];
        x.push(h.exist(table, id));
        x.push(
            db(TABLES.USERS)
                .select('id')
                .where({ id: uid, moderator: 1 })
        );
        return Promise.all(x);
    };

// prototype
h.sub_profile = db
    .select(h.p_uarray)
    .from(`${TABLES.PROFILES} as p`)
    .join(`${TABLES.USERS} as u`, 'u.id', 'p.user_id')
    .as('p');
h.u_profile = db
    .select(h.p_uarray)
    .from(h.sub_profile)
    .groupBy('p.id')
    .as('p');
h.exist = (table, value, name) =>
    db(table)
        .select('id')
        .whereRaw(`${name || 'id'} LIKE "%${value}%"`);
h.owner = (table, id, uid) =>
    db(table)
        .select('id')
        .where({ id, user_id: uid });
h.admin = admin;
h.format_location = format_location;
h.getLocationId = getLocationId;
h.addLocation = addLocation;
h.setLocation = setLocation;

h.fullname = db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName');
h.spe_profile = cond =>
    db
        .select(h.p_uarray)
        .from(`${TABLES.PROFILES} as p`)
        .join(`${TABLES.USERS} as u`, 'u.id', 'p.user_id')
        .where(cond)
        .as('p');

h.crea_profile = () =>
    db
        .select(h.p_uarray.concat('u.creation_date'))
        .from(`${TABLES.PROFILES} as p`)
        .join(`${TABLES.USERS} as u`, 'u.id', 'p.user_id')
        .as('p');

h.loc_profile = db
    .select('p.*', h.format_location)
    .from(h.sub_profile)
    .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id');

h.jsonThing = o => {
    let ret = '"{",';
    for (k in o) {
        ret += ` '"',   "${k}" , '":"',  ${o[k]},  '",'`;
    }
    ret = ret.substr(0, ret.length - 2) + `'"}"`;
    return ret;
};

h.unix_time = (x, y) => db.raw(`UNIX_TIMESTAMP(${x} as ${y})`);

h.magicSkills = selected =>
    db
        .select([
            's.id as id',
            's.name as name',
            'c.name as catName',
            db.raw(` (CASE ${selected}  else 1 END) as weight`)
        ])
        // .count('c.name as count')
        .from(TABLES.SKILLS + ' as s')
        .join(TABLES.SKILL_CAT + ' as sc', 's.id', 'sc.skill_id')
        .join(TABLES.SUB_SKILLS + ' as c', 'c.id', 'sc.sub_id')
        // .groupBy('s.id')
        .orderBy('weight', 'asc')
        // .orderBy('count')
        .as('s');

module.exports = h;
