/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const { db, TABLES } = require('./index'),
  _ = require('lodash'),
  h = require('./helper');

exports.getProfiles = () => h.loc_profile;

exports.getProfileBy = by => {
  const ifo = db
    .distinct('followed', 'user_id')
    .from(TABLES.USER_FOLLOWERS)
    .as('ifo');

  let query = db(h.spe_profile(by))
    .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
    .leftJoin(TABLES.RANK + ' as r', 'r.user_id', 'p.uid')
    .leftJoin(ifo, 'ifo.followed', 'p.uid')
    .first(
      'rank',
      'p.*',
      db.raw('GROUP_CONCAT(ifo.user_id) as foli'),
      h.format_location
    );

  return h.exist(TABLES.PROFILES, by['p.id']).then(r => {
    if (!r.length) throw 'Bad id';
    else return query;
  });
};

exports.updateProfile = (stuff, cnd) => {
  return db(TABLES.PROFILES).update(stuff).where(cnd);
};

// ------------------ Follow ------------------
exports.getProfileFollowers = (cond, cond2, p_id) => {
  return h.exist(TABLES.PROFILES, p_id).then(r => {
    if (!r.length) throw 'Bad profile id';
    else {
      return db
        .distinct(h.p_array)
        .distinct('p.username', 'p.fullName')
        .from(TABLES.USER_FOLLOWERS + ' as l')
        .join(h.sub_profile, 'p.uid', cond2)
        .where(cond, p_id);
    }
  });
};

exports.followProfile = (id, uid) => {
  let obj = { user_id: uid, followed: id };

  return h.exist(TABLES.USERS, id).then(r => {
    if (!r.length) throw 'Person to follow';
    return db(TABLES.USER_FOLLOWERS).first('id').where(obj).then(r => {
      if (!r) return db(TABLES.USER_FOLLOWERS).insert(obj);
      else return db(TABLES.USER_FOLLOWERS).del().where(obj);
    });
  });
};

// ------------------ Location ------------------
exports.getLocation = p_id => {
  return db(TABLES.PROFILES + ' as p')
    .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
    .select(['country', 'city', 'state', h.format_location])
    .where('p.id', p_id);
};

exports.updateLocation = (data, id) => {
  return db(TABLES.LOCATION + ' as loc').first('id').where(data).then(r => {
    return db(TABLES.PROFILES).update({ loc_id: r });
  });
};
