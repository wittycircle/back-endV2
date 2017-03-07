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
