const users = require('../controllers/users'),
    express = require('express'),
    passport = require('passport');

let router = express.Router();

router.param('user_id', function (req, res, next, user_id) {
    req.user_id = user_id;
    next();
});

router.route('/users')
	.post(users.createUser)
// 	.get(users.getUsers)

router.route('/users/:id/skills')
	.get(users.getUserSkills)
	// .post(users.addUserSkill)

module.exports = router