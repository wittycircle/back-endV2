const helper = require('sendgrid').mail;
const { db, TABLES } = require('../../models/index');
const config = require('../../private');
const _ = require('lodash');

const subst = (pers, obj) => {
	for (let key in obj) {
		pers.addSubstitution(new helper.Substitution(key, obj[key]));
	}
};

const sect = (section, obj) => {
	for (let key in obj) {
		section.addSubstitution(new helper.Substitution(key, obj[key]));
	}
};

const subject = (mail, pers, subject) => {
	mail.setSubject(subject), pers.setSubject(subject);
};

const send = (mail, name = 'mail') => {
	sg = require('sendgrid')(config.sendgrid.key); //real
	// sg = require('sendgrid')(config.sequogrid.key); //test

	const request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON()
	});

	sg.API(request, function(error, response) {
		console.log('name', name);
		console.log(mail.toJSON().personalizations);
		console.log(response.statusCode);
		console.log(response.body);
		console.log(response.headers);
	});
};

const wm = {
	content: mail => mail.addContent(new helper.Content('text/html', '<p></p>'))
};

wm.bcc = (pers, arr) => arr.map(r => pers.addBcc(new helper.Email(r)));
wm.from = (mail, email, name) => mail.setFrom(new helper.Email(email, name));
wm.to = (pers, email, name) => pers.addTo(new helper.Email(email, name));
wm.reply = (mail, email, name) => mail.setReplyTo(new helper.Email(email, name));
wm.subject = (pers, subject) => {
	pers.setSubject(subject);
};
wm.substitutions = subst;
wm.section = sect;
wm.send = send;
wm.truncate = x => _.truncate(x, { length: 76, separator: ' ' });
wm.location = e =>
	e.city + ', ' + (e.country ? e.country : e.state ? e.state : '');
wm.url = spec =>
	`https://www.wittycircle.com${spec[0] === '/' ? '' : '/'}${spec}`;

// ------------------ db stuff ------------------
wm.notif = type =>
	db
		.select('user_id')
		.from(TABLES.NOTIF_PERM + ' as n')
		.where('notif_type', type)
		.andWhere('permission', 1)
		.as('n');

wm.transform = url => {
	if (url && url.indexOf('cloudinary') >= 0) {
		let tab, i, parameter, url_ret;
		tab = url.split('/');
		i = tab.indexOf('upload');
		parameter = 'w_200,h_200,c_fill,g_face';
		tab.splice(i + 1, 0, parameter);
		url_ret = tab.join('/');
		return url_ret;
	} else return url;
};
/*
| profile_view   |
| user_follow    |
| follow_project |
| feedback       |
| ask_project    |
| reply_project  |
| new_message	 |
*/

wm.skills_bloc = (skills) => {
	
	if (!skills)
		return ''

	let skillArray, skillObject;

	skillArray 	= skills.split(',');
	skillObject = { 
		first 	: skillArray[0], 
		second 	: skillArray[1], 
		third 	: skillArray[2], 
		fourth 	: skillArray[3], 
		fifth 	: skillArray[4], 
		more 	: skillArray[5] ? ('+' + (skillArray.length - 5) + ' more') : '' } 

	let bloc = `<li style="display: inline-block; margin: 0 5px 5px 0; list-style-type: none; padding: 4px 14px; border: 1px solid #bec1c3; border-radius: 20px; font-family: OpenSans; font-weight: normal; font-size: 12px; color: #bec1c3;">${skillObject.first}</li>`;
	if (skillObject.second)
		bloc += `<li style="display: inline-block; margin: 0 5px 5px 0; list-style-type: none; padding: 4px 14px; border: 1px solid #bec1c3; border-radius: 20px; font-family: OpenSans; font-weight: normal; font-size: 12px; color: #bec1c3;">${skillObject.second}</li>`
	if (skillObject.third)
		bloc += `<li style="display: inline-block; margin: 0 5px 5px 0; list-style-type: none; padding: 4px 14px; border: 1px solid #bec1c3; border-radius: 20px; font-family: OpenSans; font-weight: normal; font-size: 12px; color: #bec1c3;">${skillObject.third}</li>`
	if (skillObject.fourth)
		bloc += `<li style="display: inline-block; margin: 0 5px 5px 0; list-style-type: none; padding: 4px 14px; border: 1px solid #bec1c3; border-radius: 20px; font-family: OpenSans; font-weight: normal; font-size: 12px; color: #bec1c3;">${skillObject.fourth}</li>`
	if (skillObject.fifth)
		bloc += `<li style="display: inline-block; margin: 0 5px 5px 0; list-style-type: none; padding: 4px 14px; border: 1px solid #bec1c3; border-radius: 20px; font-family: OpenSans; font-weight: normal; font-size: 12px; color: #bec1c3;">${skillObject.fifth}</li>`
	if (skillObject.more)
		bloc += `<li style="display: inline-block; margin: 0 5px 5px 0; list-style-type: none; padding: 4px 14px; border: 1px solid #bec1c3; border-radius: 20px; font-family: OpenSans; font-weight: normal; font-size: 12px; color: #bec1c3;">${skillObject.more}</li>`
	
	return `<div class="skill-list" style="max-width: 400px; margin-top: 10px">${bloc}</div>`
}

wm.location_bloc = (location) => {
	if (!location)
		return ''
	return `<span style=" margin-right: 20px; font-family: OpenSans; font-weight: semibold; font-size: 14px; color: #bec1c3;"><img style="width: 9px; margin-right: 3px;" src="https://marketing-image-production.s3.amazonaws.com/uploads/8b5975218013c94ed4ab5a52303771966218a241dca84fc6a49b3c7423e73222ae645cd8ea518428a0f316877b1d8b4f673a267aa85099a8bd1ba106c55a5e11.png" alt="location_icon"> ${location}</span>`
}

wm.network_bloc = (network) => {
	if (!network || network === 'Unknown')
		return ''
	return `<span style="font-family: OpenSans; font-weight: semibold; font-size: 14px; color: #bec1c3;"><img style="position: relative; top: 4px; width: 18px; margin-right: 3px;" src="https://marketing-image-production.s3.amazonaws.com/uploads/1aec59a57dbb4e1b0a44fc9e86cac3df64e6efd7e10ee4da72028febbfd1c0e45014bee1d9fbd12ac1e68ea485a50bef2e3fcf409ba010f9f08497a12cb9798f.png" alt="network_icon"> ${network}</span>`
}

module.exports.wm = wm;
//sequoya account for testing purposes
// module.exports.TEMPLATES =  {
// 	ask_project: 'b2482793-bfe8-4b3a-afc8-1ef959694a0e',
// 	upvote_project: '7ea33ecc-88b5-4385-a864-2d63b2dadfb2',
// 	invite_user: '1e2364c3-e76f-41ef-b323-0cd46cacac51',
// 	invite_team: '7e5e775c-e82b-47b6-b0a9-0e694f29febe',
// 	new_message: 'ac643d11-9669-489f-9f5f-19516b281ac3',
// 	new_project: '54151d8f-5dec-48a2-9f03-bde04fba72c3',
// 	reply_project: '8abd1eb3-5e4e-4b99-85d4-2d5c858dd716',
// 	reset_password: 'a3d60d87-f258-4271-b9df-0ebe56aedea9',
// 	// suggestion_profile: 'f1adc8ff-96e3-4de7-8c61-ec4ea94da4e2', -> unfinished
// 	// suggestion_project: , -> later
// 	uc_invitation: '4089bb11-39a1-4453-b2c2-50a321ca1e8e',
// 	user_follow: '492959f6-cbf3-40f7-a13c-bec03e7c6bc7',
// 	validate_account: '4eab028c-844b-457e-b65d-81a2865d018d',
// 	// validation-network: /*Not to be done for now*/,
// 	verification_network: '830e6295-2772-472f-bb49-a6503da5b565',
// 	profile_views:'2ef5f37c-e10e-48a4-b5ac-de02b23efab9',
// 		welcome : 'db2fc916-37b5-42dd-b7b7-99d6163fd6ff',
// }

// WITTY ACCOUNT

module.exports.TEMPLATES = {
  ask_project: '7eaa5daa-b30a-42a1-9e60-7b2b8082db2c',
  upvote_project: 'fa4a9f30-0e19-4cbb-beb1-1f2609712da7',
  invite_user: 'f77ff311-9f03-4283-8d1f-774c35d9b091',
  invite_team: '49ba0c57-40e0-4cd5-89aa-f097b045fcd2',
  new_message: '95f7509c-280e-42d0-8049-3959deed6261',
  new_project: 'f6dad873-a71e-4051-9cce-fdfc4f49affc',
  reply_project: '74de27df-bd29-43cf-9ff0-71a7384cb1cf',
  reset_password: '4b0e4c39-1227-4c28-8536-b09b8f19e07b',
  // suggestion_profile: ,
  // suggestion_project: ,
  uc_invitation: '7f8e9ed4-7b0a-412d-837e-6f88ad9cce5c',
  user_follow: '082dea23-81c0-454a-9e60-ceff09d1bcdf',
  validate_account: '61e506e0-18b4-4bae-825c-33c2aa3bf450',
  // validation-network: ,
  verification_network: '9cd590a5-7482-4f28-9fdb-2e509e57ca3a',
  profile_views: '0280cdc2-c528-4bdc-ba3e-3b19a7a0f00d',
  welcome: 'f98676a1-51f8-4164-91fe-9e4178d46553',
  welcomeGmail: 'db22f7ec-1af2-4bc9-b700-03f8ac068861',
  feedback: '36efd503-da42-40ab-9479-3fbe53846feb',
  complete_profile: '05bdf2fe-b899-4ec5-8f0e-1940668e5939',
  complete_project: '7e6f6273-8b39-41bc-8972-7ee76d7e23fd'
};

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
