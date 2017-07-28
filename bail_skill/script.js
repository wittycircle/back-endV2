const utils = require('util');
const _ = require('lodash');
const Promise = require('bluebird');
//TODO
// drop fields from skills, delete * from table instead of dropping it
const sqlColorize = require('../app/middlewares/debug/colors');
const { db, TABLES } = require('../app/models/index');
const h = require('../app/models/helper');
// db.on('query', query => {
//   console.log(sqlColorize(query));
// });

const print = (r, name = 'Next Thing') =>
  console.log(
    `${name}\n`,
    // utils.inspect(r, { colors: true, depth: null, maxArrayLength: null })
    utils.inspect(r, { depth: null, maxArrayLength: null })
  );
const createSkills = db.schema.createTableIfNotExists('skills', function(t) {
  t.increments();
  t.string('name').notNullable();
  t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
});
const createSub = db.schema.createTableIfNotExists('sub_skills', function(t) {
  t.increments();
  t.string('name').notNullable();
  t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
});
const deleteTable = name =>
  db.schema.hasTable(name).then(function(exists) {
    if (exists) return db.schema.dropTable(name).return();
  });

const delete_tables = () => {
  return Promise.all([
    deleteTable('skill_categories'),
    deleteTable('sub_skills')
  ]);
};
const create_tables = () => {
  return Promise.all([
    db.schema.hasTable('sub_skills').then(function(exists) {
      if (!exists) {
        console.log('DOES NOT EXIST');
        return createSub;
      } else {
        console.log('TABLE DOES NOT EXIST');
        return db.schema.dropTable('sub_skills').then(() => createSub);
      }
    }),
    db.schema.hasTable('skills').then(function(exists) {
      if (!exists) {
        console.log('SKILL DOES NOT EXIST');
        return createSkills;
      } else {
        console.log('SKILL  EXIST');
        return db('skills')
          .del()
          .then(() => db.raw('alter table skills AUTO_INCREMENT = 1'));
        // return db.schema.dropTable('skills').then(() => createSkills);
      }
    })
  ]);
};
const create_relation_tables = () => {
  const createSkillCat = db.schema.createTableIfNotExists(
    'skill_categories',
    function(t) {
      t.increments();
      t.integer('skill_id').unsigned().notNullable();
      t.integer('sub_id').unsigned().notNullable();
      t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
      t.charset('utf8');
      t.foreign('skill_id').references('skills.id').onDelete('cascade');
      t.foreign('sub_id').references('sub_skills.id').onDelete('cascade');
    }
  );
  return db.schema.hasTable('skill_categories').then(function(exists) {
    if (!exists) {
      console.log('CREATIN SKILL CAT');
      return createSkillCat;
    } else {
      console.log('DROPPIN SKILL CAT');
      return db.schema.dropTable('skill_categories').then(() => createSkillCat);
    }
  });
};
const insert_data = (skills, sub_skills, relations) => {
  console.log('SHOULD INSERT THE DATA ', skills.length);
  return Promise.all([
    db.batchInsert('skills', skills),
    db.batchInsert('sub_skills', sub_skills),
    db.batchInsert('skill_categories', relations)
  ]);
};

const skills = require('./newSkills');
const subSkills = require('./subSkills');
const relations = require('./relations');

delete_tables()
  .then(() => create_tables())
  .then(console.log('TABLES CREATED'))
  .then(() => create_relation_tables())
  .then(console.log('Done creating tables, will now import data'))
  .then(() => insert_data(skills, subSkills, relations))
  .then(() => console.log('FIRST BATCH INSERTED'))
  .then(() => {
    console.log('All done');
    process.exit(1);
  });
/*
let lefile = require('./lesskillsainserer.js').filter(
  e => e.categories[0] !== ''
);
const sub_skills = require('./new_category_skill.js').map(e => e.subcategory);
const skills = require('./newSkills.js');

// const removeDuplicate = (arr, key, value, nkey = key, nvalue = value) => {
//   const bail = arr.reduce((a, b) => Object.assign(a, { [b[key]]: b[value] }));
//   return Object.keys(bail).map(key => ({
//     [nkey]: key,
//     [nvalue]: bail[key]
//   }));
// };
// lefile = _.uniqBy(lefile, 'name');
const names = [...new Set(lefile.map(e => _.capitalize(e.name)).sort())];
Promise.all(
  names.map((e, index) => {
    return db('skills')
      .first(
        'id',
        'name',
        db.raw(
          `"${lefile.find(el => _.capitalize(el.name) === e).categories}" as cat`
        )
      )
      .where('name', e);
  })
).then(r => {
  r = r.filter(e => e !== undefined);
  let skills = r.map(e => ({ name: e.name, id: e.id }));
  const subSkills = sub_skills.map(e => ({ name: e }));
  let relations = r
    .map(e => {
      // console.log(e.id, e.name, e.cat);
      return e.cat.split(',').map(d => ({ sub_id: parseInt(d), skill_id: e.id }));
    })
    .reduce((a, b) => a.concat(b), []);
  print(relations, 'module.exports = '); //relation.js
  // print(skills, 'module.exports = '); //newSkills.js
  // print(subSkills, 'module.exports = '); // subSkills.js
  // console.log(skills.length, subSkills.length, relations.length);
});
// */ //Le bail that was used to produce relations.js, newSkills.js, subSkills.js //////////////////////////////////////////////////////////////////////
