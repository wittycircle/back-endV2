const express = require('express'),
		router = express.Router(),
		statistics = require('../controllers/statistics'),
		{validate, validateParam, schemas} = require('../middlewares/validation'),
		{auth, AUTH} = require('../services/auth');

// ------------------ Params ------------------
router.param('user_id', validateParam(schemas.params.id));
router.param('name', validateParam(schemas.params.name));
// ------------------ Params ------------------

router.route('/statistics/network/:name/allprofiles')
		.get(statistics.allProfiles);

router.route('/statistics/network/:name/allprojects')
		.get(statistics.allProjects)
// ------------------ NETWORK PROFILES ------------------


router.route('/statistics/network/:name/profiles') //count + images
		.get(statistics.networkProfiles);

router.route('/statistics/network/:name/location') //where they are
		.get(statistics.networkLocation);

router.route('/statistics/network/:name/skills')  //what they do
		.get(statistics.networkProfileSkills);

router.route('/statistics/network/:name/interests')  // what they like
		.get(statistics.networkInterests);

//recent activity : socket

// ------------------ NETWORK PROJECTS ------------------
router.route('/statistics/network/:name/projects') // count
		.get(statistics.networkProjects);

router.route('/statistics/network/:name/projects/categories') // what they are about
		.get(statistics.networkProjectAbout);

router.route('/statistics/network/:name/projects/needs') // what they need
		.get(statistics.networkProjectNeeds);

router.route('/statistics/network/:name/projects/follow') // most upvoted
		.get(statistics.networkProjectFollow);

// recent activity: socket


// ------------------ PROFILES STATS ------------------

router.route('/statistics/profiles/:profile_id')
		.get(statistics.infoProfiles)


module.exports = router;