const { db, TABLES } = require('./index');

exports.getFromProjectNetwork = (need, cond) => {
	return db(TABLES.PROJECT_NETWORK)
		.select(need)
		.where(cond)
}

exports.updateProjectNetwork = (info, cond) => {
	return db(TABLES.PROJECT_NETWORK)
		.update(info)
		.where(cond)
}

