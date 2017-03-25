/**
 * Created by rdantzer on 18/01/17.
 */

const profiles = require('../models/profiles'),
    _ = require('lodash');

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
                res.send({success: true});
            else
                res.status(400).send({success: false})
        })
        .catch(err => next(err))
};
// ------------------ Follow ------------------

exports.getProfileFollowers = (req, res, next) => {
    Promise.all([
        profiles.getProfileFollowers('l.user_id', 'l.follow_user_id', req.params.id),
        profiles.getProfileFollowers('l.follow_user_id', 'l.user_id', req.params.id)
    ])
        .then(([r, r1]) => {
            if (typeof r === 'string')
                return next([r, "Invalid id"])
            else
                res.send({following: r, followers: r1})
        }).catch(err => next(err))
};

exports.followProfile = (req, res, next) => {
    profiles.followProfile(req.params.id, req.user.id)
        .then((r) => {
            if (_.isEmpty(r))
                res.send({success: false});
            else {
                req.broadcastEvent('user_follow', {
                    from: req.user.id,
                    to: req.params.id,
                    value: 1
                });
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
                req.broadcastEvent('user_follow', {
                    from: req.user.id,
                    to: req.params.id,
                    value: -1
                });
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
