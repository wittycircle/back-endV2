/**
 * Created by rdantzer on 19/02/17.
 */

'use strict';

const search = require('../models/search'),
    _ = require('lodash');

const field_lookup = {
    'rank': 'sort.rank',
    'follower': 'follower',
    'id': 'sort.id',
    'skills': 'skills',
    'about': 'p.about',
    'location': 'location',
    'network' : 'p.network',
    'magic': 'RAND()'
};

exports.searchProfile = (req, res, next) => {
    const {paginate, query} = req.body;

    const selector = _.fromPairs(query.members.map(member => [field_lookup[member.field], member.value]));

    console.log(selector);

    search.cardProfile(selector)
        .orderByRaw(`${field_lookup[query.sort.field]} ${ query.sort.reverse ? 'desc' : 'asc'}`)
        .where(field_lookup['id'], '>', paginate.offset)
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