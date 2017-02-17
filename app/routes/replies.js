const express = require('express'),
    router = express.Router(),
    replies = require('../controllers/replies'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport');

router.param('reply_id', validateParam(schemas.params.id));

router.route('/replies/:reply_id')
	.put(passport.authenticate('bearer'), validate(schemas.replies.reply), replies.updateReplyDiscussion)
    .delete(passport.authenticate('bearer'), replies.removeReplyDiscussion);

router.route('/replies/:reply_id/like')
    .post(passport.authenticate('bearer'), validate(schemas.replies.reply));

module.exports = router;