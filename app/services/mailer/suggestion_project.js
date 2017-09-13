const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper'); //NIK
const suggestions = require('../../models/suggestions');
const { db, TABLES } = require('../../models/index');

const profile_bloc = (name, picture, description, location, network, skills, username) => {
	return `
	<div class="main-class">
		<div class="first-container">
			<img style="border-radius: 50%; width: 50px;" src="${picture}" alt="profile_picture">
		</div>

		<div class="second-container">
			<h2 style="margin: 0; font-family: Arial, Tahoma, Vernada; font-weight: bold; font-size: 14px; color: #323232; margin-bottom: 5px;">${name}</h2>
			<h3 style="margin: 0; font-family: Tahoma; font-weight: normal; font-size: 12px; color: #697178; margin-bottom: 5px; ">${description || ''}</h3>
			<div class="location" style="margin-bottom: 10px;">
				${wm.location_bloc(wm.location(location))}
				${wm.network_bloc(network)}
			</div>

			<div class="skill-list" style="margin-top: 10px">
				${ wm.skills_bloc2(skills)}
			</div>
		</div>

		<div class="third-container">
			<a href="https://www.wittycircle.com/${username}" style="margin: 0; text-decoration: none !important; text-decoration: none; margin-bottom: 10px; font-family: Vernada, Tahoma, Arial; font-size: 12px; color: #fff; border: none; border-radius: 4px; background-color: #497faa; padding: 7px 23px;">View profile</a>
		</div>

		<div class="height" style="height: 20px; width: 100%;"></div>
	</div>`

};

const fillSub = (b) => {
	return profile_bloc(
		b.fullName,
		b.picture,
		b.date,
		b,
		b.network,
		b.skills,
		b.username
	);
};

const send_mail = (project, profiles) => {
	console.log('SEND MAIL CALLED');
	
	console.log(project);
	console.log(profiles);
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
	wm.to(pers, 'friends@wittycircle.com');

	wm.substitutions(pers, sub);
	mail.addPersonalization(pers);
	wm.send(mail, 'suggestion_profiles');

	return null

};

const suggestionProfileToProject = () => {
	let count = 0;

	db
	.select(
		'pr.id',
		'pr.title',
		'u.email',
		'p.first_name',
		'p.last_name'
	)
	.from(TABLES.PROJECTS + ' as pr')
	.join(TABLES.USERS + ' as u', 'u.id', 'pr.user_id')
	.join(TABLES.PROFILES + ' as p', 'p.user_id', 'pr.user_id')
	.whereRaw('pr.picture is not null && pr.picture != "" && pr.description is not null && pr.description != ""')
	.then(r => {
		r.forEach((e, i) => {
			if (e.email.indexOf('witty') < 0 && count === 0) {
				count = 1;
				suggestions.matchProfilesToProject(e.id)
					.then(profiles => {	
						send_mail(e, profiles.splice(0, 5));
					});
			}
		});
	})
};

suggestionProfileToProject();