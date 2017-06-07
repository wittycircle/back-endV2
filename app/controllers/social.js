/**
 * Created by rdantzer on 03/06/17.
 */

const social = require('../services/social');
const mailer = require('../services/mailer');
const profiles = require('../models/profiles');
const users = require('../models/users');
const { addSkill } = require('../models/skills');
const _ = require('lodash');

const addExperienceToUser = id => experiences =>
  experiences.map(([experience, location]) =>
    users.addExperience(id, experience, location)
  );
const addSkillsToUser = id => skills =>
  Promise.all(skills.map(skill => addSkill(_.lowerCase(skill))));

//Differences
// '-' standard ascii
// '–' linkedin stuff
const DATE_RANGE_SEPARATOR = '–';
const Joi = require('joi');

const experienceSchema = Joi.object().keys({
  company: Joi.string().required(),
  date_from: Joi.date().required(),
  date_to: Joi.date().required(),
  title: Joi.string().required(),
  description: Joi.string()
});

exports.updateProfileFromLinkedin = (req, res, next) => {
  const { profile } = req.body;

  social
    .getLinkedinProfileInfo(profile)
    .then(({ skills, summary, experiences }) =>
      Promise.all([
        addExperienceToUser(req.user.id)(
          experiences
            .map(({ title, company, dateRange, description, location }) => {
              const [date_from, date_to] = dateRange.split(DATE_RANGE_SEPARATOR);
              const [city, country] = location.split(',');

              return [
                {
                  title,
                  company,
                  date_from: Date.parse(date_from),
                  date_to: _.lowerCase(date_to) === 'present'
                    ? Date.now()
                    : Date.parse(date_to),
                  description
                },
                {
                  city,
                  country
                }
              ];
            })
            .filter(([experience]) => {
              const result = Joi.validate(experience, experienceSchema);
              return result.error === null;
            })
        ),
        addSkillsToUser(req.user.id)(skills),
        profiles.updateProfile(
          {
            description: summary
          },
          undefined, //location
          {
            user_id: req.user.id
          }
        )
      ])
    )
    .then(results => res.send({ success: true }))
    .catch(error => res.send({ success: false }));
};

exports.InviteFriendsFromGoogle = (req, res, next) => {
  const { token } = req.body;

  social
    .gmailContactsCampaign(token)
    .then(mailList =>
      mailer.invite_user({ uid: req.user.id, mailList, category: 'gmail' })
    )
    .then(() => {
      req.broadcastEvent('add_points', { user_id: req.user.id, points: 2000 });
      return db('user_socials')
        .update('invite_google', 1)
        .where('user_id', req.user.id);
    })
    .then(() => res.send({ success: true }));
};
