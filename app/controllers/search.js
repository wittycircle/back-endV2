/**
 * Created by rdantzer on 19/02/17.
 */

'use strict';

const search = require('../models/search'),
    _ = require('lodash');

const profile_lookup = {
    'rank': 'sort.rank',
    'id': 'sort.id',
    'magic': 'RAND()',
    'skills': 'skills',
    'location': 'location',
    'network' : 'p.network',
    // 'about': 'p.about',
    // 'follower': 'follower',
},
    project_lookup = {
        'id': 'pr.id',
        'status': 'pr.status',
        'category': 'c.name',
        'location': 'location',
        'help' : 'help',
        'skills': 'skills',
        'followers': 'followers',
        'magic': 'RAND()',
    };

exports.searchProfile = (req, res, next) => {
    const {paginate, query} = req.body,
    selector = _.fromPairs(query.members.map(member => [profile_lookup[member.field], member.value]));

    console.log(selector);

    search.cardProfile(selector)
        .orderByRaw(`${profile_lookup[query.sort.field]} ${ query.sort.reverse ? 'desc' : 'asc'}`)
        .where(profile_lookup['id'], '>', paginate.offset)
        .limit(paginate.limit)
        .then(results => {
            if (!_.isEmpty(results))
                res.send(_.map(results, result => {
                    result.skills = _.split(result.skills, ',');
                    return result;
                }));
            else
                next({code: 404});
        })
        .catch(err => next(err));
};

// ------------------ Search project ------------------
exports.searchProject = (req, res, next) => {
    const {paginate, query} = req.body,
     selector = _.fromPairs(query.members.map(member => [project_lookup[member.field], member.value]));

    console.log(selector);

    search.cardProject(selector)
        .orderByRaw(`${project_lookup[query.sort.field]} ${ query.sort.reverse ? 'desc' : 'asc'}`)
        .where(project_lookup['id'], '>', paginate.offset)
        .limit(paginate.limit)
        .then(results => {
            if (!_.isEmpty(results))
                // res.send({project: results})
                res.send(_.map(results, result => {
                    result.skills = _.words(result.skills);
                    return result;
                }));
            else
                next({code: 404});
        })
        .catch(err => next(err));
};
