const express = require('express'),
  router = express.Router(),
  suggestions = require('../controllers/suggestions'),
  { validate, validateParam, schemas } = require('../middlewares/validation'),
  { auth, AUTH } = require('../services/auth');

/*
Get matching profiles from projectId
[projects must have openings with opening_tags]
  body : {
  projectId: Number
  }
*/
router
  .route('/matchProfilesToProject')
  .post(/*auth(AUTH.PUBLIC),*/ suggestions.matchProfilesToProject);

/*
Get matching projects from user
[user must have skills, and Projects must have openings in those]

empty body, will use the req.user.id
 [since the person must be logged in]
*/

router
  .route('/matchProjectsToProfile')
  .post(/*auth(AUTH.PUBLIC),*/ suggestions.matchProjectsToProfile);

/*

Will insert user_id [aka profiles] and associated projectId
in mySql table `suggested_profiles` to keep track and avoid
suggesting twice the same person.

** //see at the end of file for more infos

body : {
projectId : Number,
profiles: [Number]
}
*/
router
  .route('/suggestProfiles')
  .post(/*auth(AUTH.PUBLIC),*/ suggestions.suggestProfiles);

/*
  body : {
  userId : Number,
  projects: [Number]
  }
  */

router
  .route('/suggestProjects')
  .post(/*auth(AUTH.PUBLIC),*/ suggestions.suggestProjects);

//  -------- Less useful / [useless (?)] routes --------

module.exports = router;

/*

** [suggestProfile/suggestProject]
to call manually, when you'll do the emails,
and if/when you use the matchProfilesToProject/matchProjectsToProfile

nb: I'd suggest calling this route only for the mails.
As for the suggestions on the website (if any are made),
to call this only if the user went to look at the suggested profile/project]

Meaning, if he sees suggestions, and simply refresh,
to keep the same suggestions, until he checks them out

*/
