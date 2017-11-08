const { db, TABLES } = require('../index'),
  h = require('../helper'),
  data = require('./data'),
  _ = require('lodash');

// ------------------ Project ------------------

module.exports = selector => {
  const sub_members = db(TABLES.PROJECT_MEMBERS + ' as m')
    .select('m.project_id', 'm.user_id')
    .where('accepted', 1)
    .as('m');

  const sub_category = db(TABLES.CATEGORIES + ' as c')
    .select('c.id', 'c.name')
    .as('c');

  const sub_openings = db(TABLES.PROJECT_OPENINGS + ' as o')
    .select([
      db.raw('GROUP_CONCAT(s.name) as tags'),
      'o.status',
      'o.project_id',
      'weight'
    ])
    .leftJoin(TABLES.OPENING_TAGS + ' as ot', 'o.id', 'ot.opening_id')
    .leftJoin(h.magicSkills(selector.cats), 'ot.skill_id', 's.id')
    .groupBy('o.id')
    .as('o');

  let pr_array = [
    'pr.id',
    'pr.title',
    'pr.description',
    'pr.picture as picture',
    'pr.status',
    'pr.public_id',
    'pr.video',
    'c.id as category_id',
    'c.name as category_name',
    'nl.name as network',
    'p.picture as profile_picture',
    'p.uid as user_id',
    'o.status as openingStat',
    db.raw('CONCAT (p.first_name, " ", p.last_name) as username'),
    h.format_location
  ];

  // const getProjectOpenings = db
  //   .select(
  //     'group_concat(o.status)',
  //     'o.project_id as project_id'
  //   )
  //   .count('o.status as statNumber')
  //   .from(TABLES.PROJECT_OPENINGS + ' as o')
  //   .groupBy('o.id')
  //   .as('ol')

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
    .groupBy('pr.id')

  //SELECTOR
  if (selector.uid) {
    pr_array.push(
      db.raw(
        `GROUP_CONCAT(DISTINCT IF(pl.user_id = ${selector.uid}, true, null)) as follow`
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
    pr_array.push('weight');
    query.whereRaw('weight IS NOT NULL');
    query.orderByRaw('weight');
  }

  h.addLocation('loc', selector.location, query);

  if (selector.opening) {
    query.orderByRaw(
      'CASE WHEN  o.status = "' + selector.opening + '" THEN 1 ELSE 2 END'
    );

  }

  if (selector.category)
    query.orderByRaw('(c.name = "' + selector.category + '") DESC');

  if (selector.status)
    query.orderByRaw(
      'CASE WHEN pr.status LIKE "%' + selector.status + '%" THEN 1 else 2 END'
    );

  return query;
};
