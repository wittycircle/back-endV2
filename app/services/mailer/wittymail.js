const helper = require('sendgrid').mail;
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

const subst = (pers, obj) => {
	for (let key in obj){
		let mod = obj[key].length;
		for(let i = 0; i < mod; i++){
			pers.addSubstitution(new helper.Substitution(key, obj[key]))
		}
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
wm.subject = (pers, subject) => {
	pers.setSubject(subject)
};
wm.substitutions = subst;
wm.send = send;
wm.truncate = (x) =>  _.truncate(x, {length: 76, separator: ' '});
wm.location = (e) => e.city + ', ' + (e.country ? e.country : e.state ? e.state : '');
wm.url = (spec) => 'https://www.wittycircle.com/' + spec;

// ------------------ db stuff ------------------
wm.notif = (type) => db.select('user_id').from(TABLES.NOTIF_PERM + ' as n')
					.where('notif_type', type)
					.andWhere('permission', 1)
					.as('n')
/*
| profile_view   |
| user_follow    |
| follow_project |
| feedback       |
| ask_project    |
| reply_project  |
| new_message	 |
*/
module.exports.wm = wm

module.exports.TEMPLATES =  {
	ask_project: 'b2482793-bfe8-4b3a-afc8-1ef959694a0e',
	upvote_project: '7ea33ecc-88b5-4385-a864-2d63b2dadfb2',
	invite_user: '1e2364c3-e76f-41ef-b323-0cd46cacac51', 
	invite_team: '7e5e775c-e82b-47b6-b0a9-0e694f29febe',
	new_message: 'ac643d11-9669-489f-9f5f-19516b281ac3',
	new_project: '54151d8f-5dec-48a2-9f03-bde04fba72c3',
	reply_project: '8abd1eb3-5e4e-4b99-85d4-2d5c858dd716',
	reset_password: 'a3d60d87-f258-4271-b9df-0ebe56aedea9',
	// suggestion_profile: 'f1adc8ff-96e3-4de7-8c61-ec4ea94da4e2', -> unfinished
	// suggestion_project: , -> later
	uc_invitation: '4089bb11-39a1-4453-b2c2-50a321ca1e8e',
	// user_follow:,
	// validate_account: ,
	// validation-network: ,
	// verification_network: ,
	// profile_views:,
		welcome : 'db2fc916-37b5-42dd-b7b7-99d6163fd6ff',
}


/* WITTY ACCOUNT 

module.exports.TEMPLATES =  {
	ask_project: ,
	upvote_project: ,
	invite_user:, 
	invite_team: ,
	new_message: 'ac643d11-9669-489f-9f5f-19516b281ac3',
	new_project: ,
	reply_project: ,
	reset_password: ,
	suggestion_profile: ,
	suggestion_project: ,
	uc_invitation: ,
	user_follow:,
	validate_account: ,
	validation-network: ,
	verification_network: ,
	profile_views:,
	welcome : 'f98676a1-51f8-4164-91fe-9e4178d46553',
}
*/

/*
quand quelqu’un met un feedback, on envoie
1. au createur
2. au membres du projet
3.aux gens qui ont follow ce projet

si quelqu’un met un reply de feedback, on envoie
1. au createur
2.au membres du projet
3.a celui qui a poste le feedback + ceux qui ont reply au meme feedback
*/

