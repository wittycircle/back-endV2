const   user = require('../models/users'),
        geo = require('../utils/geolocation'),
        bcrypt = require('bcrypt-nodejs'),
        _ = require('lodash'),
        home = 'http://localhost:3000';

// ------------------ Main methods ------------------

exports.fromUsername = (req, res, next) => {
    user.fromUsername(req.params.username)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Not found'])
            }
            else {
                res.send(r)
            }
        })
        .catch(err => next(err))
};

exports.createUser = (req, res, next) => {
    user.getUserByEmail(req.body.email).then((exist) => {
        if (exist.length) {
            res.status(400).send({success: false, msg: 'Email is already taken', exist: exist});
        } else {
            checkUsername(req.body.first_name, req.body.last_name, req.body.password) 
            .then(({firstName, lastName, username, password}) => {
                user.createProfile(firstName, lastName) 
                .then(([profileId]) => {
                    user.createUser(profileId, req.body.email, username, password) 
                    .then(([userId]) => {
                        user.updateProfile({username: username}, profileId) 
                        .then(user.updateInvitation) 
                        .then(res.send({user: {id: userId, profile_id: profileId}})) 
                        .catch((e) => {
                            console.error(e) 
                        }) 
                    }) 
                }) 
            }).catch(err => next(err)) 
        } 
    }) 
};
// ------------------ SKILLS ------------------
exports.getUserSkills = (req, res, next) => {
  user.getUserSkills(req.params.id)
    .then(r => {
        if (typeof r === 'string') {
            return next([r, 'User has no skills'])
      }
      else{
            res.send({skills: r})
      }
    })
    .catch(err => next(err))
};

exports.addUserSkill = (req, res, next) => {
  if (!req.body || !req.body.skill_id)
    return next(["skill id", "Skill id required, empty body"])
    user.addUserSkill(req.body.skill_id, req.params.id)
      .then(r => {
          if (typeof r === 'string')
             return next([r, "Invalid user id"])
            else
            res.send({skills: r}) 
      })
      .catch(err => next(err))
};

exports.removeUserSkill = (req, res, next) => {
    if (!req.body || !req.body.skill_id)
        return next(["skill id", "Skill id required, empty body"])
    user.removeUserSkill(req.body.skill_id, req.params.id)
      .then(r => {
          if (typeof r === 'string')
            return next([r, 'Did not match any skills']);
          else
            res.send({success: true})
      })
        .catch(err => next(['pro', 'lblem']))
};

// ------------------ PROJECTS ------------------

exports.getProjectsInvolved = (req, res, next) => {
    user.getProjectsInvolved(req.params.id)
        .then(r /*([r, r1])*/ => {
            if (typeof r === 'string') {
                return next([r, 'No projects found'])
            }
            else {
                // r.creator = r1;
                res.send({projects: r})
            }
        })
        .catch(err => next(err))
};

// ------------------ INTERESTS ------------------
exports.getInterests = (req, res, next) => {
    user.getInterests(req.params.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({interests: r.map(e => e.name)})
            }
        })
        .catch(err => next(err))
};

exports.addInterest = (req, res, next) => {
    if (!req.user || req.params.id != req.user.id)
        return next(['Bad id', 'Ressource does not belong to you!'])
    user.addInterest(req.params.id, req.body.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({interests: r.map(e => e.name)})
            }
        })
        .catch(err => next(err))
};

exports.removeInterest = (req, res, next) => {
    if (!req.user || req.params.id != req.user.id)
        return next(['Bad id', 'Ressource does not belong to you!'])
    user.removeInterest(req.params.id, req.body.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({interests: r.map(e => e.name)})
            }
    })
        .catch(err => next(err))
};

// ------------------ EXPERIENCES ------------------

exports.getExperiences = (req, res, next) => {
    user.getExperiences(req.params.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({experiences: r})
            }
        })
        .catch(err => next(err))
};

exports.addExperience = (req, res, next) => {
    if (!req.user || req.params.id != req.user.id)
        return next(['Bad id', 'Ressource does not belong to you!'])
    user.addExperience(req.params.id, req.body)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};

exports.removeExperience = (req, res, next) => {
    if (!req.user || req.params.id != req.user.id)
        return next(['Bad id', 'Ressource does not belong to you!'])
    user.removeExperience(req.params.id, req.body.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};

exports.updateExperience = (req, res, next) => {
    if (!req.user || req.params.id != req.user.id)
        return next(['Bad id', 'Ressource does not belong to you!'])
    user.updateExperience(req.params.id, req.body)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                if (r) res.send({success: true});
                else res.send({success: false});
            }
        })
        .catch(err => next(err))
};
