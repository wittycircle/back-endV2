/**
 * Created by rdantzer on 11/04/17.
 */

'use strict';

const config = require('../private').algolia,
	algoliasearch = require('algoliasearch'),
	{ db, TABLES } = require('../models/index'),
	h = require('../models/helper');

const init = (module.exports.initPeopleAndProjectIndex = () => {
	const client = algoliasearch(config.app, config.key);

	let people = client.initIndex('Users'),
		project = client.initIndex('Projects'),
		pandp = client.initIndex('PAndP');

	let storage = {};

	const profiles = db.select(
			'p.first_name',
			'p.last_name',
			db.raw('CONCAT(p.first_name, " ", p.last_name) as fullName'),
			'p.picture',
			'p.about',
			'p.description',
			'loc.city',
			'loc.state',
			'loc.country',
			'u.username',
			'u.invite_link',
			'u.fake'
		)
		.from(TABLES.USERS + ' as u')
		.join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
		.where('u.fake', 0)
		.andWhereRaw("u.email not like '%@witty.com%'")
		.havingRaw('p.picture is not null AND p.picture != "" AND fullName is not null AND fullName != ""')
		.orderBy('u.id');

	const projects = db.select(
			'pr.id',
			'pr.public_id',
			'pr.status',
			'pr.title',
			'ct.name as name',
			'pr.description',
			'pr.picture',
			'pr.about',
			'pr.logo',
			'pr.project_visibility',
			'pr.1st_description',
			'pr.2nd_description'
		)
		.from(TABLES.PROJECTS + ' as pr')
		.join(TABLES.CATEGORIES + ' as ct', 'ct.id', 'pr.category_id')
		.where('pr.project_visibility', 1)
		.orderBy('id')

	Promise.all([profiles, projects])
		.then((r) => {
			client.deleteIndex('Users', err => {
				people.addObjects(r[0]);
				console.log('Add users done !');
			});
			client.deleteIndex('Projects', err => {
				project.addObjects(r[1]);
				console.log('Add projects done !');
			});
			client.deleteIndex('PAndP', err => {
				pandp.addObjects([...r[1], ...r[0]]);
				console.log('Add users and projects done !');
			});
		})
});

const runTime = () => {
    init();
    setInterval(init, 1000 * 3600 * 12);
    console.log('Running runTime !');
};

runTime();

