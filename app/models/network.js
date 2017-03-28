'use strict';

const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');

exports.getNetwork = (from) => {
    if (from == 'university'){
        return db(TABLES.UNIV_NETWORK).distinct('name as network')
    } else if (from == 'profile'){
        return db(TABLES.PROFILE_NETWORK).distinct('network')
    } else if (from == 'profile_incubator'){
        return db(TABLES.PROFILE_INCUBATOR).distinct('network')
    } else if (from == 'project'){
        return db(TABLES.PROJECTS).distinct('network')
    } else if (from == 'networks'){
      return db(TABLES.NETWORKS).distinct('name as network')  
    } else {
        return new Promise(resolve => resolve(`bad network :${from}`))
    }
};

exports.getNetworkInfo = (from) => {
    if (from == 'university'){
        return db(TABLES.UNIV_NETWORK).select()
    } else if (from == 'profile'){
        return db(TABLES.PROFILE_NETWORK).select()
    } else if (from == 'profile_incubator'){
        return db(TABLES.PROFILE_INCUBATOR).select()
    } else if (from == 'project'){
        return db(TABLES.PROJECTS).select()
    } else if (from == 'networks'){
      return db(TABLES.NETWORKS).select()
    } else {
        return new Promise(resolve => resolve(`bad network :${from}`))
    }
};

exports.createNetwork = (from, data) => {
  if (from == 'university'){
        return db(TABLES.UNIV_NETWORK).insert(data)
    } else if (from == 'profile'){
        return db(TABLES.PROFILE_NETWORK).insert(data)
    } else if (from == 'profile_incubator'){
        return db(TABLES.PROFILE_INCUBATOR).insert(data)
    } else if (from == 'project'){
        return db(TABLES.PROJECTS).insert(data)
    }else if (from == 'networks'){
      return db(TABLES.NETWORKS).insert(data)
    } else {
        return new Promise(resolve => resolve(`bad network :${from}`))
    }
};

exports.updateNetwork = (from, id, data) => {
  if (from == 'university'){
        return db(TABLES.UNIV_NETWORK).update(data).where({'id': id})
    } else if (from == 'profile'){
        return db(TABLES.PROFILE_NETWORK).update(data).where({'id': id})
    } else if (from == 'profile_incubator'){
        return db(TABLES.PROFILE_INCUBATOR).update(data).where({'id': id})
    } else if (from == 'project'){
        return db(TABLES.PROJECTS).update(data).where({'id': id})
    }else if (from == 'networks'){
      return db(TABLES.NETWORKS).update(data).where({'id': id})
    } else {
        return new Promise(resolve => resolve(`bad network :${from}`))
    }

};


exports.removeNetwork = (from, id) => {
  if (from == 'university'){
        return db(TABLES.UNIV_NETWORK).del().where({'id': id})
    } else if (from == 'profile'){
        return db(TABLES.PROFILE_NETWORK).del().where({'id': id})
    } else if (from == 'profile_incubator'){
        return db(TABLES.PROFILE_INCUBATOR).del().where({'id': id})
    } else if (from == 'project'){
        return db(TABLES.PROJECTS).del().where({'id': id})
    }else if (from == 'networks'){
      return db(TABLES.NETWORKS).del().where({'id': id})
    } else {
        return new Promise(resolve => resolve(`bad network :${from}`))
    }
};
