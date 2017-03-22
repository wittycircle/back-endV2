const express = require('express'),
    router = express.Router(),
    discussions = require('../controllers/discussions'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    sd = schemas.discussion,
    {auth, AUTH} = require('../services/auth');

router.param('id', validateParam(schemas.params.id));
router.param('discussion_id', validateParam(schemas.params.id));
router.param('reply_id', validateParam(schemas.params.id));

router.route('/discussions/:discussion_id')
    .put(auth(AUTH.PRIVATE), validate(sd.discussion), discussions.updateProjectDiscussion)
    .delete(auth(AUTH.PRIVATE), discussions.removeProjectDiscussion);

router.route('/discussions/:discussion_id/like')
	.post(auth(AUTH.PRIVATE), discussions.likeDiscussion)
	.delete(auth(AUTH.PRIVATE), discussions.unlikeDiscussion);

router.route('/discussions/:discussion_id/replies')
    .get(discussions.getDiscussionReplies)
	.post(auth(AUTH.PRIVATE), validate(sd.reply), discussions.replyDiscussion);

module.exports = router;