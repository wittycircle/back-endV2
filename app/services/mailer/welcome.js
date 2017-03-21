const helper = require('sendgrid').mail;

// args.receiver
// args.fname
module.exports = request;


const bail = (args) => {
	const from_email = new helper.Email('no-reply@wittycircle.com');
	const to_email = new helper.Email(args.receiver);
	const subject = 'FROMCODE: Bonjour -FNAME- ✌️🏻';
	const content = new helper.Content('text/html', '<p></p>');
	const mail = new helper.Mail(from_email, subject, to_email, content);
	mail.personalizations[0].addSubstitution(
	  new helper.Substitution('-FNAME-', args.fname));
	mail.setTemplateId('f98676a1-51f8-4164-91fe-9e4178d46553');

	const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

	const request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: mail.toJSON(),
	});

	return request;	
} 