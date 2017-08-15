const { db, TABLES } = require('./app/models/index');

const query = db.count('*' + ' as number').
select('s.id as s_id')
	.from(TABLES.USER_SKILLS + ' as us')
	.join(TABLES.SKILLS + ' as s', 's.id', 'us.skill_id')
	.groupBy('skill_id')
	.orderBy('number', 'desc')
	.then( r => {
		r.forEach(e => {
			db(TABLES.SKILLS)
			.where('id', e.s_id)
			.update('priority', e.number)
		});
		console.log('Migration Done!');
	});
