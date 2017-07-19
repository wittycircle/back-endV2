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

router.param('token', validateParam(schemas.params.name));

router
	.route('/admin_panel/projects/:token')
	.post(auth(AUTH.PRIVATE), panel.updateCreator);

module.exports = router;
