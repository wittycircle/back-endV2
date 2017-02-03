/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const {db, TABLES} = require('./index');
// user = require('./users');
let h = { //Helper
    p_array :['p.id', 'p.first_name', 'p.last_name', 'p.profile_picture', 'p.cover_picture', 'p.about', 'p.description'],
    p2_array : ['u.id as uid', 'p.id', 'p.first_name', 'p.last_name', 'p.profile_picture', 'p.cover_picture', 'p.about', 'p.description']
}

h.sub_profile = db.select(h.p_array).from(TABLES.USER_PROFILES + ' as p').as('p')
h.sub_user = db.select('id', 'profile_id').from(TABLES.USERS).as('u')
h.u_profile = db.select(h.p2_array).from(h.sub_profile).join(h.sub_user, 'u.profile_id', 'p.id')
                    .groupBy('p.id').as('p')


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
    return db(TABLES.USER_PROFILES)
        .select(p_array)
};

exports.getProfileBy = (by) => {
    return db(TABLES.USER_PROFILES)
        .select(p_array)
        .where(by);
};

exports.updateProfile = (stuff, cnd) => {
    return db(TABLES.USER_PROFILES)
        .update(stuff)
        .where(cnd)
};

exports.getProfileLikes = (id) => {
    let sub = db.select('l.follow_user_id')
                .from(TABLES.USER_LIKES + ' as l')
                .where('l.user_id', id).as('l')

    return db.select(h.p_array)
        .from(sub)
        .join(h.u_profile, 'p.uid', 'l.follow_user_id')
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
        .select(['location_country as country', 
                'location_city as city',
                'location_state as state'])
        .where({id: p_id})
};
