/**
 * Created by rdantzer on 18/01/17.
 */

const profiles = require('../models/profiles'),
    user = require('../models/users'),
    mailer = require('../services/mailer'),
    _ = require('lodash');

const has_liked = (foli, id) => {
    let hasLiked = false;
    let infollo = _.split(foli, ',');
    infollo.forEach(e => {
        if (e == id)
            hasLiked = true;
    });
    return hasLiked;
};

exports.getProfiles = (req, res, next) => {
    profiles.getProfiles()
        .then(profiles => {
            if (_.isEmpty(profiles))
                next({code: 404});
            else
                res.send({profiles: profiles})
        })
        .catch(err => next(err))
};

exports.getProfile = (req, res, next) => {
    profiles.getProfileBy({'p.id': req.params.id})
        .then(profile => {
            if (!profile)
                next({code: 404});
            else {
                if (req.user && req.user.id) {
                    profile.hasLiked = has_liked(profile.foli, req.user.id)
                }
                delete profile.foli;
                if (req.user && req.user.id)
                    req.broadcastEvent('profile_view', {from: req.user.id, id: req.params.id});
                res.send({profile: profile});
            }
        })
        .catch(err => {
            console.log("ERRUER WESH")
            next(err)
        });
};

exports.updateProfile = (req, res, next) => {
    profiles.updateProfile(req.body.profile, {id: req.params.id})
        .then(r => {
            if (r) {
                req.broadcastEvent('profile_update', {id: req.params.id})
                res.send({success: true});
            }
            else
                res.status(400).send({success: false})
        })
        .catch(err => next(err))
};
// ------------------ Follow ------------------

exports.getProfileFollowers = (req, res, next) => {
    Promise.all([
        profiles.getProfileFollowers('l.user_id', 'l.follow_user_id', req.params.id),
        profiles.getProfileFollowers('l.follow_user_id', 'l.user_id', req.params.id),
        user.getProjectFollow(req.params.id)
    ])
        .then(([r, r1, r2]) => {
            if (typeof r === 'string')
                return next([r, "Invalid id"])
            else {
                let o = {
                    project_upvoted: r2.length,
                    following_count: r.length,
                    followers_count: r1.length
                }
                res.send({Count: o, upvoted: r2, following: r, followers: r1})
            }
        }).catch(err => next(err))
};

exports.followProfile = (req, res, next) => {
    profiles.followProfile(req.params.id, req.user.id)
        .then((r) => {
            if (typeof r === 'string')
                return next([r, "bad id"])
            else {
                mailer.user_follow({follower: req.user.id, following: req.params.id})
                req.broadcastEvent('user_follow', {from: req.user.id, id: req.params.id, value: 1});
                res.send({success: true})
            }
        })
        .catch(error => next(error))
};

exports.unfollowProfile = (req, res, next) => {
    profiles.unfollowProfile(req.params.id, req.user.id)
        .then((r) => {
            if (!r)
                res.send({success: false});
            else {
                req.broadcastEvent('user_follow', {from: req.user.id, id: req.params.id, value: -1});
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};
// ------------------ Location ------------------
exports.getLocation = (req, res, next) => {
    profiles.getLocation(req.params.id)
        .then(([r]) => res.send({location: r}))
        .catch(err => next(err))
};

exports.updateLocation = function (req, res, next) {
    profiles.updateProfile(req.body.location, {id: req.params.id})
        .then(r => {
            if (r)
                res.send({success: true});
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
