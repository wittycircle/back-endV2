const { db, TABLES } = require('./index');
const _ = condition => (a, b) => db.raw(condition ? a : b);
const __ =require('lodash');
const { escape } = require('lodash');

exports.getList = () => {
	return db.select('*').from(TABLES.SKILLS)
};

exports.getCategoryList = () => {
	return db.select('*').from(TABLES.SUB_SKILLS)
};

exports.getId = (skill, trueCompare = false) => db(TABLES.SKILLS)
	.select('id')
	.where(_(trueCompare)(`name = '${escape(skill)}'`, `name LIKE '%${escape(skill)}%'`));

exports.addSkill = skill => this.getId(skill, true)
	.then(([id]) => {
		if (id === undefined) {
			return db(TABLES.SKILLS)
				.insert({
					name: skill
				})
		}
		return [id.id];
	});

exports.getSkillsByCategoryId = (id) => {
	return db
		.select('s.id', 'name')
		.from(TABLES.SKILL_CAT + ' as sc')
		.join(TABLES.SKILLS + ' as s', 's.id', '=', 'sc.skill_id')
		.where('sub_id', id)
}