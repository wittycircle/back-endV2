const   user = require('../models/users'),
        geo = require('../utils/geolocation'),
        bcrypt = require('bcrypt-nodejs'),
        _ = require('lodash'),
        home = 'http://localhost:3000';

// ------------------ Main methods ------------------
exports.createUser = (req, res, next) => {
    user.getUserByEmail(req.body.email).then((exist) => {
    if (exist.length) {
           res.status(400).send({success: false, msg: 'Email is already taken', exist: exist});
   } else {
        checkUsername(req.body.first_name, req.body.last_name, req.body.password)
        .then(({firstName, lastName, username, password}) => {
            user.createProfile(firstName, lastName)
               .then(([profileId]) =>  {
                    user.createUser(profileId, req.body.email, username, password)
                    .then(([userId]) => {
                    user.updateProfile({username:username}, profileId)
                    .then(user.updateInvitation)
                    .then(res.send({user: {id: userId, profile_id: profileId}}))
                    .catch((e) => { console.error(e) })
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
      if (r.length) {
        res.send({skills: r})
      }
      else{
        next(['no content', 'User has no skills'])
      }
    })
    .catch(err => next(err))
};

exports.addUserSkill = (req, res, next) => {
  if (!req.body || !req.body.skill_id)
    return next(["skill id", "Skill id required, empty body"])
    user.addUserSkill(req.body.skill_id, req.params.id)
      .then(r => {
        if (r && r.length){
          if (typeof r === 'string')
             return next([r, "Invalid user id"])
            else
            res.send({skills: r}) 
        } 
        else{
          return next(['No matched skill', 'invalid skill id'])
        }
      })
      .catch(err => next(err))
};

exports.removeUserSkill = (req, res, next) => {
    if (!req.body || !req.body.skill_id)
        return next(["skill id", "Skill id required, empty body"])
    user.removeUserSkill(req.body.skill_id, req.params.id)
      .then(r => {
        if (r){
          if (typeof r === 'string')
            return next([r, 'Did not match any skills']);
          else
            res.send({success: true})
        }
        else {
          return next(["No match" , "No matched skill or last skilled removed"])
        }
      })
      .catch(err => next(err))
};

// ------------------ PROJECTS ------------------

exports.getProjectsInvolved = (req, res, next) => {
  user.getProjectsInvolved(req.params.id)
    .then(r => {
      if (typeof r === 'string') {
        return next([r, 'No projects found'])
      }
      else{
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
      else{
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
      else{
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
      else{
        res.send({interests: r.map(e => e.name)})
      }
    })
    .catch(err => next(err))
};

// ------------------ EXPERIENCES ------------------