/**
 * Created by rdantzer on 11/04/17.
 */

'use strict';

const config = require('../private').algolia,
    algoliasearch = require('algoliasearch'),
    {db, TABLES} = require('../models/index');

module.exports = () => {
    const client = algoliasearch(config.app, config.key);

    let people = client.initIndex('Users'),
        project = client.initIndex('Projects');

    db(TABLES.PROFILES)
        .select('*')
        .where('fake', 0)
        .then(profiles => {
            client.deleteIndex('Users', (err) => {
                people.addObjects(profiles)
            })
        });

    db(TABLES.PROJECTS)
        .select('*')
        .then(projects => {
            client.deleteIndex('Projects', (err) => {
                project.addObjects(projects)
            })
        });
};