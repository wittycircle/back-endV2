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

const profileToProject = {
    'to meet smart people': ['for help', 'for feedback', 'for a cofounder'],
    'for a full time position': ['for feedback', 'to hire someone'],
    'for an internship': ['for feedback', 'to hire an intern'],
    'for part time collaboration': [
        'for help',
        'for feedback',
        'to hire someone'
    ],
    "to share what I'm working on": ['for feedback']
};

const projectToProfile = {
    'for help': ['to meet smart people', 'for part time collaboration'],
    'for feedback': ['*'],
    'to hire someone': [
        'for a full time position',
        'for part time collaboration'
    ],
    'to hire an intern': ['for an internship'],
    'for a cofounder': ['to meet smart people']
};

module.exports = files
    .map(f => require(f))
    .reduce((a, b) =>
        Object.assign(a, ...Object.keys(b).map(e => ({ [e]: b[e] })))
    );

// -------- the reduce can be replaced by --------
// .map(f => Object.keys(f).map(e => ({ [e]: f[e] })));
// .reduce((a, b) => a.concat(b), [])
// .reduce((a, b) => Object.assign(a, b), {});
