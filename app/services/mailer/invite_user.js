const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const invitation = require('../../models/invitation');
const _ = require('lodash');

const send_mail = (data, sender, invite, category = false) => {
  console.log('SEND MAIL CALLED');
  let mail = new helper.Mail();
  wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
  wm.content(mail);
  wm.reply(mail, 'noreply@wittycircle.com');
  mail.setTemplateId(TEMPLATES.invite_user);

  if (category) mail.addCategory({ category });
  else {
    const otherCategory = new helper.Category('invite_user');
    mail.addCategory(otherCategory);
  }

  data.forEach((e, i) => {
    console.log('IN DATA FOREACH');
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
    console.log('PERS', pers);
    wm.substitutions(pers, sub);
    mail.addPersonalization(pers);
  });
  wm.send(mail, 'invite_user');
  return null;
};
// args{ mail: [], invite_id}
const invite_user = args => {
  let request = db
    .distinct(
      h.p_uarray.concat([
        h.format_location,
        db.raw('CONCAT(loc.city, ", ", loc.country) as location')
      ])
    )
    .from(TABLES.PROFILES + ' as p')
    .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
    .join(TABLES.USERS + ' as u', 'u.id', 'p.user_id');

  let invite = db(TABLES.USERS).first('invite_link').where('id', args.uid);

  invitation.verifyInvite(args.mailList).then(verifiedEmails => {
    if (!verifiedEmails || !verifiedEmails.length) {
      console.log('All already invited, [verified emails is empty]');
      return null;
    }
    let x = [];
    verifiedEmails.map(e => x.push({ user_id: args.uid, mail_to: e }));

    let table_invite = db.batchInsert('invitations', x);

    return Promise.all([
      table_invite,
      request,
      invite
    ]).then(([x, sender, invite]) =>
      send_mail(verifiedEmails, sender[0], invite.invite_link, args.category)
    );
  });
}; //exports

module.exports = invite_user;
