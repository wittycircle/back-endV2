/**
 * Created by rdantzer on 18/01/17.
 */

const profiles = require('../models/profiles');

const send_success = (err, res) => {
	if (err) throw err;
	else {
		res.send({success: true})
	}
}

exports.updateProfileLocation = function(req, res) {
    req.checkBody('location_country', 'Location country must be between 1 and 64 characters').optional().max(64);
    req.checkBody('location_city', 'Location city must be between 1 and 64 characters').optional().max(64);
    req.checkBody('location_state', 'Location state must be between 1 and 64 characters').optional().max(64);
    req.sanitize('location_state').Clean(true);
    req.sanitize('location_city').Clean(true);
    req.sanitize('location_country').Clean(true);

    const errors = req.validationErrors(true);
    if (errors) return res.status(400).send(errors);
    else {
    	profiles.updateProfileFromUser(req.body, req.user.id)
    		.then(send_success)
    		// .catch(err => {throw "nope"})
    }
};

exports.updateProfilePicture = function(req, res) {
    req.checkBody('profile_picture', 'profile picture must be a string of characters').optional().max(128);
    req.checkBody('profile_picture_icon', 'profile picture must be a string of characters').optional().max(256);
    req.checkBody('cover_picture', 'cover picture must be a string of characters').optional().max(128);
    req.checkBody('cover_picture_cards', 'cover picture cards must be a string').optional().max(258);

    const errors = req.validationErrors(true);
    if (errors) return res.status(400).send(errors);
    else {
        if (req.user.moderator) {
        	profiles.updateProfilePicture(req.body.picture, req.body.profile_id)
        	.then(send_success)
        	.catch(err => {throw "no"})
        } else {
        	let object = req.body.picture || req.body;
        	console.log("else")
        	profiles.updateProfileFromUser(object, req.user.id)
        	.then(send_success('toto', res))
        	.catch(err => {throw "nope nope"})
        }
    }
};
