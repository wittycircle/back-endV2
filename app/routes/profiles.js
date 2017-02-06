/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router(),
    profiles = require('../controllers/profiles'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport');


router.route('/profiles')
    .get(profiles.getProfiles);

router.param('id', validateParam(schemas.params.id));

router.route('/profiles/:id')
    .get(profiles.getProfile)
    .put(validate(schemas.profile.update), profiles.updateProfile);

router.route('/profiles/:id/location')
    .get(profiles.getLocation)
    .put(validate(schemas.profile.location), profiles.updateLocation);

router.route('/profiles/:id/like')
	.get(profiles.getProfileLikes)
    .post(passport.authenticate('bearer'), profiles.likeProfile)
	.delete(passport.authenticate('bearer'), profiles.unlikeProfile);


module.exports = router;