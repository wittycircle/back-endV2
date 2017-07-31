const { db, TABLES } = require('./index'),
  _ = require('lodash'),
  h = require('./helper');

// -------- Skills related methods --------
const getSkillIdFromNames = (module.exports.getSkillIdFromNames = names =>
  db(TABLES.SKILLS).distinct('id').whereIn('name', names).map(e => e.id));

const expandedSkillsInfos = (module.exports.expandedSkillsInfos = skills => {
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
});

const expandedSkills = (module.exports.expandedSkills = skills => {
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
});

// -------- Suggested --------
const alreadySuggestedProfiles = (module.exports.alreadySuggestedProfiles = projectId => {
  return db(TABLES.SUG_PROFILES)
    .select('user_id')
    .where('project_id', projectId)
    .map(e => e.user_id);
});

const alreadySuggestedProjects = (module.exports.alreadySuggestedProjects = userId => {
  return db(TABLES.SUG_PROJECTS)
    .select('project_id')
    .where('user_id', userId)
    .map(e => e.project_id);
});

// -------- Add suggestion --------

const suggestProfiles = (module.exports.suggestProfiles = (
  projectId,
  profiles
) => {
  let o = profiles.map(e => ({ user_id: e, project_id: projectId }));
  return db(TABLES.SUG_PROFILES).insert(o);
});

const suggestProjects = (module.exports.suggestProjects = (userId, projects) => {
  let o = projects.map(e => ({ project_id: e, user_id: userId }));
  return db(TABLES.SUG_PROJECTS).insert(o);
});

//-------- Helpers --------
const skillsFromProjectId = (module.exports.skillsFromProjectId = id => {
  let query = db
    .first([
      'p.id as projectId',
      db.raw('GROUP_CONCAT(DISTINCT s.id) as skillId'),
      db.raw('GROUP_CONCAT(DISTINCT catId) as catId')
    ])
    .from(TABLES.PROJECTS + ' as p')
    .join(TABLES.PROJECT_OPENINGS + ' as o', 'o.project_id', 'p.id')
    .join(TABLES.OPENING_TAGS + ' as ot', 'ot.opening_id', 'o.id')
    .join(h.suggestSkills, 's.id', 'ot.skill_id')
    .groupBy('p.id')
    .where('p.id', id);

  return query; //.then(r => r.skillId.split(','));
});

const getMatchingProfiles = (module.exports.getMatchingProfiles = (
  neededSkills,
  alreadySugested
) => {
  let query = db
    .from(h.spe_profile({}))
    .join(TABLES.USER_SKILLS + ' as us', 'us.skill_id', 'p.uid')
    .whereIn('skill_id', neededSkills)
    .whereNotIn('p.user_id', alreadySugested);

  return query;
});

//  -------- Main methods [routes] --------
module.exports.matchProfilesToProject = projectId => {
  return Promise.all([
    skillsFromProjectId(projectId),
    alreadySuggestedProfiles(projectId)
  ]).then(r => {
    let neededSkills = r[0].skillId.split(',');
    let alreadySugested = r[1];
    return getMatchingProfiles(neededSkills, alreadySugested).then(r => {
      if (!r.length) {
        return expandedSkills(neededSkills).then(expanded => {
          neededSkills = expanded.map(e => e.id);
          return getMatchingProfiles(neededSkills, alreadySugested);
        });
      } else {
        return r;
      }
    });
  });
};

module.exports.matchProjectsToProfile = userId => {
  return;
};
