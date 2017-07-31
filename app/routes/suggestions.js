const express = require('express'),
  router = express.Router(),
  suggestions = require('../controllers/suggestions'),
  { validate, validateParam, schemas } = require('../middlewares/validation'),
  { auth, AUTH } = require('../services/auth');

/*
body : {
projectId: Number
}
*/
router
  .route('/getMatchingProfiles')
  .post(/*auth(AUTH.PUBLIC),*/ suggestions.matchProfilesToProject);

/*
empty body, will use the req.user.id
 [since the person must be logged in]
*/
router
  .route('/getMatchingProjects')
  .post(/*auth(AUTH.PUBLIC),*/ suggestions.matchProjectsToProfile);

/*
body : {
projectId : Number,
profiles: [Number]
}
*/
router
  .route('/suggestProfiles')
  .post(/*auth(AUTH.PUBLIC),*/ suggestions.matchProjectsToProfile);

/*
  body : {
  userId : Number,
  projects: [Number]
  }
  */
router
  .route('/suggestProjects')
  .post(/*auth(AUTH.PUBLIC),*/ suggestions.matchProfilesToProject);

//  -------- Less useful routes --------

module.exports = router;
