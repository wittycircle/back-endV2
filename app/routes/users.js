/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';

const users = require('../controllers/users'),
    express = require('express'),
    passport = require('passport');

let router = express.Router();

router.param('user_id', function (req, res, next, user_id) {
    req.user_id = user_id;
    next();
});

//maybe add other route.param for username and stuff
//add auth functions to [some] routes when they'll be done

router.route('/users')
	.get(users.getUsers)
	.post(users.createUser)

router.route('/user/:id')
	.get(users.getUser)

router.route('/user/card/profiles')
	.get(users.getCardProfile)

router.route('/user/card/profiles/home')
	.post(users.getCardProfileHome)

router.route('/user_email/:email')
	.get(users.getUserByEmail)

router.route('/username/:username')
	.get(users.getUserbyUsername)

router.route('/profiles/view/:username')
	.put(users.updateProfileView)

router.route('/users/search/:search') //Still used?
	.get(users.searchUser)

router.route('/user/checkLog/:user_id')
	.get(users.checkFirstLog)

router.route('/user/checkLog/update/:user_id')
	.put(users.updateFirstLog)

router.route('/share/:user_id')
	.get(users.getUserShare)
	.put(users.updateUserShare);


// router.route('/user/:user_id') // Still used?
//     .get(users.getUser); // + hasAccess

router.route('/user/valid/:token')
	.get(users.getUsersValidateMail)
	.post(users.ValidateAccount) //(no sense to have this route, why parameter in post?)



router.route('/userId/:profile_id')
	.get(users.getUserFromProfile)

//profiles (could be moved to route/profile ?)

router.route('/profiles/:profile_id')
	.post(users.getProfile) // + hasAccess

router.route('/profileId/:user_id')
	.post(users.getProfileId)


module.exports = router;

