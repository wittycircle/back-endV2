const express = require('express'),
    router = express.Router(),
    projects = require('../controllers/projects'),
    {validate, validateParam, schemas} = require('../middlewares/validation');

router.param('id', validateParam(schemas.params.id));

router.route('/projects/:id/like')
	.get(projects.getProjectLikes)
	.post(projects.likeProject)
	.delete(projects.unlikeProject)

 module.exports = router
