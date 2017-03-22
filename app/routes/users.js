const users = require('../controllers/users'),
    express = require('express'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');


let router = express.Router();

// router.param('id', validateParam(schemas.params.id));

router.route('/users')
    .post(users.createUser);
// 	.get(users.getUsers)

router.route('/users/:id/skills')
    .get(users.getUserSkills)
    .post(auth(AUTH.PRIVATE), users.addUserSkill)
    .delete(auth(AUTH.PRIVATE), users.removeUserSkill);

module.exports = router;