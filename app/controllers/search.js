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
        'last_upvoted': 'pl.creation_date',
        'network': 'network'
    };
//Main page: les projects upvoted less than 48h ago
//main page: profiles around you [got ip (string) ]

exports.searchProfile = (req, res, next) => {
    const {paginate, query} = req.body;
    let selector = {},
        order_by = profile_lookup["magic"];

    if (query) {
        selector = _.fromPairs(query.members.map(member => [profile_lookup[member.field], member.value]));
        if (query.sort && profile_lookup[query.sort.field])
            order_by = profile_lookup[query.sort.field]
    }

    let q = search.cardProfile(selector)
            .orderByRaw(`${order_by} ${ query && query.sort && query.sort.reverse ? 'desc' : 'asc'}`)
    if (paginate)
        q.where(profile_lookup['id'], '>', paginate.offset).limit(paginate.limit)
    q.then(results => {
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
     if (req.user && req.user.id)
        selector.uid = req.user.id;
    let order_by = project_lookup[query.sort.field] ? project_lookup[query.sort.field] : project_lookup["magic"]
    let group_by = project_lookup[query.sort.field] && query.sort.field == 'last_upvoted' ? project_lookup[query.sort.field] : 'pr.id'
    search.cardProject(selector)
        .orderByRaw(`${order_by} ${ query.sort.reverse ? 'desc' : 'asc'}`)
        .groupBy(`${group_by}`, 'pr.id')
        .where(project_lookup['id'], '>', paginate.offset)
        .limit(paginate.limit)
        .then(results => {
            if (!_.isEmpty(results)){
                res.send({projects: results})
            }
            else
                next({code: 404});
        })
        .catch(err => next(err));
};
// ------------------ Main page ------------------

// exports.mainProjects = (req, res, next) => {
//     search.mainProjects()
//         .then(r => {
//             if (typeof r === 'string') {
//                 return next([r, 'Error ! [oups]'])
//             }
//             else{
//                 res.send({projects: r})
//             }
//         })
//         .catch(err => next(err))
// };

// exports.mainProfiles = (req, res, next) => {
//     const get_ip = "Berlin"
//     const selector = {
//         location: get_ip
//     }
//     search.cardProfile(selector)
//         .then(r => {
//             if (typeof r === 'string') {
//                 return next([r, 'Something went wrong'])
//             }
//             else{
//                 res.send({profiles: r})
//             }
//         })
//         .catch(err => next(err))
// };
