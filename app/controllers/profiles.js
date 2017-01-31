/**
 * Created by rdantzer on 18/01/17.
 */

const profiles = require('../models/profiles'),
    users = require('../models/users'),
	_ = require('lodash');

exports.updateProfileLocation = function (req, res) {
    	profiles.updateProfileFromUser(req.body, 2)//req.user.id)
    		.then(res.send({success: true}))
    		.catch(err => {console.error("Error updating profile")})
};

exports.updateProfilePicture = function (req, res) {
        if (req.user.moderator) {
        	profiles.updateProfilePicture(req.body.picture, 2)//req.body.profile_id)
    		.then(res.send({success: true}))
        	.catch(err => {console.error("Error updating profile picture")})
        } else {
        	let object = req.body.picture || req.body;
        	console.log("else")
        	profiles.updateProfileFromUser(object, 2)//req.user.id)
			.then(res.send({success: true}))
        	.catch(err => {console.error("Error updating profile")})
        }
};
