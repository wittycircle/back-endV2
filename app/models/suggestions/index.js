const { db, TABLES } = require('../index'),
  h = require('../helper');

const files = ['./profiles', './projects'];

/*
exports all methods from profiles and projects
such that it can be used like :
suggestions.Method
instead of  :

module.exports {
profiles,
projects
}

where you'd have to do suggestions.profiles.Method
*/

module.exports = files
  .map(f => require(f))
  .reduce((a, b) =>
    Object.assign(a, ...Object.keys(b).map(e => ({ [e]: b[e] })))
  );

// -------- the reduce can be replaced by --------
// .map(f => Object.keys(f).map(e => ({ [e]: f[e] })));
// .reduce((a, b) => a.concat(b), [])
// .reduce((a, b) => Object.assign(a, b), {});
