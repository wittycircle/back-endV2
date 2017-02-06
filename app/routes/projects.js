const express = require('express'),
    router = express.Router(),
    projects = require('../controllers/projects'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport');

router.param('id', validateParam(schemas.params.id));

router.route('/projects/:id/like')
    .get(projects.getProjectLikes)
    .post(passport.authenticate('bearer'), projects.likeProject)
    .delete(passport.authenticate('bearer'), projects.unlikeProject);

module.exports = router;
