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

};

exports.updateLocation = function (req, res) {
};

exports.updateProfilePicture = function (req, res) {
    req.checkBody('profile_picture', 'profile picture must be a string of characters').optional().max(128);
    req.checkBody('profile_picture_icon', 'profile picture must be a string of characters').optional().max(256);
    req.checkBody('cover_picture', 'cover picture must be a string of characters').optional().max(128);
    req.checkBody('cover_picture_cards', 'cover picture cards must be a string').optional().max(258);

    const errors = req.validationErrors(true);
    if (errors) return res.status(400).send(errors);
    else {
        if (req.user.moderator) {
            profiles.updateProfilePicture(req.body.picture, 2)//req.body.profile_id)
                .then(res.send({success: true}))
                .catch(err => {
                    console.error("Error updating profile picture")
                })
        } else {
            let object = req.body.picture || req.body;
            console.log("else");
            profiles.updateProfileFromUser(object, 2)//req.user.id)
                .then(res.send({success: true}))
                .catch(err => {
                    console.error("Error updating profile")
                })
        }
    }
};
