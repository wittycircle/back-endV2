const express = require('express'),
    router = express.Router(),
    openings = require('../controllers/openings'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport'),
    auth = (x) => passport.authenticate(x);

router.param('opening_id', validateParam(schemas.params.id));

router.route('/openings/:opening_id')
	.post(auth('bearer'), openings.updateOpening)
	.delete(auth('bearer'), openings.deleteOpening)
	
module.exports = router;
