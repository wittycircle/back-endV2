/**
 * Created by rdantzer on 03/06/17.
 */

const social = require('../services/social');
const mailer = require('../services/mailer');
const profiles = require('../models/profiles');
const users = require('../models/users');
const { db, redis, TABLES } = require('../models');
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
const moment = require('moment');
const parseDate = rawDate =>
  rawDate ? moment(Date.parse(rawDate)).format() : moment().format();

const experienceSchema = Joi.object().keys({
  company: Joi.string().required(),
  date_from: Joi.date().required(),
  date_to: Joi.date().required(),
  title: Joi.string().required(),
  description: Joi.string()
});

const buildExperiences = experiences =>
  experiences
    .map(({ title, company, dateRange, description, location }) => {
      const [date_from, date_to] = dateRange.split(DATE_RANGE_SEPARATOR);
      const [city, country] = location.split(',');

      return [
        {
          title,
          company,
          date_from: parseDate(date_from),
          date_to: _.lowerCase(date_to) === 'present'
            ? parseDate()
            : parseDate(date_to),
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
    });

exports.updateProfileFromLinkedin = (req, res, next) => {
  const { profile } = req.body;

  social
    .getLinkedinProfileInfo(profile)
    .then(p => {
      redis.set(`linkedin:${req.user.id}`, JSON.stringify(p));
      return p;
    })
    .then(({ skills, summary, experiences }) =>
      Promise.all([
        addExperienceToUser(req.user.id)(buildExperiences(experiences)),
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
    .then(results =>
      res.send({
        success: process.env.NODE_ENV === 'development' ? results : true
      })
    )
    .catch(error => {
      console.log(error);
      res.send({ success: false });
    });
};

exports.InviteFriendsFromGoogle = (req, res, next) => {
  const { token } = req.body;

  social
    .gmailContactsCampaign(token)
    .then(mailList =>
      mailer.invite_user({ uid: req.user.id, mailList, category: 'gmail' })
    )
    .then(() => {
      req.broadcastEvent('add_points', { user_id: req.user.id, points: 500 });
      return db('user_socials')
        .update('invite_google', 1)
        .where('user_id', req.user.id);
    })
    .then(() => res.send({ success: true }));
};
