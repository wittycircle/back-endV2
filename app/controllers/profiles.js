/**
 * Created by rdantzer on 18/01/17.
 */

const profiles = require('../models/profiles'),
    _ = require('lodash');

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

exports.getProfiles = (req, res, next) => {
    profiles.getProfiles()
        .then(profiles => res.send({
            profiles: profiles
        }))
        .catch(err => next(err))
};

exports.updateProfile = (req, res, next) => {
    profiles.updateProfile({id: req.params.id}, req.body.profile)
        .then(res.send({success: true}))
        .catch(err => next(err))
};

exports.getProfileLikes = (req, res, next) => {
    profiles.getProfileLikes(req.params.id)
        .then((r) => {
            res.send(r)
        })
        .catch(err => next(err));
};

exports.likeProfile = (req, res, next) => {
    console.log(req.user);
    profiles.likeProfile(req.params.id, req.user.id)
        .then(res.send({success: true}))
        .catch(err => next(err))
};


exports.unlikeProfile = (req, res, next) => {
    profiles.unlikeProfile(req.params.id, req.user.id)
        .then(res.send({success: true}))
        .catch(err => next(err))
};


exports.updateProfile = (req, res, next) => {
    profiles.updateProfile({id: req.params.id}, req.body.profile)
        .then(res.send({success: true}))
        .catch(err => next(err))
};

exports.getLocation = (req, res, next) => {
    profiles.getLocation(id)
        .then(([r]) => res.send({location: r}))
};

exports.updateLocation = (req, res, next) => {
    profiles.updateProfileFromUser(req.body, 2)//req.user.id)
        .then(res.send({success: true}))
        .catch(err => next(err))
};