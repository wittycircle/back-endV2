/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';

const users = require('../controllers/users'),
    express = require('express');

let router = express.Router();

router.param('user_id', function (req, res, next, user_id) {
    req.user_id = user_id;
    next();
});

//add auth functions to [some] routes when they'll be done

//Share
router.route('/users')
	.get(users.getUsers);

router.route('/user/checkLog/:user_id')
	.get(users.checkFirstLog)

router.route('/user/checkLog/update/:user_id')
	.put(users.updateFirstLog)

router.route('/share/:user_id')
	.get(users.getUserShare)
	.put(users.updateUserShare);


// router.route('/user/:user_id')
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


module.exports = router
//=======================
// Rest route example
//=======================

// router.param('user_id', (req, res, next, user_id) => {
// });

// router.route('/users')
//     .get()
//     .post()
//     .put();

// router.route('/users/:user_id')
//     .get()
//     .post();

// router.route('/users/:user_id/like')
//     .get()
//     .post()
//     .delete();

// router.route('/users/search')
//     .post();


