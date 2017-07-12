const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const invitation = require('../../models/invitation');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');
/*
args{
	uid: 2,
	mailList: ['sequoya@wittycircle.com', 'baumraphael@gmail.com']
}
*/

const send_mail = (data, sender, project, token) => {
  let mail = new helper.Mail();
  wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
  wm.content(mail);
  wm.reply(mail, 'noreply@wittycircle.com');
  mail.setTemplateId(TEMPLATES.invite_team);
  const category = new helper.Category('invite_team');
  mail.addCategory(category);

  data.forEach((e, i) => {
    let pers = new helper.Personalization();
    let subject = `${sender.fullName} invited you to join ${project.title} on Wittycircle`;
    let sub = {
      '*|PIMG|*': wm.transform(sender.picture),
      '*|FUNAME|*': sender.fullName,
      '*|PTITLE|*': project.title,
      '*|FLOC|*': wm.location(sender),
      '*|PURL|*': wm.url(`projects/invite/${token}}`),
      MAIL: e
    };
    console.log(sub);
    console.log('\n-------------------------------------------------\n');
    wm.subject(pers, subject);
    wm.to(pers, e);
    wm.substitutions(pers, sub);
    mail.addPersonalization(pers);
  });
  wm.send(mail, 'invite_team');
  return null;
};

const invite_team = args => {
  let project = db(TABLES.PROJECTS + ' as pr')
    .first('title', 'public_id', 'id')
    .join(TABLES.USERS + ' as u', 'u.id', 'pr.user_id')
    .where({ 'u.id': args.uid });

  let sender = h.spe_profile({ 'u.id': args.uid });

  invitation.verifyInvite(args.mailList).then(verifiedEmails => {
    let x = [];
    verifiedEmails.map(e => x.push({ user_id: args.uid, invite_email: e }));

    let table_invite = db.batchInsert('invitation', x);

    return Promise.all([table_invite, sender, project])
      .then(([x, sender, project]) =>
        send_mail(verifiedEmails, sender[0], project, args.token)
      )
      .catch(console.error);
  });
}; //exports

module.exports = invite_team;
