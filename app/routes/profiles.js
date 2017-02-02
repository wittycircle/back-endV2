/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router(),
    profiles = require('../controllers/profiles'),
    {validate, validateParam, schemas} = require('../middlewares/validation');

router
    .route('/profiles')
    .get(profiles.getProfiles);

router.param('id', validateParam(schemas.params.id));

router
    .route('/profiles/:id')
    .get(profiles.getProfile)
    .put(validate(schemas.profile.update), profiles.updateProfile);

// router
//     .route('/profiles/:id/like')
// .get(profiles.likeProfile)
// .post(profiles.getProfileLike)
// .delete(profiles.deleteProfile);

// router
//     .route('/profiles/:id/location')
//     .get(profiles.getLocation)
//     .put(profiles.updateLocation);

module.exports = router;