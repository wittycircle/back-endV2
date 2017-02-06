/**
 * Created by rdantzer on 18/01/17.
 */

const profiles = require('../models/profiles'),
    _ = require('lodash');

exports.getProfiles = (req, res, next) => {
    profiles.getProfiles()
        .then(profiles => {
            if (_.isEmpty(profiles))
                next({code: 404})
            else
                res.send({profiles: profiles})
        })
        .catch(err => next(err))
};

exports.getProfile = (req, res, next) => {
    profiles.getProfileBy({'id': req.params.id})
        .then(profile => {
            if (_.isEmpty(profile) || !profile.length)
                next({code: 404});
            else
                res.send({profile: profile[0]});
        })
        .catch(err => next(err));
};

exports.updateProfile = (req, res, next) => {
    profiles.updateProfile(req.body.profile, {id: req.params.id})
    .then(r => {
        if (r) 
            res.send({success: true})
        else
            res.status(400).send({success: false})
    })
    .catch(err => next(err))
}

exports.getProfileLikes = (req, res, next) => {
    profiles.getProfileLikes(  'l.user_id','l.follow_user_id', req.params.id)
    .then((r) => { 
        if (!r.length)
            next({code:400})
        else 
            res.send({like:{count: r.length,who: r}})
    }).catch(err => next(err))
}

exports.getLikedProfile = (req, res, next) => {
    profiles.getProfileLikes('l.follow_user_id', 'l.user_id', req.params.id)
    .then((r) => {
        if (!r.length)
            next({code:400})
        else 
            res.send({count: r.length,who: r})
    }).catch(err => next(err))
}

exports.likeProfile = (req, res, next) => {
    profiles.likeProfile(req.params.id, 3719)
    .then((r) => {
        res.send({success: true})
    })
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
    profiles.updateProfile(req.body.location, {id: req.params.id})
    .then(r => {
        if (r) 
            res.send({success: true})
        else
            res.send({success: false})
    })
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
