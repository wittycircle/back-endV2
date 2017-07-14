'use strict';

const { db, TABLES } = require('./index'),
  _ = require('lodash'),
  h = require('./helper');

exports.getNetwork = from => {
  if (from == 'university') {
    return db(TABLES.NETWORKS_LIST)
      .distinct('name as network', 'launched', 'url')
      .orderByRaw('popular DESC');
  } else if (from == 'networks') {
    return db(TABLES.NETWORKS).distinct('name as network');
  } else throw `Bad network : ${from}`;
};

exports.getNetworkInfo = (uid, from) => {
  return h.admin(TABLES.USERS, uid, uid).then(r => {
    if (!r.length) throw `Bad network : ${from}`;
    else {
      if (from == 'university')
        return db(TABLES.NETWORKS_LIST).select().orderByRaw('popular DESC');
      else if (from == 'networks') return db(TABLES.NETWORKS).select();
    }
  });
};

exports.createNetwork = (uid, from, data) => {
  return h.admin(TABLES.USERS, uid, uid).then(r => {
    if (!r.length) throw `Bad network : ${from}`;
    else {
      if (from == 'university') return db(TABLES.NETWORKS_LIST).insert(data);
      else if (from == 'networks') return db(TABLES.NETWORKS).insert(data);
    }
  });
};

exports.updateNetwork = (uid, from, id, data) => {
  return h.admin(TABLES.USERS, uid, uid).then(r => {
    if (!r.length) throw `Bad network : ${from}`;
    else {
      if (from == 'university')
        return db(TABLES.NETWORKS_LIST).update(data).where({ id: id });
      else if (from == 'networks')
        return db(TABLES.NETWORKS).update(data).where({ id: id });
    }
  });
};

exports.removeNetwork = (uid, from, id) => {
  return h.admin(TABLES.USERS, uid, uid).then(r => {
    if (!r.length) throw `Bad network : ${from}`;
    else {
      if (from == 'university')
        return db(TABLES.NETWORKS_LIST).del().where({ id: id });
      else if (from == 'profile')
        return db(TABLES.NETWORK_VERIFICATION).del().where({ id: id });
      else if (from == 'profile_incubator')
        return db(TABLES.PROFILE_INCUBATOR).del().where({ id: id });
      else if (from == 'project')
        return db(TABLES.PROJECTS).del().where({ id: id });
      else if (from == 'networks')
        return db(TABLES.NETWORKS).del().where({ id: id });
    }
  });
};

// ------------------ MAIL STUFF ------------------
exports.getFromToken = token => {
  return db(TABLES.NETWORKS).select('*').where('token', token);
};

exports.createNewNetwork = (uid, data) => {
  return h.admin(TABLES.USERS, uid, uid).then(r => {
    if (!r.length) throw 'Admins only';
    return db(TABLES.NETWORKS).insert(data);
  });
};

exports.sendVerifyNetwork = data => {
  let dataInsert = {
    token: data.token,
    user_id: data.user_id
  };
  return h.exist(TABLES.USERS, data.user_id).then(r => {
    if (!r.length) throw 'Invalid user_id';
    return db('networks_list as nl')
      .first('id')
      .whereRaw(`name like ${data.network}`)
      .then(nr => {
        dataInsert.network_id = nr.id || 1;
        return db(TABLES.NETWORK_VERIFICATION).insert(dataInsert);
      });
  });
};

exports.validateNetwork = token => {
  const nik = db(TABLES.NETWORK_VERIFICATION).first('*').where('token', token);

  return nik.then(network => {
    console.log('network', network);
    if (!network || !network.id) {
      throw 'Bad token';
    } else {
      return Promise.all([
        db(TABLES.PROFILES)
          .update('network_id', network.network_id)
          .where('user_id', network.user_id),

        db(TABLES.NETWORK_VERIFICATION)
          .update('verification', 1)
          .where('token', token)
      ]);
    }
  });
};
