const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

// const args = {
// 	emails: ['sequoya@wittycircle.com', 'raphael@wittycircle.com'],
// 	id: 4133, /*sender_id*/
// };

const send_mail = (s, u, data) => {
  let mail = new helper.Mail();
  wm.from(mail, 'noreply@wittycircle.com', `${s.fullName} via Wittycircle`);
  wm.content(mail);
  wm.reply(mail, 'noreply@wittycircle.com');
  mail.setTemplateId(TEMPLATES.uc_invitation);

  data.forEach((e, i) => {
    let pers = new helper.Personalization();
    let subject = 'Wittycircle is now open to the ' + u.url + ' community';
    let sub = {
      '*|MESSAGE|*': u.message,
      '*|FNAME|*': s.first_name,
      '*|PIMG|*': wm.transform(s.picture),
      '*|FUNAME|*': s.fullName,
      '*|FDESC|*': s.description,
      '*|URL|*': wm.url(`welcome/${u.url}/${u.token}`),
      '*|FNETWORK|*': u.url
    };
    console.log(sub);
    console.log('\n-------------------------------------------------\n');
    wm.subject(pers, subject);
    wm.to(pers, e);
    wm.substitutions(pers, sub);
    mail.addPersonalization(pers);
  }); //foreach
  wm.send(mail, 'uc_invitation');
  return null;
};

const uc_invitation = args => {
  const sender = h.spe_profile({ 'u.id': args.id }).select('u.email');

  const university = db('partnerships_invite as iu')
    .first('message', 'token', 'url')
    .join(TABLES.NETWORKS + ' as n', 'n.id', 'iu.partnership_id')
    .where('sender', args.id);

  return Promise.all([sender, university]).then(([sender, university]) =>
    send_mail(sender[0], university, args.emails)
  );
}; //exports

module.exports = uc_invitation;
