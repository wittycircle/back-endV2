/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const {db, TABLES} = require('./index'),
        h = require('./helper');

// exports.updateProfileFromUser = (body, id) => {
//     return db.update(body)
//         .from(TABLES.USER_PROFILES + ' as p')
//         .join(TABLES.USERS, 'u.profile_id', 'p.id')
//         .where('u.id', id)
// }

exports.updateProfileFromUser = (body, id) => {
    return db.update(body)
        .whereIn('id', function () {
            this.select('profile_id').from(TABLES.USERS).where({'id': id})
        }).from(TABLES.USER_PROFILES)
};

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

exports.getProfileLikes = (cond, cond2, id) => {
    const uid = db.select('id').from(TABLES.USERS).where('profile_id', id).as('uid')

    const sub = db.select('l.follow_user_id', 'user_id')
                .from(TABLES.USER_LIKES + ' as l')
                .join(uid, cond, 'uid.id').as('l')

    return db.select(h.p_array)
        .from(sub)
        .join(h.u_profile, 'p.uid', 'l.follow_user_id')
        .groupBy(cond2);
};

exports.likeProfile = (followed_id, id) => {
        return db(TABLES.USER_LIKES)
        .insert({
            user_id: id,
            follow_user_id: followed_id,
        })
};

exports.unlikeProfile = (followed_id, id) => {
    return db(TABLES.USER_LIKES).del()
        .where({user_id: id, follow_user_id: followed_id})
};

exports.getLocation = (p_id) => {
    return db(TABLES.USER_PROFILES)
        .select(['country', 'city', 'state'])
        .where({id: p_id})
};

// exports.updateLocation. = (stuff, p_id) => {
// //can receive directy location_country so can do update(stuff)
//     return db(TABLES.USER_PROFILES)
//         .update({
//             location_country: stuff.country
//             location_state: stuff.state
//             location_city: stuff.city
//         }).where()

// }