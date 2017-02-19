const express = require('express'),
    router = express.Router(),
    projects = require('../controllers/projects'),
    search = require('../controllers/search'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport');

router.param('id', validateParam(schemas.params.id));
router.param('opening_id', validateParam(schemas.params.id));
router.param('discussion_id', validateParam(schemas.params.id));

router.route('/projects')
    .get()
    .post(passport.authenticate('bearer'));

router.route('/projects/search')
    .post(search.searchProfile);

router.route('/project/:id')
    .get()
    .put(passport.authenticate('bearer'))
    .delete(passport.authenticate('bearer'));

router.route('/projects/:id/upvote')
    .get()
    .post(passport.authenticate('bearer'))
    .delete(passport.authenticate('bearer'));

router.route('/projects/:id/openings')
    .get()
    .post(passport.authenticate('bearer'));

router.route('/projects/:id/discussions')
    .get(projects.getProjectDiscussion)
    .post(passport.authenticate('bearer'), validate(schemas.project.discussion), projects.createProjectDiscussion);

router.route('/projects/:id/up')
    .get(projects.getProjectUpvotes)
    .post(passport.authenticate('bearer'), projects.upvoteProject)
    .delete(passport.authenticate('bearer'), projects.unupvoteProject);

module.exports = router;
