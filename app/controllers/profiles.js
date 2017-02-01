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
                next({error: 'invalid_id'});
            else
                res.send({profile: profile[0]});
        })
        .catch(err => next(err));
};

exports.updateProfile = (req, res, next) => {
    profiles.updateProfile({id: req.params.id}, req.body.profile)
    .then(res.send({success: true}))
    .catch(err => next(err))
}

exports.getProfileLikes = (req, res, next) => {
    profiles.getProfileLikes(req.params.id)
    .then(([r]) => {
        res.send({like: r})
    })
}

exports.likeProfile = (req, res, next) => {
    profiles.likeProfile(req.params.id, req.user.id)
    .then(res.send({success: true}))
    .catch(err => next(err))
}

// exports.updateLocation = function (req, res) {
//         profiles.updateProfileFromUser(req.body, 2)//req.user.id)
//             .then(res.send({success: true}))
//             .catch(err => {
//                 console.error("Error updating profile")
//             })
// };

// exports.updateProfilePicture = function (req, res) {
//         if (req.user.moderator) {
//             profiles.updateProfilePicture(req.body.picture, 2)//req.body.profile_id)
//                 .then(res.send({success: true}))
//                 .catch(err => {
//                     console.error("Error updating profile picture")
//                 })
//         } else {
//             let object = req.body.picture || req.body;
//             console.log("else");;;;;;;;;;;;;;;;;;;;;;;;;;;
//             profiles.updateProfileFromUser(object, 2)//req.user.id)
//                 .then(res.send({success: true}))
//                 .catch(err => {
//                     console.error("Error updating profile")
//                 })
//         }
// };
