const express = require('express'),
    router = express.Router(),
    replies = require('../controllers/replies'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');

router.param('reply_id', validateParam(schemas.params.id));

router.route('/replies/:reply_id')
	.put(auth(AUTH.PRIVATE), validate(schemas.replies.reply), replies.updateReplyDiscussion)
    .delete(auth(AUTH.PRIVATE), replies.removeReplyDiscussion)

router.route('/replies/:reply_id/like')
	.post(auth(AUTH.PRIVATE), replies.likeReply)
    .delete(auth(AUTH.PRIVATE), replies.unlikeReply)
	
module.exports = router