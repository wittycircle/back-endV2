const { db, TABLES } = require('../index'),
  h = require('../helper');

module.exports.getSkillIdFromNames = names =>
  db(TABLES.SKILLS)
    .distinct('id')
    .whereIn('name', names)
    .map(e => e.id);

module.exports.expandedSkillsInfos = skills => {
  return db
    .distinct([
      's.id as id',
      's.name',
      'sc.sub_id',
      'c.name',
      db.raw(`IF(s.priority IS NOT NULL, s.priority, 1000) as priority`)
    ])
    .from(TABLES.SKILL_CAT + ' as sc')
    .join(TABLES.SKILL_CAT + ' as cs', 'cs.sub_id', 'sc.sub_id')
    .join(TABLES.SUB_SKILLS + ' as c', 'c.id', 'sc.sub_id')
    .join(TABLES.SKILLS + ' as s', function() {
      this.on('s.id', 'sc.skill_id').orOn('s.id', 'cs.skill_id');
    })
    .whereIn('sc.skill_id', skills)
    .orderByRaw('sc.id, priority');
};

module.exports.expandedSkills = skills => {
  return db
    .distinct([
      's.id as id',
      's.name',
      'sc.sub_id',
      db.raw(`IF(s.priority IS NOT NULL, s.priority, 1000) as priority`)
    ])
    .from(TABLES.SKILL_CAT + ' as sc')
    .join(TABLES.SKILL_CAT + ' as cs', 'cs.sub_id', 'sc.sub_id')
    .join(TABLES.SKILLS + ' as s', function() {
      this.on('s.id', 'sc.skill_id').orOn('s.id', 'cs.skill_id');
    })
    .whereIn('sc.skill_id', skills)
    .orderByRaw('sc.id, priority')
    .map(e => e.id);
};

module.exports.skillsFromProjectId = id => {
  let query = db
    .first([
      'p.id as projectId',
      db.raw('GROUP_CONCAT(DISTINCT o.status) as openingStatus'),
      db.raw('GROUP_CONCAT(DISTINCT s.id) as skillId'),
      db.raw('GROUP_CONCAT(DISTINCT sc.sub_id) as catId')
    ])
    .from(TABLES.PROJECTS + ' as p')
    .join(TABLES.PROJECT_OPENINGS + ' as o', 'o.project_id', 'p.id')
    .join(TABLES.OPENING_TAGS + ' as ot', 'ot.opening_id', 'o.id')
    .join(TABLES.SKILLS + ' as s', 's.id', 'ot.skill_id')
    .join(TABLES.SKILL_CAT + ' as sc', 'sc.skill_id', 's.id')
    .groupBy('p.id')
    .where('p.id', id);

  return query.then(r => {
    if (!r) {
      throw 'Project does not have any associated skills';
    } else {
      return r;
    }
  });
};

module.exports.locationFromProjectId = id => {
  let query = db
    .select('p.user_id as puid', 'l.city', 'l.state', 'l.country')
    .from(TABLES.PROJECTS + ' as p')
    .join(TABLES.LOCATION + ' as l', 'l.id', 'p.loc_id')
    .where('p.id', id);

  return query.then(r => {
    if (!r) {
      throw 'Project does not have any associated location';
    } else {
      return r;
    }
  });
};

module.exports.skillsFromUserId = userId => {
  return db(TABLES.USER_SKILLS)
    .distinct('skill_id')
    .where('user_id', userId)
    .map(e => e.skill_id);
};
