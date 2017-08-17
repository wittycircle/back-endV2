const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

/*
args: {
	email: string
}
*/

const send_mail = (email, data, token) => {
  let mail = new helper.Mail();
  let sub;
  wm.from(mail, 'quentin@wittycircle.com', 'Quentin Verriere');
  wm.content(mail);
  wm.reply(mail, 'quentin@wittycircle.com');
  if (token === 'social') {
    sub = {
      '*|FNAME|*': data
    };
    mail.setTemplateId(TEMPLATES.welcomeGmail);
  } else {
    sub = {
      '*|FNAME|*': data,
      '*|LINK|*': wm.url(`/validation/account/${token}`)
    };
    mail.setTemplateId(TEMPLATES.welcome);
  }
  const category = new helper.Category('welcome');
  mail.addCategory(category);
  let pers = new helper.Personalization();
  let subject = 'Welcome to Wittycircle';
  // console.log(sub)
  // console.log("\n-------------------------------------------------\n")
  wm.subject(pers, subject);
  wm.to(pers, email);
  wm.substitutions(pers, sub);
  mail.addPersonalization(pers);
  wm.send(mail, 'welcome');
  return null;
};

const welcome = args => {
	const request = db
		.first('p.first_name as username')
		.from(TABLES.USERS + ' as u')
		.join(TABLES.PROFILES + ' as p', 'u.id', 'p.user_id')
		.where('u.email', args.email);

  return request.then(username =>
    send_mail(args.email, username.username, args.token)
  );
}; //exports

module.exports = welcome;
