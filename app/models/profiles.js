/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');

exports.getProfiles = () => {
    return h.sub_profile
};

exports.getProfileBy = (by) => {
    let profile = h.spe_profile(by)
    return db(profile)
        .leftJoin(TABLES.RANK + ' as r', 'r.user_id', 'p.uid')
        .select('rank', 'p.*')
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
            return "Bad profile id"
        else {
            return db.distinct(h.p_array).distinct('p.username', 'p.fullName')
                .from(TABLES.USER_LIKES + ' as l') 
                .join(h.sub_profile, 'p.uid', cond2) 
                .where(cond, p_id)
        }
    });
};

exports.followProfile = (id, uid) => {
    return h.exist(TABLES.USERS, id).then(r => {
        if (r.length)
         {
            return db(TABLES.USER_LIKES) 
            .insert({
                user_id: id, 
                follow_user_id: uid, 
            })
        }
    })
};

exports.unfollowProfile = (id, uid) => {
    return db(TABLES.USER_LIKES).del() 
        .where({user_id: id, follow_user_id: uid})
};
// ------------------ Location ------------------
exports.getLocation = (p_id) => {
    return db(TABLES.USER_PROFILES)
        .select(['country', 'city', 'state'])
        .where({id: p_id})
};
