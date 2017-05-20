const express = require('express'),
  router = express.Router(),
  projects = require('../controllers/projects'),
  search = require('../controllers/search'),
  { validate, validateParam, schemas } = require('../middlewares/validation'),
  { auth, AUTH } = require('../services/auth');

router.param('id', validateParam(schemas.params.id));
router.param('opening_id', validateParam(schemas.params.id));
router.param('discussion_id', validateParam(schemas.params.id));

router
  .route('/projects')
  .post(
    auth(AUTH.PRIVATE),
    validate(schemas.project.creation),
    projects.createProject
  );

router
  .route('/projects/search')
  .post(
    auth(AUTH.PUBLIC),
    validate(schemas.search.project),
    search.searchProject
  );

router
  .route('/projects/:id')
  .get(auth(AUTH.PUBLIC), projects.getProject)
  .put(
    auth(AUTH.PRIVATE),
    validate(schemas.project.update),
    projects.updateProject
  )
  .delete(auth(AUTH.PRIVATE), projects.removeProject);

router
  .route('/projects/:id/openings')
  .get(projects.getProjectOpenings)
  .post(
    auth(AUTH.PRIVATE),
    validate(schemas.project.opening),
    projects.createOpening
  );

router
  .route('/projects/:id/discussions')
  .get(projects.getProjectDiscussion)
  .post(
    auth(AUTH.PRIVATE),
    validate(schemas.project.discussion),
    projects.createProjectDiscussion
  );

router
  .route('/projects/:id/up')
  .get(projects.getProjectLikes)
  .post(auth(AUTH.PRIVATE), projects.likeProject)
  .delete(auth(AUTH.PRIVATE), projects.unlikeProject);

router
  .route('/projects/:id/invite')
  .post(auth(AUTH.PRIVATE), projects.inviteTeam)
  .delete(auth(AUTH.PRIVATE), projects.deleteInvite) //id will be project_members id and not project_id
  .get(projects.getInvite);

module.exports = router;
