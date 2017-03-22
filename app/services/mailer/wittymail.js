const helper = require('sendgrid').mail;


const subst = (pers, obj) => {
	let i = 0;
	for (let key in obj){
		let mod = obj[key].length;
		pers.addSubstitution(new helper.Substitution(key, obj[key][i % mod]))
		i++;
	};
}

const subject = (mail, pers, subject) => {
	mail.setSubject(subject),
	pers.setSubject(subject)
};

const send = (mail) => {
	sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

	const request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: mail.toJSON()
	});

	sg.API(request, function(error, response) {
		console.log(mail.toJSON().personalizations)
		console.log(response.statusCode);
		console.log(response.body);
		console.log(response.headers);
	});
};

 const wm = {
	 content 	: (mail) => mail.addContent(new helper.Content("text/html", '<p></p>')),
}

wm.bcc = (pers, arr) => arr.map(r => pers.addBcc(new helper.Email(r)));
wm.from = (mail, email, name) => mail.setFrom(new helper.Email(email, name));
wm.to = (pers, email, name) => pers.addTo(new helper.Email(email, name));
wm.reply = (mail, email, name) => mail.setReplyTo(new helper.Email(email, name));
wm.subject = (mail, pers, subject) => {
	mail.setSubject(subject),
	pers.setSubject(subject)
};
wm.substitutions = subst;
wm.send = send;


module.exports.wm = wm

module.exports.TEMPLATES =  {
	welcome : 'db2fc916-37b5-42dd-b7b7-99d6163fd6ff',

}

/*
WITTY ACCOUNT 
module.exports.TEMPLATES =  {
	welcome : 'f98676a1-51f8-4164-91fe-9e4178d46553',
}

*/