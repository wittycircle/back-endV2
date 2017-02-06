const   user = require('../models/users'),
        geo = require('../utils/geolocation'),
        bcrypt = require('bcrypt-nodejs'),
        _ = require('lodash'),
        home = 'http://localhost:3000';

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
}
