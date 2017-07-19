const users = require('../controllers/users'),
	express = require('express'),
	{ validate, validateParam, schemas } = require('../middlewares/validation'),
	{ auth, AUTH } = require('../services/auth');

let router = express.Router();

// ------------------ Params ------------------
router.param('id', validateParam(schemas.params.id));
// ------------------ Params ------------------
router.route('/users/:username').get(users.fromUsername);

router
	.route('/users/:id/skills')
	.get(users.getUserSkills)
	.post(auth(AUTH.PRIVATE), users.addUserSkill)
	.delete(auth(AUTH.PRIVATE), users.removeUserSkill);

// ------------------ SHARE INVITE LINK ------------------
router.route('/users/:id/invite_link').get(users.getUserInvite);

// ------------------ PROJECTS ------------------
router.route('/users/:id/projects').get(users.getProjectsInvolved);

// ------------------ INTEREST ------------------
router
	.route('/users/:id/interests')
	.get(users.getInterests)
	.post(auth(AUTH.PRIVATE), users.addInterest)
	.delete(auth(AUTH.PRIVATE), users.removeInterest);

// ------------------ EXPERIENCES ------------------
router
	.route('/users/:id/experiences')
	.get(users.getExperiences)
	.post(auth(AUTH.PRIVATE), users.addExperience)
	.delete(auth(AUTH.PRIVATE), users.removeExperience)
	.put(auth(AUTH.PRIVATE), users.updateExperience);

//---------------- invited google -------------------
router.route('/users/:id/social_invite').get(users.socialInvite);

module.exports = router;
