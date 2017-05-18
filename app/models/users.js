const { db, TABLES } = require('./index'), h = require('./helper');

// ------------------ Main methods ------------------

exports.fromUsername = username => {
  return h.exist(TABLES.USERS, username, 'username').then(r => {
    if (!r.length) throw 'Unknown username';
    return db(TABLES.USERS).first('id').where('username', username);
  });
};

//used by passport
exports.getUserBySocialId = (id, auth) => {
  let key = `${auth}_id`;

  return db();
  return db
    .select('u.id', 'u.email')
    .from(TABLES.USERS + ' as u')
    .join(TABLES.USER_SOCIALS + ' as s', 's.user_id', 'u.id')
    .where(key, id);
};

//used by passport
exports.getUserBy = by => {
  return db.select(['id', 'password']).from(TABLES.USERS).where(by);
};

// ------------------ Skills ------------------
exports.getUserSkills = id => {
  return h.exist(TABLES.USERS, id).then(r => {
    if (!r.length) throw 'Unkown user';
    return db
      .select(['skill_id as id', 'name', 'category'])
      .from(TABLES.SKILLS + ' as s')
      .join(TABLES.USER_SKILLS + ' as us', 'us.skill_id', 's.id')
      .where({ user_id: id })
      .groupBy('us.skill_id');
  });
};

exports.addUserSkill = (id, uid) => {
  return Promise.all([
    h.exist(TABLES.SKILLS, id),
    h.exist(TABLES.USERS, uid)
  ]).then(([r1, r2]) => {
    if (!r1.length || !r2.length) {
      throw !r1.length ? 'Invalid skill id' : 'Invalid user id';
    } else {
      return db(TABLES.USER_SKILLS)
        .select('id')
        .where({ user_id: uid, skill_id: id })
        .then(r => {
          if (!r.length) {
            return db(TABLES.USER_SKILLS)
              .insert({ user_id: uid, skill_id: id })
              .then(() => exports.getUserSkills(uid));
          } else {
            return exports.getUserSkills(uid);
          }
        });
    }
  });
};

exports.removeUserSkill = (id, uid) => {
  return Promise.all([
    h.exist(TABLES.SKILLS, id),
    h.exist(TABLES.USERS, uid)
  ]).then(([r1, r2]) => {
    if (!r1.length || !r2.length) {
      return !r1.length ? 'Invalid skill id' : 'Invalid user id';
    } else {
      return db(TABLES.USER_SKILLS).del().where({ user_id: uid, skill_id: id });
    }
  });
};

// ------------------ Projects ------------------

exports.getProjectsInvolved = uid => {
  let table_id;
  let selection = [
    'pr.id',
    'pr.public_id',
    'pr.picture',
    'c.name as category',
    'pr.title',
    'pr.status',
    'pr.description',
    'pr.public_id',
    h.format_location,
    'p.fullName as creator_name',
    'p.profile_picture as creator_picture'
  ];

  let real_members = db
    .select('*')
    .from(TABLES.PROJECT_MEMBERS)
    .where('accepted', 1)
    .as('m');

  return db
    .distinct('pr.id')
    .from(TABLES.PROJECTS + ' as pr')
    .where('pr.user_id', uid)
    .union(function() {
      this.distinct('m.project_id as id')
        .from(TABLES.PROJECT_MEMBERS + ' as m')
        .where('m.user_id', uid)
        .where('m.accepted', 1);
    })
    .then(ids => {
      table_id = ids.map(e => e.id);
      return db
        .distinct(selection)
        .count('m.id as members')
        .from(TABLES.PROJECTS + ' as pr')
        .join(TABLES.LOCATION + ' as loc', 'pr.loc_id', 'loc.id')
        .join(TABLES.CATEGORIES + ' as c', 'pr.category_id', 'c.id')
        .leftJoin(real_members, 'm.project_id', 'pr.id')
        .join(h.sub_profile, 'pr.user_id', 'p.uid')
        .whereIn('pr.id', table_id)
        .groupBy('pr.id');
    });
};

exports.getProjectFollow = uid => {
  return (
    db
      // .count('pl.id as count')
      .distinct(['pr.title', 'pr.public_id', h.format_location])
      .from(TABLES.PROJECT_LIKES + ' as pl')
      .join(TABLES.PROJECTS + ' as pr', 'pl.project_id', 'pr.id')
      .join(TABLES.LOCATION + ' as loc', 'loc.id', 'pr.loc_id')
      .where('pl.user_id', uid)
  );
};

// ------------------ INTERESTS ------------------

getInterest = exports.getInterests = uid => {
  return db
    .distinct('i.name', 'i.priority')
    .from(TABLES.USER_INTERESTS + ' as ui')
    .join(TABLES.INTERESTS + ' as i', 'i.id', 'ui.interest_id')
    .join(TABLES.USERS + ' as u', 'u.id', 'ui.user_id')
    .where('u.id', uid);
};

exports.addInterest = (uid, data) => {
  return db
    .select('id')
    .from(TABLES.INTERESTS)
    .where('name', data)
    .then(iid => {
      if (!iid.length) throw 'Interest does not exist';
      return db(TABLES.USER_INTERESTS).insert({
        user_id: uid,
        interest_id: iid[0].id
      });
    })
    .then(() => getInterests(uid));
};

exports.removeInterest = (uid, data) => {
  return db
    .select('id')
    .from(TABLES.INTERESTS)
    .where('name', data)
    .then(iid => {
      if (!iid.length) throw 'Interest does not exist';
      return db(TABLES.USER_INTERESTS)
        .del()
        .where({ user_id: uid, interest_id: iid[0].id });
    })
    .then(() => getInterests(uid));
};

// ------------------ EXPERIENCES ------------------
exports.getExperiences = uid => {
  let sort = `CASE WHEN date_to like "Present" THEN 1 ELSE 2 END`;
  return db
    .select('e.*', h.format_location)
    .from(TABLES.USER_EXPERIENCES + ' as e')
    .join(TABLES.LOCATION + ' as loc', 'e.loc_id', 'loc.id')
    .join(TABLES.USERS + ' as u', 'u.id', 'e.user_id')
    .where('u.id', uid)
    .orderByRaw(sort + ' , date_to, date_from ASC');
};

exports.addExperience = (uid, data) => {
  let user_data = {
    user_id: uid,
    title: data.title,
    company: data.company,
    date_from: data.date_from,
    date_to: data.date_to,
    description: data.description
  };
  return h
    .getLocationId({
      city: data.city,
      state: data.state,
      country: data.country
    })
    .then(r => {
      user_data.loc_id = r.id || 1;
      return db(TABLES.USER_EXPERIENCES).insert(user_data);
    });
};

exports.removeExperience = (uid, data) => {
  return db(TABLES.USER_EXPERIENCES).del().where({ user_id: uid, id: data });
};

exports.updateExperience = (uid, data) => {
  eid = data.id;
  return Promise.all([
    h.exist(TABLES.USERS, uid),
    h.exist(TABLES.USER_EXPERIENCES, eid)
  ]).then(([r, r2]) => {
    if (!r.length || !r2.length) {
      throw 'Ressource does not exist';
    }
    let user_data = {
      user_id: uid,
      title: data.title,
      company: data.company,
      date_from: data.date_from,
      date_to: data.date_to,
      description: data.description
    };
    return h
      .getLocationId({
        city: data.city,
        state: data.state,
        country: data.country
      })
      .then(r => {
        user_data.loc_id = r.id || 1;
        return db(TABLES.USER_EXPERIENCES).update(user_data).where('id', eid);
      });
  });
};

// ------------------ SHARE INVITE LINK ------------------

exports.getUserInvite = id => {
  return db(TABLES.USERS).first('invite_link').where('id', id);
};
