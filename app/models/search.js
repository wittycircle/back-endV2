/**
 * Created by rdantzer on 16/02/17.
 */

'use strict';

const { db, TABLES } = require('./index'),
  h = require('./helper'),
  _ = require('lodash');

const addLocation = (table, location, query) => {
  if (!_.isEmpty(location)) {
    const _location = location.split(',');
    let selected = '';
    console.log('HERE');
    selected += `WHEN ${table}.city LIKE "%${_location[0]}%" THEN 1 `;
    selected += `WHEN ${table}.state LIKE "%${_location[1]}%" THEN 2 `;
    selected += `WHEN ${table}.country LIKE "%${_location[1]}%" THEN 3 `;
    query.orderByRaw('CASE ' + selected + ' else 100 END');

    // query.whereRaw(`{table}.city like "%${_location[0]}%"
    //     or {table}.state like "%${_location[1]}%"
    //     or {table}.country like "%${_location[1]}%"`)
  }
};
// ------------------ Profile ------------------
exports.cardProfile = selector => {
  let exp = db.select('user_id').from(TABLES.USER_EXPERIENCES).as('e'),
    skills = db
      .select('user_id', 'name')
      .from(TABLES.USER_SKILLS + ' as us')
      .join(TABLES.SKILLS + ' as s', 'us.skill_id', 's.id')
      .as('s');

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
  //redo following follower, ifo, seems stupid this way

  const sortCardProfile = db
    .select([
      'u.id',
      'r.rank as rank',
      db.raw('GROUP_CONCAT(ifo.user_id) as foli'),
      db.raw('IFNULL(total, 0) as following'),
      db.raw('IFNULL (MA, 0) as follower'),
      db.raw('GROUP_CONCAT(DISTINCT name) as skills')
    ])
    .from(TABLES.USERS + ' as u')
    .leftJoin(skills, 'u.id', 's.user_id')
    .leftJoin(TABLES.RANK + ' as r', 'u.id', 'r.user_id') //leftJoin to get those without rank [All users will have a rank?]
    .leftJoin(following, 'ssu.user_id', 'u.id')
    .leftJoin(follower, 'su.followed', 'u.id')
    .leftJoin(ifo, 'ifo.followed', 'u.id')
    .groupBy('u.id')
    .as('sort');

  const profile_array = [
    'p.id',
    'p.user_id',
    'p.picture',
    'p.about',
    'p.cover_picture',
    'p.description',
    'nl.name as network',
    h.format_location,
    'loc.city',
    'loc.country',
    'loc.state',
    h.fullname,
    'u.username'
  ];

  const profileStuff = location => {
    let _query = db(TABLES.PROFILES + ' as p')
      .join(TABLES.USERS + ' as u', 'p.user_id', 'u.id')
      .join(TABLES.NETWORKS_LIST + ' as nl', 'p.network_id', 'nl.id')
      .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
      .select(profile_array)
      .where('p.description', '!=', 'NULL')
      .andWhere('p.picture', '!=', 'NULL')
      .andWhere('u.fake', '=', '0');
    return _query.as('p');
  };
  const ret_array = [
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
    'location',
    'follower',
    'following',
    'skills'
  ];

  let q = db
    .select(ret_array)
    .from(sortCardProfile)
    .join(profileStuff(selector.location), 'sort.id', 'p.user_id')
    .leftJoin(exp, 'e.user_id', 'sort.id')
    .groupBy('sort.id')
    .where('sort.rank', '>', '0'); //todo remove

  addLocation('p', selector.location, q);
  if (selector.skills) {
    let selected = _.words(selector.skills)
      .map((el, i) => 'WHEN sort.skills LIKE "%' + el + '%" THEN ' + (i + 1))
      .join(' ');
    q.orderByRaw('CASE ' + selected + ' else 100  END');
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

// ------------------ Project ------------------
exports.cardProject = selector => {
  //   const project_location = db.raw(`
  //     CASE WHEN (pr.city IS NOT NULL)
  //         THEN
  //             CASE WHEN (pr.state != NULL)
  //                 THEN CONCAT(pr.city, ', ', pr.state)
  //             WHEN (pr.country IS NOT NULL)
  //                 THEN CONCAT(pr.city, ', ', pr.country)
  //                 ELSE ' '
  //             END
  //         ELSE ' '
  //     END as location
  // `);

  const pr_array = [
    'pr.id',
    'pr.title',
    'pr.description',
    'pr.picture as picture',
    'pr.status',
    'pr.public_id',
    'c.id as category_id',
    'c.name as category_name',
    'nl.name as network',
    'p.picture',
    'p.uid as user_id',
    db.raw('CONCAT (p.first_name, " ", p.last_name) as username'),
    // project_location
    h.format_location,
    'loc.city',
    'loc.country',
    'loc.state'
    /*
         'o.skill',  'o.tags',
         db.raw('GROUP_CONCAT(DISTINCT if(o.tags <> "0", o.tags, null)) as skills'),
         Debug to see if order correctly
         */
  ];

  const sub_members = db(TABLES.PROJECT_MEMBERS + ' as m')
    .select('m.project_id', 'm.user_id')
    .where('accepted', 1)
    .as('m'),
    sub_openings = db(TABLES.PROJECT_OPENINGS + ' as o')
      .select([
        db.raw('GROUP_CONCAT(ot.tag) as tags'),
        'o.status',
        'o.project_id',
        'o.skill'
      ])
      .leftJoin(TABLES.OPENING_TAGS + ' as ot', 'o.id', 'ot.opening_id')
      .groupBy('o.id')
      .as('o'),
    sub_category = db(TABLES.CATEGORIES + ' as c')
      .select('c.id', 'c.name')
      .as('c');

  const query = db
    .distinct(pr_array)
    .countDistinct('pl.id as followers')
    .countDistinct('m.user_id as members')
    .from(TABLES.PROJECTS + ' as pr')
    .join(h.sub_profile, 'p.uid', 'pr.user_id')
    .join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
    .join(TABLES.LOCATION + ' as loc', 'loc.id', 'pr.loc_id')
    .join(sub_category, 'c.id', 'pr.category_id')
    .leftJoin(TABLES.PROJECT_LIKES + ' as pl', 'pl.project_id', 'pr.id')
    .leftJoin(sub_members, 'm.project_id', 'pr.id')
    .where('pr.project_visibility', 1)
    .whereRaw('pr.picture <> ""')
    .groupBy('pr.id');

  //SELECTOR
  if (selector.uid) {
    pr_array.push(
      db.raw(
        'GROUP_CONCAT(DISTINCT IF(pl.user_id = ' +
          selector.uid +
          ', true, null))  as follow'
      )
    );
  }

  if (selector.network) {
    query.orderByRaw(
      `CASE WHEN nl.name like "%${selector.network}%" THEN 1 else 2 END`
    );
    // query.whereRaw(`p.network like "%${selector.network}%" OR pr.network like "%${selector.network}%"`)
  }
  if (selector.opening || selector.skills)
    query.leftJoin(sub_openings, 'o.project_id', 'pr.id');

  if (selector.skills) {
    let selected = _.words(selector.skills)
      .map(
        (el, i) =>
          'WHEN o.skill LIKE "%' +
          el +
          '%" OR o.tags LIKE "%' +
          el +
          '%" THEN ' +
          (i + 1)
      )
      .join(' ');
    // query.orderByRaw('CASE ' + selected + ' ELSE 100 END');
    query.whereRaw(selected);
  }
  addLocation('loc', selector.location, query);
  if (selector.opening)
    query.orderByRaw(
      'CASE WHEN  o.status = "' + selector.opening + '" THEN 1 ELSE 2 END'
    );
  if (selector.category)
    query.orderByRaw('(c.name = "' + selector.category + '") DESC');
  if (selector.status)
    query.orderByRaw(
      'CASE WHEN pr.status LIKE "%' + selector.status + '%" THEN 1 else 2 END'
    );
  return query;
};

// ------------------ Main page ------------------
/*
Instead of followers, create a table to get a project ranking
example: How many users did stuff (wether like, comment or anything)
So count all user actions on a project.
And if a user plays with loop (like, unlike),
 it won't put the project to the top
As the table never clears, and keep record of thing
[TO DO way later, first finish v2]
*/
