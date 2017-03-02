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
// ------------------ Profile ------------------
exports.cardProfile = (selector) => {
    let exp = db.select('user_id').from(TABLES.USER_EXPERIENCES).as('e'),
        skills = db.select('*').from(TABLES.USER_SKILLS + ' as s').as('s');

    const follower = db.select('user_id').count('user_id as total').from(TABLES.USER_FOLLOWERS).groupBy('user_id').as('ssu'),
        following = db.select('follow_user_id').count('follow_user_id as MA').from(TABLES.USER_FOLLOWERS).groupBy('follow_user_id').as('su');

    const sortCardProfile = db.select(['u.id', 'u.profile_id', 'r.rank as rank',
        db.raw('IFNULL(total, 0) as follower'), db.raw('IFNULL (MA, 0) as following'),
        db.raw('GROUP_CONCAT(DISTINCT skill_name) as skills'), 'skill_name'])
        .from(TABLES.USERS + ' as u')
        .leftJoin(skills, 'u.id', 's.user_id')
        .leftJoin(TABLES.RANK + ' as r', 'u.id', 'r.user_id') //leftJoin to get those without rank [All users will have a rank?]
        .leftJoin(follower, 'ssu.user_id', 'u.id')
        .leftJoin(following, 'su.follow_user_id', 'u.id')
        .groupBy('u.id').as('sort');

    const profile_array = ['p.id', 'p.profile_picture', 'p.about', 'p.cover_picture', 'p.description', 'p.network',
     db.raw('CONCAT (p.city, ", ",  p.country) as location'),
    db.raw('CONCAT (p.first_name, " ", p.last_name) as username')
    ];

    const profileStuff = (location) => {
        let _query = db(TABLES.USER_PROFILES + ' as p')
            .select(profile_array)
            .where('p.description', '!=', 'NULL')
            .andWhere('p.profile_picture', '!=', 'NULL')
            .andWhere('p.fake', '=', '0')
        addLocation('p', location, _query)
        return _query.as('p')
    };
    const ret_array = ['username', 'rank', 'sort.id as user_id', 'p.id as profile_id', 'profile_picture',
      'cover_picture', 'about', 'description', 'network' , 'location', 'follower', 'following', 'skills']

    let q =  db.select(ret_array)
        .from(sortCardProfile)
        .join(profileStuff(selector.location), 'sort.profile_id', 'p.id')
        .leftJoin(exp, 'e.user_id', 'sort.id')
        .groupBy('sort.id') 
        .where('sort.rank', '>', '0') //todo remove

    if (selector.skills){
    let selected =  _.words(selector.skills).map((el, i) => 'WHEN sort.skill_name LIKE "%' + el + '%" THEN ' + (i + 1)).join(' ');
        q.orderByRaw('CASE ' + selected + ' else 100  END , sort.skill_name');
    }
    if (selector.network)
        q.orderByRaw('CASE WHEN network = "' + selector.network + '" THEN 1 else 2 END, network')
    if (selector.about)
        q.orderByRaw('CASE WHEN about = "' + selector.about + '" THEN 1 else 2 END, about')
    return q;
};

// ------------------ Project ------------------
exports.cardProject = (selector) => {
    const p_array = ['pr.id', 'pr.title', 'pr.description', 'pr.picture_card', 'pr.status',
     'c.id as category_id', 'c.name as category_name',  /*db.raw('GROUP_CONCAT(DISTINCT if(o.tags <> "0", o.tags, null)) as skills'),*/
     'p.network', 'p.profile_picture', 'p.uid as user_id', db.raw('CONCAT (p.first_name, " ", p.last_name) as username'),
     db.raw('CONCAT (city, ", ", country) as location')
     ];

     const sub_members = db(TABLES.PROJECT_MEMBERS + ' as m').select('m.project_id', 'm.user_id').where('n_accept', 1).as('m'),
            sub_openings = db(TABLES.PROJECT_OPENINGS + ' as o').select('o.tags', 'o.status', 'o.project_id').as('o'),
            sub_category = db(TABLES.CATEGORIES + ' as c').select('c.id', 'c.name').as('c');

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

    if (selector.network)
        query.orderByRaw('CASE WHEN p.network like "' + selector.network + '" THEN 1 else 2 END')
    addLocation('pr', selector.location, query);
    if (selector.opening || selector.skills)
        query.leftJoin(sub_openings, 'o.project_id', 'pr.id')
    if (selector.skills){
        let selected =  _.words(selector.skills).map((el, i) => 'WHEN GROUP_CONCAT(o.tags) LIKE "%' + el + '%" THEN ' + (i + 1)).join(' ');
        query.orderByRaw('CASE ' + selected + ' ELSE 100 END')
    };
     if (selector.opening)
        query.orderByRaw('CASE WHEN  o.status = "' + selector.opening + '" THEN 1 ELSE 2 END')
    if (selector.category)
        query.orderByRaw('(c.name = "' + selector.category + '") DESC')
    if (selector.status)
            query.orderByRaw('CASE WHEN pr.status = "' + selector.status + '" THEN 1 else 2 END')
    return query;
};
