const express = require('express'),
    router = express.Router(),
    discussions = require('../controllers/discussions'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport');

router.param('id', validateParam(schemas.params.id));
router.param('discussion_id', validateParam(schemas.params.id));

router.route('/discussions/:discussion_id')
    .put(passport.authenticate('bearer'), validate(schemas.project.discussion), discussions.updateProjectDiscussion)
    .delete(passport.authenticate('bearer'), discussions.removeProjectDiscussion);

module.exports = router    