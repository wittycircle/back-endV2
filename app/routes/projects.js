const express = require('express'),
    router = express.Router(),
    projects = require('../controllers/projects'),
    search = require('../controllers/search'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport'),
    auth = (x) => passport.authenticate(x),
    { midauth, AUTH } = require('../services/auth');

router.param('id', validateParam(schemas.params.id));
router.param('opening_id', validateParam(schemas.params.id));
router.param('discussion_id', validateParam(schemas.params.id));

router.route('/projects')
    .get(projects.getProjects)
    .post(auth('bearer'), validate(schemas.project.creation), projects.createProject);

router.route('/projects/search')
    .post(midauth(AUTH.PUBLIC), validate(schemas.search.project), search.searchProject)
    
router.route('/projects/:id')
    .get(projects.getProject)
    .post(auth('bearer'), validate(schemas.project.update), projects.updateProject)
    .delete(auth('bearer'), projects.removeProject);

router.route('/projects/:id/openings')
    .get(projects.getProjectOpenings)
    .post(auth('bearer'), validate(schemas.project.opening), projects.createOpening);

router.route('/projects/:id/discussions')
    .get(projects.getProjectDiscussion)
    .post(auth('bearer'), validate(schemas.project.discussion), projects.createProjectDiscussion);

router.route('/projects/:id/up')
    .get(projects.getProjectLikes)
    .post(auth('bearer'), projects.likeProject)
    .delete(auth('bearer'), projects.unlikeProject);
    


module.exports = router;
