/**
 * Created by rdantzer on 11/04/17.
 */

'use strict';

const config = require('../private').algolia,
    algoliasearch = require('algoliasearch'),
    {db, TABLES} = require('../models/index'),
    h = require('../models/helper');

const init = module.exports.initPeopleAndProjectIndex = () => {
    const client = algoliasearch(config.app, config.key);

    let people = client.initIndex('Users'),
        project = client.initIndex('Projects'),
        pandp = client.initIndex('PAndP');

    let storage = {};

    Promise.all([
        db(h.spe_profile({}).select('p.fake'))
            .select('*')
            .where('p.fake', 0)
            .then(profiles => {
                storage.profiles = profiles;
                client.deleteIndex('Users', (err) => {
                    people.addObjects(profiles)
                })
            }),
        db(TABLES.PROJECTS + ' as p')
            .select('*')
            .innerJoin('categories', 'categories.id', 'p.category_id')
            .where('p.project_visibility', 1)
            .then(projects => {
                storage.projects = projects;
                client.deleteIndex('Projects', (err) => {
                    project.addObjects(projects)
                })
            })])
        .then(() => client.deleteIndex('PAndP', err => pandp.addObjects([...storage.profiles, ...storage.projects])))
};
init();
//setInterval(init, 3600 * 24);
