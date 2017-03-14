const express = require('express'),
    router = express.Router(),
    skills = require('../controllers/skills');

router.route('/skills')
    .get(skills.getSkillList)

module.exports = router
