'use strict';

const {db, TABLES} = require('./index'),
    _ = require('lodash'),
    h = require('./helper');

exports.getNetwork = (from) => {
    if (from == 'university')
        return db(TABLES.UNIV_NETWORK).distinct('name as network', 'launched', 'website').orderByRaw('popular DESC')
    else if (from == 'profile')
        return db(TABLES.PROFILE_NETWORK).distinct('network')
    else if (from == 'profile_incubator')
        return db(TABLES.PROFILE_INCUBATOR).distinct('network')
    else if (from == 'project')
        return db(TABLES.PROJECTS).distinct('network')
    else if (from == 'networks')
        return db(TABLES.NETWORKS).distinct('name as network')
    else
        return new Promise(resolve => resolve(`Bad network : ${from}`))
};

exports.getNetworkInfo = (uid, from) => {
    return h.admin(TABLES.USERS, uid, uid)
        .then(r => {
            if (!r.length)
                return `Bad network : ${from}`
            else {
                if (from == 'university')
                    return db(TABLES.UNIV_NETWORK).select().orderByRaw('popular DESC')
                else if (from == 'profile')
                    return db(TABLES.PROFILE_NETWORK).select()
                else if (from == 'profile_incubator')
                    return db(TABLES.PROFILE_INCUBATOR).select()
                else if (from == 'project')
                    return db(TABLES.PROJECTS).select()
                else if (from == 'networks')
                    return db(TABLES.NETWORKS).select()
            }
        });
};

exports.createNetwork = (uid, from, data) => {
    return h.admin(TABLES.USERS, uid, uid)
        .then(r => {
            if (!r.length)
                return `Bad network : ${from}`
            else {
                if (from == 'university')
                    return db(TABLES.UNIV_NETWORK).insert(data)
                else if (from == 'profile')
                    return db(TABLES.PROFILE_NETWORK).insert(data)
                else if (from == 'profile_incubator')
                    return db(TABLES.PROFILE_INCUBATOR).insert(data)
                else if (from == 'project')
                    return db(TABLES.PROJECTS).insert(data)
                else if (from == 'networks')
                    return db(TABLES.NETWORKS).insert(data)
            }
        });
};

exports.updateNetwork = (uid, from, id, data) => {
    return h.admin(TABLES.USERS, uid, uid)
        .then(r => {
            if (!r.length)
                return `Bad network : ${from}`
            else {
                if (from == 'university')
                    return db(TABLES.UNIV_NETWORK).update(data).where({'id': id})
                else if (from == 'profile')
                    return db(TABLES.PROFILE_NETWORK).update(data).where({'id': id})
                else if (from == 'profile_incubator')
                    return db(TABLES.PROFILE_INCUBATOR).update(data).where({'id': id})
                else if (from == 'project')
                    return db(TABLES.PROJECTS).update(data).where({'id': id})
                else if (from == 'networks')
                    return db(TABLES.NETWORKS).update(data).where({'id': id})
            }
        });
};

exports.removeNetwork = (uid, from, id) => {
    return h.admin(TABLES.USERS, uid, uid)
        .then(r => {
            if (!r.length)
                return `Bad network : ${from}`
            else {
                if (from == 'university')
                    return db(TABLES.UNIV_NETWORK).del().where({'id': id})
                else if (from == 'profile')
                    return db(TABLES.PROFILE_NETWORK).del().where({'id': id})
                else if (from == 'profile_incubator')
                    return db(TABLES.PROFILE_INCUBATOR).del().where({'id': id})
                else if (from == 'project')
                    return db(TABLES.PROJECTS).del().where({'id': id})
                else if (from == 'networks')
                    return db(TABLES.NETWORKS).del().where({'id': id})
            }
        });
};

// ------------------ MAIL STUFF ------------------
exports.getFromToken = (token) => {
    return db(TABLES.NETWORKS).select('*').where('token', token)
};

exports.createNewNetwork = (uid, data) => {
        return h.admin(TABLES.USERS, uid, uid)
        .then(r => {
            if (!r.length) 
                return "Admins only"
            return db(TABLES.NETWORKS).insert(data)
    })
};

exports.sendVerifyNetwork = (data) => {
    return h.exist(TABLES.USERS, data.user_id).then(r => {
        if (!r.length)
            return "Invalid user_id"
        return db(TABLES.PROFILE_NETWORK).insert(data)
    })
};

exports.validateNetwork = (token) => {
    return db(TABLES.PROFILE_NETWORK).first().where('token', token)
        .then(network => {
           return db(TABLES.USERS).first('profile_id').where('id', network.user_id)
            .then(profile => db(TABLES.USER_PROFILES).update('network', network.network).where('id', profile.profile_id))
        }).then(r => db(TABLES.PROFILE_NETWORK).update('verification', 1).where('token', token))
};
