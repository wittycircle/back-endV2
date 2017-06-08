const { db, TABLES } = require('./index'),
  _ = require('lodash'),
  h = require('./helper');

exports.getInvitation = id => {
  return h.spe_profile({ invite_link: id });
};

const verifyInvite = (exports.verifyInvite = mails => {
  return db(TABLES.INVITATION)
    .distinct('mail_to')
    .whereIn('mail_to', mails)
    .then(badMails => {
      badMails = badMails.map(e => e.mail_to);
      return _.difference(mails, badMails);
    });
});

exports.addInvitation = (uid, mails) => {
  return h.exist(TABLES.USERS, uid).then(r => {
    if (!r.length) throw 'Unknown user';
    return verifyInvite(mails).then(verifiedEmails => {
      if (!verifiedEmails.length) throw 'All emails already invited';
      let x = verifiedEmails.map(e => {
        return { user_id: uid, mail_to: e };
      });
      return db.batchInsert(TABLES.INVITATION, x);
    });
  });
};

exports.fromUser = (id, mails) => {
  return db(TABLES.USERS).select('id').where('invite_link', id).then(r => {
    if (!r.length) throw 'Unknown invite';
    return verifyInvite([mails]).then(verifiedEmails => {
      if (!verifiedEmails.length) throw 'Already invited';
      return db(TABLES.INVITATION).insert({
        user_id: r[0].user_id,
        status: 'registed',
        mail_to: verifiedEmails[0]
      });
    });
  });
};
