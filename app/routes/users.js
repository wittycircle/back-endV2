const users = require('../controllers/users'),
    express = require('express'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');


let router = express.Router();

// router.param('id', validateParam(schemas.params.id));

router.route('/users')
    .post(users.createUser);

router.route('/users/:id/skills')
    .get(users.getUserSkills)
    .post(auth(AUTH.PRIVATE), users.addUserSkill)
    .delete(auth(AUTH.PRIVATE), users.removeUserSkill);

// ------------------ PROJECTS ------------------
router.route('/users/:id/projects')
	.get(users.getProjectsInvolved)
// -> get project where user involved in

// router.route('/users/:id/projects/follow')
// //  -> get all projects that user follow

// ------------------ INTEREST ------------------
router.route('/users/:id/interests')
	.get(users.getInterests)
	.post(auth(AUTH.PRIVATE), users.addInterest)
	.delete(auth(AUTH.PRIVATE), users.removeInterest)

// ------------------ EXPERIENCES ------------------
router.route('/users/:id/experiences')
	.get(users.getExperiences)
	.post(auth(AUTH.PRIVATE), users.addExperience)
	.delete(auth(AUTH.PRIVATE), users.removeExperience)
// -> get interest from user
//  -> post interest user

router.route('/users/:id/experiences/:interest_id')
// -> delete interest from user

module.exports = router;