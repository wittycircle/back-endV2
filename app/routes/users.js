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
//GET

router.route('/users')
	.get(users.getUsers);

router.route('/user/:user_id')
    .get(users.getUser);

router.route('/share/:user_id')
	.get(users.getUserShare);

router.route('/user/valid/:token')
	.get(users.getUsersValidateMail)

router.route('/user/checkLog')
	.get(users.checkFirstLog)

//PUT
router.route('/share/:user_id')
	.put(users.updateUserShare)

router.route('/user/checkLog/update')
	.put(users.updateFirstLog)

//POST
router.route('/user/valid/:token')
	.post(users.ValidateAccount)

router.route('/user/valid/:token')
	.post(users.ValidateAccount)

module.exports = router;

