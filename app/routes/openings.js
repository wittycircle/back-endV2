const express = require('express'),
    router = express.Router(),
    openings = require('../controllers/openings'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');

router.param('opening_id', validateParam(schemas.params.id));

router.route('/openings/:opening_id')
	.post(auth(AUTH.PRIVATE), openings.updateOpening)
	.delete(auth(AUTH.PRIVATE), openings.deleteOpening)
	
module.exports = router;
