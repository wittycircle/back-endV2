const { db, TABLES } = require('./index'),
	_ = require('lodash'),
	h = require('./helper');

exports.updateOpening = (id, data, tags) => {
	return h.exist(TABLES.PROJECT_OPENINGS, id).then(r => {
		if (!r.length) {
			throw 'Could not update opening';
		} else {
			return Promise.all([
				db(TABLES.PROJECT_OPENINGS).update(data).where({ id }),
				db(TABLES.SKILLS).select('id as skill_id').whereIn('name', tags)
			]).then(([notNeeded, skill_ids]) => {
				skill_ids.forEach(e => {
					e.opening_id = id;
				});
				return db(TABLES.OPENING_TAGS)
					.delete()
					.where('opening_id', id)
					.then(() => db(TABLES.OPENING_TAGS).insert(skill_ids));
			});
		}
	});
};

exports.deleteOpening = id => {
	return h.exist(TABLES.PROJECT_OPENINGS, id).then(r => {
		if (!r.length) {
			throw 'Could not remove opening';
		} else {
			return db(TABLES.PROJECT_OPENINGS).del().where('id', id);
		}
	});
};
