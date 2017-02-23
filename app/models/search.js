/**
 * Created by rdantzer on 16/02/17.
 */

'use strict';

const {db, TABLES} = require('./index'),
    h = require('./helper'),
    _ = require('lodash');

exports.cardProfile = (selector) => {
    let exp = db.select('user_id')
        .from(TABLES.USER_EXPERIENCES).as('e');

    let skills;
    if (typeof selector.skills !== 'undefined')
        skills = db.select('*').from(TABLES.USER_SKILLS + ' as s').whereIn('s.skill_name', selector.skills).as('s');
    else
        skills = db.select('*').from(TABLES.USER_SKILLS + ' as s').as('s');


    const follower = db.select('user_id').count('user_id as total')
        .from(TABLES.USER_FOLLOWERS).groupBy('user_id').as('ssu');

    const following = db.select('follow_user_id').count('follow_user_id as MA')
        .from(TABLES.USER_FOLLOWERS).groupBy('follow_user_id').as('su');


    const sortCardProfile = db.select(['u.id', 'u.username', 'u.profile_id',
        's.user_id', 'r.rank as rank',
        db.raw('IFNULL(total, 0) as follower'), db.raw('IFNULL (MA, 0) as following'),
        db.raw('GROUP_CONCAT(DISTINCT skill_name) as skills')])
        .from(TABLES.USERS + ' as u')
        .join(skills, 'u.id', 's.user_id')
        .join(TABLES.RANK + ' as r', 'u.id', 'r.user_id')
        .leftOuterJoin(follower, 'ssu.user_id', 'u.id')
        .leftOuterJoin(following, 'su.follow_user_id', 'u.id')
        .groupBy('u.id').as('sort');

    const profileStuff = (location) => {
        let _query = db(TABLES.USER_PROFILES + ' as p')
            .select(_.concat(h.p_array, db.raw('CONCAT (p.city, ", ",  p.country) as location')))
            .where('p.description', '!=', 'NULL')
            .andWhere('p.profile_picture', '!=', 'NULL')
            .andWhere('p.fake', '=', '0');
        if (selector.network)
            _query.andWhere(selector.network);
        if (selector.about)
            _query.andWhere(selector.about);
        if (!_.isEmpty(location)) {
            const _location = _.words(location);
            _query.where('p.city', 'like', '%' + _location[0] + '%')
                .orWhere('p.state', 'like', '%' + _location[0] + '%')
                .orWhere('p.country', 'like', '%' + _location[1] + '%')
        }
        return _query.as('p')
    };

    return db.select(['sort.*', 'p.*'])
        .from(TABLES.USERS + ' as u')
        .join(profileStuff(selector.location), 'u.profile_id', 'p.id')
        .join(sortCardProfile, 'sort.id', 'u.id')
        .leftOuterJoin(exp, 'e.user_id', 'sort.user_id')
        .groupBy('u.id');
    // .where('sort.rank', '>', '0') //todo remove
};
