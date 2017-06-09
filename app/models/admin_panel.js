const { db, TABLES } = require('./index'),
  _ = require('lodash'),
  h = require('./helper');

exports.projectsInvite = uid => {
  return h.admin(TABLES.USERS, uid, uid).then(r => {
    if (!r.length) return 'Admin only';
    let sent = db.raw('IF (pi.accepted IS NOT NULL, true, false) as sent');
    return db(TABLES.PROJECTS + ' as p')
      .select([
        'p.id',
        'user_id',
        'title',
        h.format_location,
        'picture',
        'description',
        'picture',
        'public_id',
        sent
      ])
      .leftJoin(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
      .leftJoin(TABLES.PROJECT_INVITE + ' as pi', 'pi.project_id', 'p.id')
      .whereIn('user_id', [1, 9])
      .whereRaw('title <> "wittycircle"');
  });
};

exports.inviteProjects = (uid, project_id, token) => {
  return h.admin(TABLES.PROJECTS, project_id, uid).then(([r, r1]) => {
    if (!r.length || !r1.length)
      throw !r.length ? 'Bad project id' : 'Not an admin';
    return db(TABLES.PROJECT_INVITE).insert({ project_id, token }).catch(err => {
      throw 'Duplicate : Already exist';
    });
  });
};

exports.updateCreator = (uid, token) => {
  return db(TABLES.PROJECT_INVITE)
    .first('project_id')
    .where('token', token)
    .then(r => {
      if (!r) return 'Invalid token';
      console.log(r);
      return Promise.all([
        db(TABLES.PROJECTS).update('user_id', uid).where('id', r.project_id),
        db(TABLES.PROJECT_INVITE).update('accepted', 1).where('token', token)
      ]);
    });
};
