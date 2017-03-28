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
    } else if (from == 'networks'){
      return db(TABLES.NETWORKS).distinct('name as network')  
    } else {
        return new Promise(resolve => resolve(`bad network :${from}`))
    }
};

exports.createNetwork = (from, data) => {
  if (from == 'university'){
        return db(TABLES.UNIV_NETWORK).insert(data)
    } else if (from == 'profile'){
        return db(TABLES.PROFILE_NETWORK).insert(data)
    } else if (from == 'project'){
        return db(TABLES.PROJECT_NETWORK).insert(data)
    }else if (from == 'networks'){
      return db(TABLES.NETWORKS).insert(data)
    } else {
        return new Promise(resolve => resolve(`bad network :${from}`))
    }
};
