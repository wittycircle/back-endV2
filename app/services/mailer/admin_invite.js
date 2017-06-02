const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

const send_mail = (email, sender, token) => {
  let mail = new helper.Mail();
  wm.from(mail, 'quentin@wittycircle.com', 'Quentin Verriere');
  wm.content(mail);
  wm.reply(mail, 'quentin@wittycircle.com');
  mail.setTemplateId(TEMPLATES.invite_user);

  // data.forEach((e, i) => {
  let pers = new helper.Personalization();
  let subject = sender.fullName + ' invited you to join Wittycircle';
  let sub = {
    '*|FNAME|*': sender.first_name,
    '*|FLNAME|*': sender.last_name,
    '*|PIMG|*': sender.profile_picture,
    '*|FUNAME|*': sender.fullName,
    '*|FLOC|*': wm.location(sender),
    '*|URL|*': wm.url(`/invite/projects/${token}`),
    MAIL: email
  };
  console.log(sub);
  console.log('\n-------------------------------------------------\n');
  wm.subject(pers, subject);
  wm.to(pers, e);
  wm.substitutions(pers, sub);
  mail.addPersonalization(pers);
  // });
  wm.send(mail);
  return null;
};
// args{ mail: [], invite_link}
const admin_invite = args => {
  let request = h.spe_profile({ 'u.id': 1 });

  return request.then(x => send_mail(args.email, x, args.token));
}; //exports

module.exports = admin_invite;
