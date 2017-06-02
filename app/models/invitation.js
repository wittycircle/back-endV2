const { db, TABLES } = require('./index'),
  _ = require('lodash'),
  h = require('./helper');

exports.getInvitation = id => {
  return h.spe_profile({ invite_link: id });
};

exports.addInvitation = (uid, mail) => {
  return h.exist(TABLES.USERS, uid).then(r => {
    if (!r.length) {
      return 'Unknown user';
    }
    let x = mail.map(e => {
      return { user_id: uid, mail_to: e };
    });
    return db.batchInsert(TABLES.INVITATION, x);
  });
};

exports.fromUser = (id, email) => {
  return db(TABLES.USERS).select('id').where('invite_link', id).then(r => {
    if (!r.length) return 'Unknown invite';
    return db(TABLES.INVITATION).insert({
      user_id: r[0].user_id,
      status: 'registed',
      mail_to: email
    });
  });
};
