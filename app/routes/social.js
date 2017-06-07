/**
 * Created by rdantzer on 03/06/17.
 */

const express = require('express');
const router = express.Router();
const social = require('../controllers/social');
const { auth, AUTH } = require('../services/auth');

router.route('/social/linkedin')
    .post(auth(AUTH.PRIVATE), social.updateProfileFromLinkedin);

router.route('/social/google')
    .post(auth(AUTH.PRIVATE), social.InviteFriendsFromGoogle);


module.exports = router;
