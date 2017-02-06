/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const {db, TABLES} = require('./index');
// user = require('./users');

exports.updateProfileFromUser = (body, id) => {
    return db.update(body)
        .whereIn('id', function () {
            this.select('profile_id').from(TABLES.USERS).where({'id': id})
        }).from(TABLES.USER_PROFILES)
};

exports.updateProfilePicture = (body, id) => {
    return db(TABLES.USER_PROFILES)
        .update(body)
        .where({'id': id})
};

exports.getProfiles = () => {
    return db(TABLES.USER_PROFILES)
        .select(['id', 'first_name', 'last_name', 'profile_picture', 'cover_picture', 'about', 'description']);
};

exports.getProfileBy = (by) => {
    return db(TABLES.USER_PROFILES)
        .select(['id', 'first_name', 'last_name', 'profile_picture', 'cover_picture', 'about', 'description'])
        .where(by);
};

exports.getProfileLikes = (id) => {
    // return db.from(TABLES.USER_PROFILES + ' as p')
    //     .join(TABLES.USERS + ' as u', 'u.profile_id', 'p.id')
    //     .join(TABLES.USER_LIKES + ' as l', 'l.user_id', 'u.id')
    //     .join(TABLES.USERS + ' as u2', 'u2.id', 'l.follow_user_id')
    //     .select(db.raw('GROUP_CONCAT(DISTINCT u2.username) as who'))
    //     .count('u.username as count')
    //     .where('u.id', id)
    return db.raw('SELECT profiles.first_name, profiles.last_name, profiles.cover_picture, profiles.profile_picture ' +
        'FROM (SELECT * FROM user_followers f WHERE ' +
        'f.user_id = 1) AS k ' +
        'INNER JOIN ' +
        'profiles ON k.follow_user_id = profiles.id')
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