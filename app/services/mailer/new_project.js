const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

const send_mail = (sender, public_id) => {
  let mail = new helper.Mail();
  wm.from(mail, 'quentin@wittycircle.com', 'Quentin Verriere');
  wm.content(mail);
  wm.reply(mail, 'quentin@wittycircle.com');
  mail.setTemplateId(TEMPLATES.new_project);

  sender.forEach((e, i) => {
    let pers = new helper.Personalization();
    let subject = 'Your project on Wittycircle';
    let sub = {
      '*|FNAME|*': e.first_name,
      '*|BASICS|*': wm.url(`project/${public_id}/update/basics`),
      '*|STORY|*': wm.url(`project/${public_id}/update/story`),
      '*|NEEDS|*': wm.url('meet'),
      MAIL: e.email
    };
    // console.log(sub)
    // console.log("\n-------------------------------------------------\n")
    wm.subject(pers, subject);
    wm.to(pers, e.email);
    wm.substitutions(pers, sub);
    mail.addPersonalization(pers);
  });
  wm.send(mail, 'new_project');
  return null;
};

const new_project = args => {
  let sender = h.spe_profile({ 'u.id': args.uid }).select('u.email');

  return sender.then(e => send_mail(e, args.public_id));
}; //exports

module.exports = new_project;
