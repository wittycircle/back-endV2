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
    const query = req.body.query,
        selector = _.fromPairs(query.members.map(member => [member.field, member.value]));

    search.cardProfile()
        .orderBy(field_lookup[query.sort.field], query.sort.reverse ?
            'desc' : 'asc')
        .where(selector)
        .limit(query.paginate.limit)
        .then(results => {
            if (!_.isEmpty(results))
                res.send(results);
            else
                next({code: 404});
        })
        .catch(err => next(err));
};