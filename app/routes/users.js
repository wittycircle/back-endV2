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

module.exports = router;