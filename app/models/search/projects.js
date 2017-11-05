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
      'o.project_id',
      'status',
      'weight'
    ])
    .leftJoin(TABLES.OPENING_TAGS + ' as ot', 'o.id', 'ot.opening_id')
    .leftJoin(h.magicSkills(selector.cats), 'ot.skill_id', 's.id')
    .groupBy('o.id')
    .as('o');

  let pr_array = [
    'pr.id',
    'pr.creation_date',
    'pr.title',
    'pr.description',
    'pr.picture as picture',
    'pr.status',
    'pr.public_id',
    'c.id as category_id',
    'c.name as category_name',
    'nl.name as network',
    'p.picture as profile_picture',
    'p.uid as user_id',
    'openingStat',
    db.raw('CONCAT (p.first_name, " ", p.last_name) as username'),
    h.format_location
  ];

  const opening_counts = db
    .select('project_id')
    .count('status as openingStat')
    .from('openings')
    .groupBy('project_id')
    .as('opc');

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
    .leftJoin(opening_counts, 'opc.project_id', 'pr.id')
    .where('pr.project_visibility', 1)
    .whereRaw('pr.picture <> ""')
    .groupBy('pr.id', 'nl.id', 'p.id');

  // ******** ********  TRING  ******** ********
  if (selector.skills || selector.opening) {
    query.leftJoin(sub_openings, 'o.project_id', 'pr.id');
  }
  let associated = {
    uid: () =>
      pr_array.push(
        db.raw(
          `GROUP_CONCAT(DISTINCT IF(pl.user_id = ${selector.uid}, true, null)) as follow`
        )
      ),
    network: () =>
      query.orderByRaw(
        `CASE WHEN nl.name like "%${selector.network}%" THEN 1 else 2 END`
      ),
    skills: () => {
      pr_array.push('weight');
      query.whereRaw('weight IS NOT NULL');
      query.orderByRaw('weight');
    },
    location: () => h.addLocation('loc', selector.location, query),
    opening: () => {
      query.orderByRaw(
        'CASE WHEN  o.status = "' + selector.opening + '" THEN 1 ELSE 2 END'
      );
    },
    category: () =>
      query.orderByRaw('(c.name = "' + selector.category + '") DESC'),
    status: () =>
      query.orderByRaw(
        'CASE WHEN pr.status LIKE "%' + selector.status + '%" THEN 1 else 2 END'
      )
  };

  let mh = Object.keys(associated);
  if (selector.priority) {
    mh = mh.filter(e => e !== selector.priority);
    mh.unshift(selector.priority);
  }
  mh.forEach(e => {
    if (e in selector) {
      associated[e]();
    }
  });

  return query;
};
