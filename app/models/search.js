/**
 * Created by rdantzer on 16/02/17.
 */

'use strict';

const {db, TABLES} = require('./index'),
    h = require('./helper'),
    _ = require('lodash');

const addLocation = (table, location, query) => {
    if (!_.isEmpty(location)) {
        const _location = _.words(location);
        query.where(table + '.city', 'like', '%' + _location[0] + '%')
            .orWhere(table + '.state', 'like', '%' + _location[1] + '%')
            .orWhere(table + '.country', 'like', '%' + _location[1] + '%')
            .orderBy(table + '.city')
    }
};

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
        .join(TABLES.RANK + ' as r', 'u.id', 'r.user_id') //leftouterjoin to get those without rank
        .leftOuterJoin(follower, 'ssu.user_id', 'u.id')
        .leftOuterJoin(following, 'su.follow_user_id', 'u.id')
        .groupBy('u.id').as('sort');

    const profileStuff = (location) => {
        let _query = db(TABLES.USER_PROFILES + ' as p')
            .select(_.concat(h.p_array, db.raw('CONCAT (p.city, ", ",  p.country) as location')))
            .where('p.description', '!=', 'NULL')
            .andWhere('p.profile_picture', '!=', 'NULL')
            .andWhere('p.fake', '=', '0')
            .andWhere(_.pick(selector, ['p.about', 'p.network']))
        addLocation('p', location, _query)
        return _query.as('p')
    };

    return db.select(['sort.*', 'p.*'])
        .from(TABLES.USERS + ' as u')
        .join(profileStuff(selector.location), 'u.profile_id', 'p.id')
        .join(sortCardProfile, 'sort.id', 'u.id')
        .leftOuterJoin(exp, 'e.user_id', 'sort.user_id')
        .groupBy('u.id') 
        .where('sort.rank', '>', '0') //todo remove
};

exports.cardProject = (selector) => {
    const p_array = ['pr.id', 'pr.title', 'pr.description', 'pr.picture_card', 'pr.status',
     'c.id as category_id', 'c.name as category_name', 'p.network',
     'p.profile_picture', 'p.uid as user_id', db.raw('CONCAT (p.first_name, " ", p.last_name) as username'),
     db.raw('CONCAT (city, ", ", country) as location')
     ];

     const sub_members = db(TABLES.PROJECT_MEMBERS + ' as m').select('m.project_id', 'm.user_id').where('n_accept', 1).as('m')
     const sub_openings = db(TABLES.PROJECT_OPENINGS + ' as o').select('o.tags', 'o.status', 'o.project_id').as('o')
     const sub_category = db(TABLES.CATEGORIES + ' as c').select('c.id', 'c.name').as('c')
     
    if (selector.category)
        sub_category.where('c.name', selector.category)
     if (selector.help)
        sub_openings.where('o.status', selector.help)
    if (selector.skills){
        _.words(selector.skills).forEach(el => { sub_openings.orWhere('o.tags', 'like', '%'+ el + '%') })
        sub_openings.orderBy('o.tags')
    }

     const query = db.select(p_array)
            .countDistinct('pl.id as followers')
            .countDistinct('m.user_id as members')
            .from(TABLES.PROJECTS + ' as pr')
            .join(h.u_profile, 'p.uid', 'pr.user_id')
            .join(sub_category, 'c.id', 'pr.category_id')
            .leftJoin(TABLES.PROJECT_LIKES + ' as pl', 'pl.project_id', 'pr.id')
            .leftJoin(sub_members, 'm.project_id', 'pr.id')
            .whereRaw('pr.picture_card <> ""')
            .where('pr.project_visibility', 1)
            .groupBy('pr.id')

    addLocation('pr', selector.location, query);
    if (selector.help || selector.skills)
            query.join(sub_openings, 'o.project_id', 'pr.id')

    return query;
};
