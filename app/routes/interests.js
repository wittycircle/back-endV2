const express = require('express'),
		router = express.Router(),
		interests = require('../controllers/interests');

router.route('/interests')
		.get(interests.getList)

module.exports = router;
