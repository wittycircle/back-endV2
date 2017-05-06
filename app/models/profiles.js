/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');

exports.getProfiles = () => {
    return h.spe_profile({}).select(h.format_location)
    /*
     And not sub_profile, because select
     And query builder, so would be added to sub_profile query directly
     and h.format_location would be added once more every time the query is run
     h.sub_profile(location) -> h.sub_profile(location, location) etc
     */
};

exports.getProfileBy = (by) => {
    const ifo = db.distinct('follow_user_id', 'user_id')
        .from(TABLES.USER_FOLLOWERS).as('ifo');

    let query =  db(h.spe_profile(by))
        .leftJoin(TABLES.RANK + ' as r', 'r.user_id', 'p.uid')
        .leftJoin(ifo, 'ifo.follow_user_id', 'p.uid')
        .first('rank', 'p.*', db.raw('GROUP_CONCAT(ifo.user_id) as foli'))

    return h.exist(TABLES.USER_PROFILES, by['p.id'])
        .then(() => query)
};

exports.updateProfile = (stuff, cnd) => {
    return db(TABLES.USER_PROFILES)
        .update(stuff)
        .where(cnd)
};
// ------------------ Follow ------------------
exports.getProfileFollowers = (cond, cond2, p_id) => {
    return h.exist(TABLES.USER_PROFILES, p_id).then(r => {
        if (!r.length)
            throw "Bad profile id"
        else {
            return db.distinct(h.p_array).distinct('p.username', 'p.fullName')
                .from(TABLES.USER_FOLLOWERS + ' as l') 
                .join(h.sub_profile, 'p.uid', cond2) 
                .where(cond, p_id)
        }
    });
};

exports.followProfile = (id, uid) => {
    let obj = {user_id: uid, follow_user_id: id}

    return h.exist(TABLES.USERS, id).then(r => {
        if (!r.length)
            throw "Person to follow"
        return db(TABLES.USER_FOLLOWERS).first('id').where(obj)
            .then(r => {
                if (!r)
                    return db(TABLES.USER_FOLLOWERS).insert(obj)
                else
                    return db(TABLES.USER_FOLLOWERS).del().where(obj)
            });
    });
};

exports.unfollowProfile = (id, uid) => {
    return db(TABLES.USER_FOLLOWERS).del() 
        .where({user_id: id, follow_user_id: uid})
};
// ------------------ Location ------------------
exports.getLocation = (p_id) => {
    return db(TABLES.USER_PROFILES)
        .select(['country', 'city', 'state'])
        .where({id: p_id})
};
