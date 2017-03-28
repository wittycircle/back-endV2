'use strict';

const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');

exports.getNetwork = (from) => {
    if (from == 'university'){
        return db(TABLES.UNIV_NETWORK).distinct('name as network')
    } else if (from == 'profile'){
        return db(TABLES.PROFILE_NETWORK).distinct('network')
    } else if (from == 'project'){
        return db(TABLES.PROJECT_NETWORK).distinct('network')
    } else {
        return new Promise(resolve => resolve(`bad network :${from}`))
    }
};
