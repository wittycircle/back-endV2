/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';

const users = require('../controllers/users'),
    express = require('express'),
    router = express.Router();

router.route('/user/:id').get(users.getUser);

module.exports = router;