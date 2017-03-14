/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router(),
    profiles = require('../controllers/profiles'),
    search = require('../controllers/search'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport'),
    auth = (x) => passport.authenticate(x);

router.route('/profiles')
    .get(profiles.getProfiles);

router.route('/profiles/search')
    .post(validate(schemas.search.profile), search.searchProfile);

// ------------------ Params ------------------
router.param('id', validateParam(schemas.params.id));
// ------------------ Params ------------------

router.route('/profiles/:id')
    .get(profiles.getProfile)
    .put(auth('bearer'), validate(schemas.profile.update), profiles.updateProfile);

router.route('/profiles/:id/location')
    .get(profiles.getLocation)
    .put(auth('bearer'), validate(schemas.profile.location), profiles.updateLocation);

router.route('/profiles/:id/follow')
    .get(profiles.getProfileFollowers)
    .post(auth('bearer'), profiles.followProfile)
    .delete(auth('bearer'), profiles.unfollowProfile);

module.exports = router;