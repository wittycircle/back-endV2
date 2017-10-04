/**
* Created by rdantzer on 03/06/17.
*/

const social 	= require('../services/social');
const _social 	= require('../models/social');
const check 	= require('../models/invitation');
const mailer 	= require('../services/mailer');
const profiles 	= require('../models/profiles');
const cProfiles = require('../controllers/profiles');
const users 	= require('../models/users');
const { db, redis, TABLES } = require('../models');
const { addSkill } = require('../models/skills');
const _ = require('lodash');

const addExperienceToUser = id => experiences =>
	experiences.map(([experience, location]) =>
		users.addExperience(id, experience, location)
	);

const addSkillsToUser = id => skills =>
	Promise.all(skills.map(skill => addSkill(_.lowerCase(skill))))
		.then(skills => _.flattenDeep(skills))
		.then(skills => skills.map(skill => users.addUserSkill(skill, id)))
		.then(skillPromise => Promise.all(skillPromise));

//Differences
// '-' standard ascii
// '–' linkedin stuff
const DATE_RANGE_SEPARATOR = '–';
const Joi = require('joi');
const moment = require('moment');
const parseDate = rawDate =>
rawDate ? moment(Date.parse(rawDate)).format() : moment().format();

const experienceSchema = Joi.object().keys({
	company: Joi.string().required(),
	date_from: Joi.date().required(),
	date_to: Joi.date().required(),
	title: Joi.string().required(),
	description: Joi.string().allow('')
});

const buildExperiences = experiences =>
experiences
.map(({ title, company, dateRange, description, location }) => {
	const [date_from, date_to] = dateRange.split(DATE_RANGE_SEPARATOR);
	const [city, country = 'United States'] = location.split(',');

	return [{
		title,
		company,
		date_from: parseDate(date_from),
		date_to: _.lowerCase(date_to) === 'present'
		? parseDate()
		: parseDate(date_to),
		description
	}, {
		city,
		country
	}];
})
.filter(([experience]) => {
	const result = Joi.validate(experience, experienceSchema);
	return result.error === null;
});


//*** UPLOAD LINKEDIN PHOTO

const cloudinary = require('cloudinary');
const config = require('../private');
cloudinary.config(config.cloudinary);

const upload = url => {
	return new Promise(resolve =>
		cloudinary.uploader.upload(url, result => resolve(result.secure_url), {
			format 	: 'jpg',
			gravity : 'face',
		})
	);
};

//*** AUTOFOLLOW VIA SOCIAL NETWORKS
exports.autoFollowSocials = (req, user_id, data, origin) => {
	if (origin === 'facebook')
		followFacebookFriends(req, user_id, data);
	else
		followGoogleContacts(req, user_id, data.contacts);
}

const followFacebookFriends = (req, user_id, data) => {
	const arr = data._json.friends.data.map( (el) => { return el.id; });
	return db(TABLES.USER_SOCIALS)
		.select('user_id')
		.whereIn('facebook_id', arr)
		.then(r => {
			r.forEach(follow => {
				cProfiles.autoFollowProfile(req, user_id, follow.user_id);
				cProfiles.autoFollowProfile(req, follow.user_id, user_id);
			});
			return Promise.all(r).then(() => ['Finished']);
		});
}

const followGoogleContacts = (req, user_id, data) => {
	return db(TABLES.USERS)
		.select('id')
		.whereIn('email', data)
		.then( r => {
			r.forEach(follow => {
				if (user_id !== follow.id) {
					cProfiles.autoFollowProfile(req, user_id, follow.id);
					cProfiles.autoFollowProfile(req, follow.id, user_id);
				} else {
					console.log(user_id);
				}
			});
			return Promise.all(r).then( () => ['Finished']);
		})

}

//*** END AUTOFOLLOW

//*** UPDATE PROFILE WITH LINKEDIN

const updateLinkedInProfile = (user_id, data) => {
	return db(TABLES.PROFILES).update(data).where('user_id', user_id).then(r => {console.log(r)});
}

const uploadPicture = (user_id, picture) => {
	return upload(picture).then(result => {
		let tab, i, parameter, url_ret

		tab 		= result.split('/');
		i 			= tab.indexOf('upload');
		parameter 	= "c_thumb," + "g_face," + "z_0.9," + 'w_120,' + 'w_120'
		tab.splice(i + 1, 0, parameter);
		url_ret 	= tab.join('/');

		return url_ret
	});
}

exports.updateProfileFromLinkedin = (req, res, next) => {
	const 	profile = req.body.profile,
			picture = req.body.picture;
	
	uploadPicture(req.user.id, picture).then( newPicture => {
		social
		.getLinkedinProfileInfo(profile)
		.then(p => {
			redis.set(`linkedin:${req.user.id}`, JSON.stringify(p));
			return p;
		})
		.then(({skills, summary, tagLine, experiences}) => 
			Promise.all([
				addExperienceToUser(req.user.id)(buildExperiences(experiences)),
				addSkillsToUser(req.user.id)(skills),
				updateLinkedInProfile(req.user.id, { description: summary || tagLine, picture: newPicture }),
			])
		)
		.then(results => {
			res.send({
				success: process.env.NODE_ENV === 'development' ? results : true
			})
		})
		.catch(error => {
			console.log('ERROR ====>', error);
			res.send({ success: false });
		});
	})
};

// exports.InviteFriendsFromGoogle = (req, res, next) => {
// 	// let inviteOnlyOnce = db('user_socials').select('invite_google');

// 	const { token } = req.body;

// 	social
// 	.gmailContactsCampaign(token)
// 	.then(mailList => {
// 		check.verifyUsers(mailList).then( checkMails => {
// 			mailer.invite_user({ uid: req.user.id, mailList, type: 'gmail' })
// 		});
// 	})
// 	.then(() => {
// 		return db('user_socials')
// 		.first('invite_google')
// 		.where('user_id', req.user.id)
// 		.then(invited => {
// 			if (invited.invite_google === 1) return;
// 			else {
// 				req.broadcastEvent('add_points', {
// 					user_id: req.user.id,
// 					points: 500
// 				});
// 				return db('user_socials')
// 				.update('invite_google', 1)
// 				.where('user_id', req.user.id);
// 			}
// 		});
// 	})
// 	.then(() => res.send({ success: true }));
// };

exports.getGoogleContactsByToken = (req, res, next) => {
	let inviteOnlyOnce = db('user_socials').select('invite_google');

	const { token } = req.body

	social
		.gmailContactsCampaign(token)
		.then(mailList => {
			check.verifyUsers(mailList).then( checkMails => {
				_social.saveGoogleContacts(checkMails)
			});
		})
}
