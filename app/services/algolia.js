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

  Promise.all([
    db(h.spe_profile({}).select('u.fake'))
      .select('*')
      .where('u.fake', 0)
      .then(profiles => {
        storage.profiles = profiles;
        client.deleteIndex('Users', err => {
          console.log(profiles);
          people.addObjects(profiles.filter(p => p.fullName && p.picture));
        });
      }),
    db(TABLES.PROJECTS + ' as p')
      .select('*')
      .innerJoin('categories', 'categories.id', 'p.category_id')
      .where('p.project_visibility', 1)
      .then(projects => {
        storage.projects = projects;
        client.deleteIndex('Projects', err => {
          project.addObjects(projects);
        });
      })
  ]).then(() =>
    client.deleteIndex('PAndP', err =>
      pandp.addObjects([...storage.profiles, ...storage.projects])
    )
  );
});
init();
//setInterval(init, 3600 * 24);
