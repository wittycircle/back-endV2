/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router(),
    profiles = require('../controllers/profiles'),
    search = require('../controllers/search'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');

router.route('/profiles')
    .get(profiles.getProfiles);

router.route('/profiles/search')
    .post(auth(AUTH.PUBLIC), validate(schemas.search.profile), search.searchProfile);

// ------------------ Params ------------------
router.param('id', validateParam(schemas.params.id));
// ------------------ Params ------------------

router.route('/profiles/:id')
    .get(auth(AUTH.PUBLIC), profiles.getProfile)
    .put(auth(AUTH.PRIVATE), validate(schemas.profile.update), profiles.updateProfile);

router.route('/profiles/:id/location')
    .get(profiles.getLocation)
    .put(auth(AUTH.PRIVATE), validate(schemas.profile.location), profiles.updateLocation);

router.route('/profiles/:id/follow')
    .get(profiles.getProfileFollowers)
    .post(auth(AUTH.PRIVATE), profiles.followProfile)
    .delete(auth(AUTH.PRIVATE), profiles.unfollowProfile);


module.exports = router;