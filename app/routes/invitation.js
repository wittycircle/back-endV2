const express = require('express'),
    router = express.Router(),
    invitation = require('../controllers/invitation'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH } = require('../services/auth');

router.route('/invite')
	.post(auth(AUTH.PRIVATE), invitation.addInvitation)

router.param('invite_id', validateParam(schemas.params.name));

router.route('/invite/:invite_id')
	.get(invitation.getInvitation)
	.post(invitation.fromUser)

	
module.exports = router