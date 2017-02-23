/**
 * Created by rdantzer on 19/02/17.
 */

'use strict';

const search = require('../models/search'),
    _ = require('lodash');

const field_lookup = {
    'rank': 'sort.rank',
    'follower': 'follower'
};

exports.searchProfile = (req, res, next) => {
    const {paginate, query} = req.body,
        selector = _.fromPairs(query.members.map(member => [member.field, member.value]));

    console.log(query);

    search.cardProfile()
        .orderBy(field_lookup[query.sort.field], query.sort.reverse ?
            'desc' : 'asc')
        .where(selector)
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