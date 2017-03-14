/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');

exports.getProfiles = () => {
        return h.sub_profile;
};

exports.getProfileBy = (by) => {
    return h.ws_profile(by)
};

exports.updateProfile = (stuff, cnd) => {
    return db(TABLES.USER_PROFILES)
        .update(stuff)
        .where(cnd)
};
// ------------------ Follow ------------------
exports.getProfileFollowers = (cond, cond2, id) => {
    const sub = db.select('l.follow_user_id', 'l.user_id')
                .from(TABLES.USER_LIKES + ' as l')
                .whereIn(cond, function() {
                    this.select('id').from(TABLES.USERS).where('profile_id', id)
                })
                .as('l');

    return db.select(h.p_array)
        .from(sub)
        .join(h.u_profile, 'p.uid', 'l.follow_user_id')
        .groupBy(cond2);
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
