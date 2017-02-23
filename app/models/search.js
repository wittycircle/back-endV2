/**
 * Created by rdantzer on 16/02/17.
 */

'use strict';

const {db, TABLES} = require('./index');

/**
 SELECT
 p.id,
 p.first_name,
 p.last_name,
 p.cover_picture,
 p.profile_picture AS picture,
 p.description,
 p.city,
 p.country,
 p.state,
 r.rank
 FROM
 profiles p
 LEFT JOIN
 rank_of_the_day r ON p.id = r.user_id;
 */


exports.searchProject = (query) => {
};

exports.searchProfile = (query) => {
    return db(TABLES.USER_PROFILES)
        .select([
            'p.id',
            'p.first_name',
            'p.last_name',
            'p.profile_picture AS picture',
            'p.description',
            'p.country',
            'r.rank'])
        .from(`${TABLES.USER_PROFILES} as p`)
        .leftJoin(`${TABLES.RANKS} as r`, 'p.id', 'r.user_id')
        .leftJoin(sub);
};


const follower = db.select('user_id').count('user_id as total')
    .from(TABLES.USER_FOLLOWERS).groupBy('user_id').as('ssu');

const following = db.select('follow_user_id').count('follow_user_id as MA')
    .from(TABLES.USER_FOLLOWERS).groupBy('follow_user_id').as('su');

const sortCardProfile = db.select(['u.id', 'u.username', 'u.profile_id',
    's.user_id', 'r.rank as rank',
    db.raw('IFNULL(total, 0) as follower'), db.raw('IFNULL (MA, 0) as following'),
    db.raw('GROUP_CONCAT(DISTINCT skill_name) as skills')])
    .from(TABLES.USERS + ' as u')
    .join(TABLES.USER_SKILLS + ' as s', 'u.id', 's.user_id')
    .join(TABLES.RANK + ' as r', 'u.id', 'r.user_id')
    .leftOuterJoin(follower, 'ssu.user_id', 'u.id')
    .leftOuterJoin(following, 'su.follow_user_id', 'u.id')
    .groupBy('u.id').as('sort');

const profileStuff = db(TABLES.USER_PROFILES)
    .select(['id', 'first_name', 'last_name', 'description',
        'city', 'state', 'country',
        'profile_picture as picture', 'about', 'cover_picture_cards as cover_picture'])
    .where('description', '!=', 'NULL')
    .andWhere('profile_picture', '!=', 'NULL')
    .andWhere('fake', '=', '0')
    .as('p');


exports.cardProfile = () => {
    let exp = db.select('user_id')
        .from(TABLES.USER_EXPERIENCES).as('e');

    return db.select(['sort.*', 'p.*'])
        .from(TABLES.USERS + ' as u')
        .join(profileStuff, 'u.profile_id', 'p.id')
        .join(sortCardProfile, 'sort.id', 'u.id')
        .join(exp, 'e.user_id', 'sort.user_id')
        .groupBy('u.id')
        .where('sort.rank', '>', '0') //todo remove
};
