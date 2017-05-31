const user = require('../models/users'),
  geo = require('../utils/geolocation'),
  bcrypt = require('bcrypt-nodejs'),
  _ = require('lodash'),
  home = 'http://localhost:3000';

// ------------------ Main methods ------------------

exports.fromUsername = (req, res, next) => {
  user
    .fromUsername(req.params.username)
    .then(r => {
      res.send(r);
    })
    .catch(err => next([err, 'not found']));
};

// ------------------ SKILLS ------------------
exports.getUserSkills = (req, res, next) => {
  user
    .getUserSkills(req.params.id)
    .then(r => {
      res.send({ skills: r });
    })
    .catch(err => next([err, 'Not found']));
};

exports.addUserSkill = (req, res, next) => {
  if (!req.body || !req.body.skill_id)
    return next(['skill id', 'Skill id required, empty body']);
  user
    .addUserSkill(req.body.skill_id, req.params.id)
    .then(r => {
      res.send({ skills: r });
    })
    .catch(err => next([err, 'Invalid']));
};

exports.removeUserSkill = (req, res, next) => {
  if (!req.body || !req.body.skill_id)
    return next(['skill id', 'Skill id required, empty body']);
  user
    .removeUserSkill(req.body.skill_id, req.params.id)
    .then(r => {
      if (typeof r === 'string') return next([r, 'Did not match any skills']);
      else res.send({ success: true });
    })
    .catch(err => next(['pro', 'lblem']));
};

// ------------------ PROJECTS ------------------

exports.getProjectsInvolved = (req, res, next) => {
  user
    .getProjectsInvolved(req.params.id)
    .then((r /*([r, r1])*/) => {
      if (typeof r === 'string') {
        return next([r, 'No projects found']);
      } else {
        // r.creator = r1;
        res.send({ projects: r });
      }
    })
    .catch(err => next(err));
};

// ------------------ INTERESTS ------------------
exports.getInterests = (req, res, next) => {
  user
    .getInterests(req.params.id)
    .then(r => {
      res.send({ interests: r.map(e => e.name) });
    })
    .catch(err => next(err));
};

exports.addInterest = (req, res, next) => {
  if (!req.user || req.params.id != req.user.id)
    return next(['Bad id', 'Ressource does not belong to you!']);
  user
    .addInterest(req.params.id, req.body.name)
    .then(r => {
      console.log('r', r);
      res.send({ interests: r.map(e => e.name) });
    })
    .catch(err => next([err, 'Invalid id']));
};

exports.removeInterest = (req, res, next) => {
  if (!req.user || req.params.id != req.user.id)
    return next(['Bad id', 'Ressource does not belong to you!']);
  user
    .removeInterest(req.params.id, req.body.name)
    .then(r => {
      if (typeof r === 'string') {
        return next([r, 'Bad id']);
      } else {
        res.send({ interests: r.map(e => e.name) });
      }
    })
    .catch(err => next(err));
};

// ------------------ EXPERIENCES ------------------

exports.getExperiences = (req, res, next) => {
  user
    .getExperiences(req.params.id)
    .then(r => {
      res.send({ experiences: r });
    })
    .catch(err => next(err));
};

exports.addExperience = (req, res, next) => {
  const location = req.body.location;
  delete req.body.location;
  if (!req.user || req.params.id != req.user.id)
    return next(['Bad id', 'Ressource does not belong to you!']);
  user
    .addExperience(req.params.id, req.body, location)
    .then(r => {
      res.send({ success: true });
    })
    .catch(err => next(err));
};

exports.removeExperience = (req, res, next) => {
  if (!req.user || req.params.id != req.user.id)
    return next(['Bad id', 'Ressource does not belong to you!']);
  user
    .removeExperience(req.params.id, req.body.id)
    .then(r => {
      res.send({ success: true });
    })
    .catch(err => next(err));
};

exports.updateExperience = (req, res, next) => {
  if (!req.user || req.params.id != req.user.id)
    return next(['Bad id', 'Ressource does not belong to you!']);
  user
    .updateExperience(req.params.id, req.body)
    .then(r => {
      if (r) res.send({ success: true });
      else res.send({ success: false });
    })
    .catch(err => next([err, 'bad id']));
};

// ------------------ SHARE INVITE LINK ------------------

exports.getUserInvite = (req, res, next) => {
  user
    .getUserInvite(req.params.id)
    .then(r => {
      res.send({ invites: r });
    })
    .catch(err => next([err, 'Invalid invite']));
};
