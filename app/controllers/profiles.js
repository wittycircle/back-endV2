/**
 * Created by rdantzer on 18/01/17.
 */

const profiles = require('../models/profiles'),
    _ = require('lodash');

exports.getProfiles = (req, res, next) => {
    profiles.getProfiles()
        .then(profiles => res.send({
            profiles: profiles
        }))
        .catch(err => next(err))
};

exports.getProfile = (req, res, next) => {
    profiles.getProfileBy({'id': req.params.id})
        .then(profile => {
            if (_.isEmpty(profile))
                next({code: 404});
            else
                res.send({profile: profile[0]});
        })
        .catch(err => next(err));
};

exports.updateProfile = (req, res, next) => {
    profiles.updateProfile(req.body.profile, {id: req.params.id})
    .then(res.send({success: true}))
    .catch(err => next(err))
}

//likes
exports.getProfileLikes = (req, res, next) => {
    profiles.getProfileLikes(req.params.id)
    .then((r) => {
        res.send({profiles: r})
        // res.send({like: {count: r.count, who: r.who.split(',')}})
    }).catch(err => next(err))
}

exports.likeProfile = (req, res, next) => {
    profiles.likeProfile(req.params.id, 3719)
    .then(res.send({success: true}))
    .catch(err => next(err))
}

exports.unlikeProfile = (req, res, next) => {
    profiles.unlikeProfile(req.params.id, 3719)
    .then(res.send({success: true}))
    .catch(err => next(err))
}

//location
exports.getLocation = (req, res, next) => {
    profiles.getLocation(req.params.id)
    .then(([r]) => res.send({location: r}))
    .catch(err => next(err))
}

exports.updateLocation = function (req, res, next) {
    // profiles.updateProfile(req.body, {id: req.params.id}) or below if user id
    profiles.updateProfileFromUser(req.body, req.params.id)
    .then(res.send({success: true}))
    .catch(err => next(err))
};

// exports.updateProfilePicture = function (req, res) { redo this, 
//         if (req.user.moderator) {
//             profiles.updateProfile(req.body.picture, {id: 2})//req.body.profile_id)
//                 .then(res.send({success: true}))
//                 .catch(err => {
//                     console.error("Error updating profile picture")
//                 })
//         } else {
//             let object = req.body.picture || req.body;
//             console.log("else");
//             profiles.updateProfileFromUser(object, 2)//req.user.id)
//                 .then(res.send({success: true}))
//                 .catch(err => {
//                     console.error("Error updating profile")
//                 })
//         }
// };
