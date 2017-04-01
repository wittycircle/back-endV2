const users = require('../controllers/users'),
    express = require('express'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');


let router = express.Router();


router.route('/users')
    .post(users.createUser);

// ------------------ Params ------------------
router.param('id', validateParam(schemas.params.id));
// ------------------ Params ------------------
router.route('/users/:username')
	.get(users.fromUsername)


router.route('/users/:id/skills')
    .get(users.getUserSkills)
    .post(auth(AUTH.PRIVATE), users.addUserSkill)
    .delete(auth(AUTH.PRIVATE), users.removeUserSkill);

// ------------------ PROJECTS ------------------
router.route('/users/:id/projects')
	.get(users.getProjectsInvolved)

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
	.put(auth(AUTH.PRIVATE), users.updateExperience)


//todo : change and
module.exports = router;