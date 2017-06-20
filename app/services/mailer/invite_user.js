const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const invitation = require('../../models/invitation');
const _ = require('lodash');

const send_mail = (data, sender, invite, category = false) => {
  let mail = new helper.Mail();
  wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
  wm.content(mail);
  wm.reply(mail, 'noreply@wittycircle.com');
  mail.setTemplateId(TEMPLATES.invite_user);

  if (category) mail.addCategory({ category });

  data.forEach((e, i) => {
    let pers = new helper.Personalization();
    let subject = sender.fullName + ' invited you to join Wittycircle';
    let sub = {
      '*|FNAME|*': sender.first_name,
      '*|FLNAME|*': sender.last_name,
      '*|PIMG|*': wm.transform(sender.picture),
      '*|FUNAME|*': sender.fullName,
      '*|FLOC|*': wm.location(sender),
      '*|URL|*': wm.url(`/invite/${invite}`),
      MAIL: e
    };
    wm.subject(pers, subject);
    wm.to(pers, e);
    wm.substitutions(pers, sub);
    mail.addPersonalization(pers);
  });
  wm.send(mail, 'invite_user');
  return null;
};
// args{ mail: [], invite_id}
const invite_user = args => {
  let request = h.spe_profile({ 'u.id': args.uid });

  let invite = db(TABLES.USERS).first('invite_link').where('id', args.uid);

  invitation.verifyInvite(args.mailList).then(verifiedEmails => {
    let x = [];
    verifiedEmails.map(e => x.push({ user_id: args.uid, invite_email: e }));

    let table_invite = db.batchInsert('invitations', x);

    return Promise.all([
      table_invite,
      request,
      invite
    ]).then(([x, sender, invite]) =>
      send_mail(verifiedEmails, sender[0], invite.invite_id, args.category)
    );
  });
}; //exports

module.exports = invite_user;
