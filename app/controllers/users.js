const   user = require('../models/users'),
        geo = require('../utils/geolocation'),
        bcrypt = require('bcrypt-nodejs'),
        _ = require('lodash'),
        home = 'http://localhost:3000';


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
    next(["skill id", "Skill id required, empty body"])
  else{
    user.addUserSkill(req.body.skill_id, req.params.id)
      .then(r => {
        if (r && r.length){
          if (typeof r === 'string')
              next([r, "Invalid user id"])
            else
            res.send({skills: r}) 
        } 
        else{
          next(['No matched skill', 'invalid skill id'])
        }
      })
      .catch(err => next(err))
  }
};

exports.removeUserSkill = (req, res, next) => {
    if (!req.body || !req.body.skill_id)
    next(["skill id", "Skill id required, empty body"])
  else{
    user.removeUserSkill(req.body.skill_id, req.params.id)
      .then(r => {
        if (r){
          if (typeof r === 'string')
            next([r, 'Did not match any skills']);
          else
            res.send({success: true})
        }
        else {
          next(["No match" , "No matched skill or last skilled removed"])
        }
      })
      .catch(err => next(err))
    }
};

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
