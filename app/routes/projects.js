const express = require('express'),
    router = express.Router(),
    projects = require('../controllers/projects'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    search = require('../controllers/search'),
    passport = require('passport');

router.route('/projects/search')
    .post(search.searchProject)

router.param('id', validateParam(schemas.params.id));
router.param('opening_id', validateParam(schemas.params.id));
router.param('discussion_id', validateParam(schemas.params.id));

router.route('/projects')
    .get(projects.getProjects)
    .post(passport.authenticate('bearer'), validate(schemas.project.creation), projects.createProject);

router.route('/projects/:id')
    .get(projects.getProject)
    .delete(passport.authenticate('bearer'), projects.removeProject);

router.route('/projects/:id/openings')
    .get(projects.getProjectOpenings)
    .post(passport.authenticate('bearer'), validate(schemas.project.opening), projects.createOpening);

router.route('/projects/:id/discussions')
    .get(projects.getProjectDiscussion)
    .post(passport.authenticate('bearer'), validate(schemas.project.discussion), projects.createProjectDiscussion);

router.route('/projects/:id/like')
    .get(projects.getProjectLikes)
    .post(passport.authenticate('bearer'), projects.likeProject)
    .delete(passport.authenticate('bearer'), projects.unlikeProject);


module.exports = router;
