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

router.route('/users')
    .get(users.getUsers);

router.route('/user/:user_id')
    .get(users.getUser);

router.route('/share/:user_id')
	.get(users.getUserShare);

router.param('user_id', (req, res, next, user_id) => {
});

router.route('/users')
    .get()
    .post()
    .put();

router.route('/users/:user_id')
    .get()
    .post();

router.route('/users/:user_id/like')
    .get()
    .post()
    .delete();

router.route('/users/search')
    .post();





module.exports = router;