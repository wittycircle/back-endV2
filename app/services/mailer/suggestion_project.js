const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const suggestions = require('../../models/suggestions');
const { db, TABLES } = require('../../models/index');


const send_mail = (project, profiles) => {
	console.log('SEND MAIL CALLED');
	
	let mail = new helper.Mail();
	wm.from(mail, 'notifications@wittycircle.com', 'Wittycircle');
	wm.content(mail);
	wm.reply(mail, 'notifications@wittycircle.com');
	mail.setTemplateId(TEMPLATES.suggestions_profile);


	const category = new helper.Category('suggestion_profiles');
	mail.addCategory(category);

	let laString = '';
	let pers = new helper.Personalization();
	let subject = 'Some profiles and opportunities you might need';
	let sub = {
		'*|PF_NAME|*' 		: project.first_name,
		'*|PR_TITLE|*' 		: project.title,
		MAIL: 'lionfiercely_force@hotmail.fr'
	};
	profiles.forEach((b, i) => {
		if (i < 3) laString += fillSub(b);
	});
	sub['*|PROFILES_BLOC|*'] = laString;

	wm.subject(pers, subject);
	wm.to(pers, 'jayho@wittycircle.com');

	wm.substitutions(pers, sub);
	mail.addPersonalization(pers);
	wm.send(mail, 'suggestion_profiles');

	return null

};

const suggestionProjectToProfile = () => {

	db(TABLES.USERS)
	.select('id')
	.where('email', 'not like', '%witty%')
	.then(r => {
		r.forEach((e, i)=> {
			if (!i) { 
				suggestions.matchProjectsToProfile(e.id)
					.then(projects => {
					});
			}
		})
	})
};

suggestionProjectToProfile();