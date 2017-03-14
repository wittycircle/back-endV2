const express = require('express'),
    router = express.Router(),
    search = require('../controllers/search'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport'),
    auth = (x) => passport.authenticate(x);

// router.route('/main/projects')
// 	.get(search.mainProjects)

// router.route('/main/profiles')
// 	.get(search.mainProfiles)
	
module.exports = router