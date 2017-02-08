const users = require('../controllers/users'),
    express = require('express'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport');


let router = express.Router();

// router.param('id', validateParam(schemas.params.id));

router.route('/users')
	.post(users.createUser)
// 	.get(users.getUsers)

router.route('/users/:id/skills')
	.get(users.getUserSkills)
	.post(users.addUserSkill)
	.delete(users.removeUserSkill)

module.exports = router