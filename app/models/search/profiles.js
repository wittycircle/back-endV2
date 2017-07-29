'use strict';

const { db, TABLES } = require('../index'),
  h = require('../helper'),
  data = require('./data'),
  _ = require('lodash');

// ------------------ DATA PROFILE SEARCH ---------------
const profile_array = [
  'p.id',
  'p.user_id',
  'p.picture',
  'p.about',
  'p.cover_picture',
  'p.description',
  'nl.name as network',
  h.format_location,
  h.fullname,
  'u.username'
];

const ret_array = [
  'sort.weight',
  'fullName',
  'username',
  'rank',
  'sort.id as user_id',
  'p.id',
  'picture',
  'foli',
  'cover_picture',
  'about',
  'description',
  'network',
  'city',
  'state',
  'country',
  'follower',
  'following',
  'skills'
];

const exp = db.select('user_id').from(TABLES.USER_EXPERIENCES).as('e');

const following = db
  .select('user_id')
  .count('user_id as total')
  .from(TABLES.USER_FOLLOWERS)
  .groupBy('user_id')
  .as('ssu');
const follower = db
  .select('followed')
  .count('followed as MA')
  .from(TABLES.USER_FOLLOWERS)
  .groupBy('followed')
  .as('su');
const ifo = db
  .distinct('followed', 'user_id')
  .from(TABLES.USER_FOLLOWERS)
  .as('ifo');

// ------------------ Profile ------------------
module.exports = selector => {
  console.log('SELECTOR', selector);
  // ---------  Main query -------

  const skills = db
    .select('user_id', 's.*')
    .from(TABLES.USER_SKILLS + ' as us')
    .join(h.magicSkills(selector.cats), 'us.skill_id', 's.id')
    .as('s');

  const sortCardProfile = db
    .select([
      's.weight',
      'u.id',
      'r.rank as rank',
      db.raw('GROUP_CONCAT(ifo.user_id) as foli'),
      db.raw('IFNULL(total, 0) as following'),
      db.raw('IFNULL (MA, 0) as follower'),
      db.raw('GROUP_CONCAT(DISTINCT s.name) as skills'),
      db.raw('GROUP_CONCAT(DISTINCT s.catName) as catNames')
    ])
    .from(TABLES.USERS + ' as u')
    .leftJoin(skills, 'u.id', 's.user_id')
    .leftJoin(TABLES.RANK + ' as r', 'u.id', 'r.user_id') //leftJoin to get those without rank [All users will have a rank?]
    .leftJoin(following, 'ssu.user_id', 'u.id')
    .leftJoin(follower, 'su.followed', 'u.id')
    .leftJoin(ifo, 'ifo.followed', 'u.id')
    .groupBy('u.id')
    .as('sort');

  //  Profile stuff [hydrate with infos, join on q below]

  const profileStuff = location => {
    return db
      .select(profile_array)
      .from(TABLES.PROFILES + ' as p')
      .join(TABLES.USERS + ' as u', 'p.user_id', 'u.id')
      .join(TABLES.NETWORKS_LIST + ' as nl', 'p.network_id', 'nl.id')
      .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
      .where('p.description', '!=', 'NULL')
      .andWhere('p.picture', '!=', 'NULL')
      .andWhere('u.fake', '=', '0')
      .as('p');
  };

  // ---- Constructing full query -------

  let q = db
    .select(ret_array)
    .from(sortCardProfile)
    .join(profileStuff(selector.location), 'sort.id', 'p.user_id')
    .leftJoin(exp, 'e.user_id', 'sort.id')
    .groupBy('sort.id')
    .where('sort.rank', '>', '0'); //todo remove

  h.addLocation('p', selector.location, q);

  // ----------------------- SELECTORS -------------------------
  //TODO
  if (selector.skills) {
    console.log('SHOULD NOT');
    q.whereRaw('weight IS NOT NULL');
    q.orderByRaw('sort.weight');
  }

  if (selector.network) {
    q.orderByRaw(
      `CASE WHEN network like "%${selector.network}%" THEN 1 else 2 END, network`
    );
  }
  if (selector.about)
    q.orderByRaw(
      'CASE WHEN about = "' + selector.about + '" THEN 1 else 2 END, about'
    );

  return q;
};
