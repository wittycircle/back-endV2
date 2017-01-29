const profiles = require('../controllers/profiles'),
    express = require('express');

let router = express.Router();

router.route('/profile/picture')
	.all((req, res, next) =>{
		req.user = {
			moderator: 0
		};
		next()
	})
	.put(profiles.updateProfilePicture)
	
router.route('profile/location')
	.put(profiles.updateProfileLocation)

module.exports = router