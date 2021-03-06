'use strict';

const express = require('express'),
	router = express.Router(),
	panel = require('../controllers/admin_panel'),
	search = require('../controllers/search'),
	{ validate, validateParam, schemas } = require('../middlewares/validation'),
	{ auth, AUTH } = require('../services/auth');

router
	.route('/admin_panel/projects')
	.get(auth(AUTH.PRIVATE), panel.projectsInvite)
	.post(auth(AUTH.PRIVATE), panel.inviteProjects);

router
	.route('/admin_panel/selected/projects/profiles/:type')
	.get(panel.getPPAddByAdmin)
	.post(auth(AUTH.ADMIN), panel.addPPByAdmin)
	.delete(auth(AUTH.ADMIN), panel.removePPAddByAdmin);

// router
// 	.route('/admin_panel/admin/add/profiles/:username')
// 	.get(auth(AUTH.ADMIN), panel.getProfilesAddByAdmin)
// 	.post(auth(AUTH.ADMIN), panel.addProfilesByAdmin)
// 	.delete(auth(AUTH.ADMIN), panel.removeProfilesAddByAdmin);

router.param('token', validateParam(schemas.params.name));

router
	.route('/admin_panel/projects/:token')
	.post(auth(AUTH.PRIVATE), panel.updateCreator);

router
	.route('/admin_panel/uc/ambassadors')
	.get(auth(AUTH.PRIVATE), panel.getAmbassadors)
	.post(auth(AUTH.PRIVATE), panel.setAmbassador)
	.put(auth(AUTH.PRIVATE), panel.removeAmbassador)

router
	.route('/admin_panel/statistics/projects')
	.get(auth(AUTH.PRIVATE), panel.getProjects)

router
	.route('/admin_panel/statistics/users')
	.get(auth(AUTH.PRIVATE), panel.getUsers)


module.exports = router;
