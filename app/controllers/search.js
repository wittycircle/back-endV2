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
    'network' : 'network',
    'about': 'about',
},
    project_lookup = {
        'id': 'pr.id',
        'status': 'status',
        'category': 'category',
        'location': 'location',
        'opening' : 'opening',
        'skills': 'skills',
        'followers': 'followers',
        'magic': 'RAND()',
        'network': 'network'
    };

exports.searchProfile = (req, res, next) => {
    const {paginate, query} = req.body,
    selector = _.fromPairs(query.members.map(member => [profile_lookup[member.field], member.value]));

    let order_by = profile_lookup[query.sort.field] ? profile_lookup[query.sort.field] : profile_lookup["magic"]
    search.cardProfile(selector)
        .orderByRaw(`${order_by} ${ query.sort.reverse ? 'desc' : 'asc'}`)
        .where(profile_lookup['id'], '>', paginate.offset)
        .limit(paginate.limit)
        .then(results => {
            if (!_.isEmpty(results))
                res.send({profiles: _.map(results, result => {
                    result.skills = _.split(result.skills, ',');
                    return result;
                })});
            else
                next({code: 404});
        })
        .catch(err => next(err));
};

// ------------------ Search project ------------------
exports.searchProject = (req, res, next) => {
    const {paginate, query} = req.body,
     selector = _.fromPairs(query.members.map(member => [project_lookup[member.field], member.value]));

    let order_by = project_lookup[query.sort.field] ? project_lookup[query.sort.field] : project_lookup["magic"]
    search.cardProject(selector)
        .orderByRaw(`${order_by} ${ query.sort.reverse ? 'desc' : 'asc'}`)
        .where(project_lookup['id'], '>', paginate.offset)
        .limit(paginate.limit)
        .then(results => {
            if (!_.isEmpty(results))
                res.send({projects: results})
            else
                next({code: 404});
        })
        .catch(err => next(err));
};
