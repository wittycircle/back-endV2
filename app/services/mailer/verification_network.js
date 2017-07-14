const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

// const args = {
// 	user_id: 5288,
// 	token : `74ea17da2cb1cb0fa19f3415d6f1e93b1d5d137a649cec6282a8e52680e527c01a079d14737f522`,
// 	// token : require('crypto').randomBytes(40).toString('hex'), //Unsure ?
// 	network: "42",
// 	email: "sequoya@wittycircle.com"
// };

const send_mail = (data, name) => {
  let mail = new helper.Mail();
  wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
  wm.content(mail);
  wm.reply(mail, 'noreply@wittycircle.com');
  mail.setTemplateId(TEMPLATES.verification_network);
  const category = new helper.Category('verification_network');
  mail.addCategory(category);

  let pers = new helper.Personalization();
  let subject = `Please confirm you're part of the ${data.network} network`;
  let sub = {
    '*|FFNAME|*': name,
    '*|NETWORK|*': data.network,
    '*|LINK|*': wm.url(`validation/network/${data.token}`)
  };
  console.log(sub);
  console.log('\n-------------------------------------------------\n');
  wm.subject(pers, subject);
  wm.to(pers, data.email);
  wm.substitutions(pers, sub);
  mail.addPersonalization(pers);
  wm.send(mail, 'verification_network');
  return null;
};

const verification_network = args => {
  const request = h.spe_profile({ 'u.id': args.user_id });

  return request.then(r => send_mail(args, r[0].first_name));
}; //exports

module.exports = verification_network;
