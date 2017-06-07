const { db, TABLES } = require('./index');
const _ = condition => (a, b) => db.raw(condition ? a : b);
const { escape } = require('lodash');

exports.getList = () => {
	return db.select('*').from(TABLES.SKILLS)
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