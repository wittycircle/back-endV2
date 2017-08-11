const   skill = require('../models/skills');

exports.getSkillList = (req, res, next) => {
	skill.getList()
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Something happened'])
			}
			else{
				res.send({skills: r})
			}
		})
		.catch(err => next(err))
};

exports.getSkillCategoriesList = (req, res, next) => {
	skill.getCategoryList()
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Something happened'])
			}
			else{
				res.send({categories: r})
			}
		})
		.catch(err => next(err))
};

exports.getSkillByCategory = (req, res, next) => {
	skill.getSkillsByCategoryId(req.body.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Something happened'])
			}
			else{
				res.send({skills: r})
			}
		})
};
