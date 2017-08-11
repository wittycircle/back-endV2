const express = require('express'),
		router = express.Router(),
		skills = require('../controllers/skills');

router.route('/skills')
	.get(skills.getSkillList)

router.route('/skills/categories')
	.get(skills.getSkillCategoriesList)
	.post(skills.getSkillByCategory);

module.exports = router
