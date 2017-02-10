const express = require('express'),
    router = express.Router(),
    discussions = require('../controllers/discussions'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    sd = schemas.discussion
    passport = require('passport');

router.param('id', validateParam(schemas.params.id));
router.param('discussion_id', validateParam(schemas.params.id));

router.route('/discussions/:discussion_id')
    .put(passport.authenticate('bearer'), validate(sd.discussion), discussions.updateProjectDiscussion)
    .delete(passport.authenticate('bearer'), discussions.removeProjectDiscussion);

router.route('/discussion/:discussion_id/like')
	.post(passport.authenticate('bearer'), discussions.likeDiscussion)
	.delete(passport.authenticate('bearer'), discussions.unlikeDiscussion)

router.route('/discussion/discussion_id/replies')
	.post(passport.authenticate('bearer'), validate(sd.reply), discussions.replyDiscussion)
	.put(passport.authenticate('bearer'), validate(sd.reply), discussions.updateReplyDiscussion)

module.exports = router    