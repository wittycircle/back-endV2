/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const {db, TABLES} = require('./index');
// user = require('./users');
const p_array = ['p.id', 'p.first_name', 'p.last_name', 'p.profile_picture', 'p.cover_picture', 'p.about', 'p.description']
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
}

exports.getProfileLikes = (id) => {
    let sub1 = db.select('l.follow_user_id')
                .from(TABLES.USER_LIKES + ' as l')
                .where('l.user_id', 1).as('k')

return db.select(p_array)
        .from(sub1)
        .join(TABLES.USER_PROFILES + ' as p', 'k.follow_user_id', 'p.id')

}
exports.likeProfile = (followed_id, id) => {
    return db(TABLES.USER_LIKES)
        .insert({
            user_id: id,
            follow_user_id: followed_id,
        })
}

exports.unlikeProfile = (followed_id, id) => {
    return db(TABLES.USER_LIKES).del()
        .where({user_id: id, follow_user_id: followed_id})
}

exports.getLocation = (p_id) => {
    return db(TABLES.USER_PROFILES)
        .select(['location_country as country', 
                'location_city as city',
                'location_state as state'])
        .where({id: p_id})
}
