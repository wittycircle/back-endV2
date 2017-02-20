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