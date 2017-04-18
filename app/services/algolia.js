/**
 * Created by rdantzer on 11/04/17.
 */

'use strict';

const config = require('../private').algolia,
    algoliasearch = require('algoliasearch'),
    {db, TABLES} = require('../models/index'),
    h = require('../models/helper');

module.exports = () => {
    const client = algoliasearch(config.app, config.key);

    let people = client.initIndex('Users'),
        project = client.initIndex('Projects');

    db(h.spe_profile({}).select('p.fake'))
        .select('*')
        .where('p.fake', 0)
        .then(profiles => {
            client.deleteIndex('Users', (err) => {
                people.addObjects(profiles)
            })
        });

    db(TABLES.PROJECTS + ' as p')
        .select('*')
        .innerJoin('categories', 'categories.id', 'projects.category_id')
        .then(projects => {
            console.log("ALGOLIA")
            console.log(projects)
            client.deleteIndex('Projects', (err) => {
                project.addObjects(projects)
            })
        });
};