/**
 * Created by rdantzer on 19/02/17.
 */

'use strict';

const search = require('../models/search'),
    _ = require('lodash');

const profile_lookup = {
        skills: 'skills',
        location: 'location',
        network: 'network',
        about: 'about',
        rank: 'sort.rank',
        id: 'sort.id',
        magic: 'p.creation_date'
    },
    project_lookup = {
        id: 'pr.id',
        status: 'status',
        category: 'category',
        location: 'location',
        opening: 'opening',
        skills: 'skills',
        followers: 'followers',
        magic: 'pr.creation_date',
        last_upvoted: 'pl.creation_date',
        network: 'network'
    };

const profile_order = ['skills', 'network', 'about', 'location'];
const project_order = [
    'network',
    'openings',
    'skills',
    'location',
    'category',
    'status'
];

//Main page: les projects upvoted less than 48h ago
//main page: profiles around you [got ip (string) ]
const has_liked = (foli, id) => {
    let hasLiked = false;
    let infollo = _.split(foli, ',');
    infollo.forEach(e => {
        if (e == id) hasLiked = true;
    });
    return hasLiked;
};

exports.searchProfile = (req, res, next) => {
    const { paginate, query } = req.body;
    let selector = {},
        order_by = profile_lookup['magic'];

    if (query) {
        selector = _.fromPairs(
            query.members
                .filter(member => member.value.length >= 1)
                .map(member => [profile_lookup[member.field], member.value])
        );
        if (query.sort && profile_lookup[query.sort.field])
            order_by = profile_lookup[query.sort.field];
        if ('priority' in query && query.priority !== null) {
            selector.priority = query.priority;
        }
    }

    if (selector.skills && typeof selector.skills === 'string') {
        selector.skills = [selector.skills];
    }

    const getRealCats = (skills, cats) => {
        let laString = '';
        skills.map((el, i) => {
            laString += ` WHEN s.name = "${el}" THEN ${(i + 1) * 1000} `;
        });
        cats.map((e, i) => {
            laString += `WHEN c.name = "${e.name}" THEN ${(i + 1) * 10} `;
        });
        console.log('laString', laString);
        return laString;
    };

    search
        .getCategory(selector.skills || 'nope')
        .then(cats => {
            if (cats !== 'nope') {
                selector.cats = getRealCats(selector.skills, cats);
                // if (cats !== 'nope') {
                //     selector.cats = selector.skills
                //         .concat(cats.map(e => e.name))
                //         .map(
                //             (el, i) =>
                //                 ` WHEN s.name = "${el}" THEN ${(i + 1) * 100}
                // 				 WHEN c.name = "${el}" THEN ${(i + 1) * 10} `
                //         )
                //         .join(' ');
            } else {
                selector.cats = `WHEN s.name like "noNeedSkill" THEN 1 `;
            }
            let q = search
                .cardProfile(selector)
                .orderByRaw(
                    `${order_by} ${query && query.sort && query.sort.reverse
                        ? 'desc'
                        : 'asc'}`
                )
                .offset(paginate.offset)
                .limit(paginate.limit);
            console.log('q', q.toString());
            return q.then(results => {
                if (!_.isEmpty(results))
                    res.send({
                        profiles: _.map(results, result => {
                            result.skills = _.split(result.skills, ',');
                            if (req.user && req.user.id)
                                result.hasLiked = has_liked(
                                    result.foli,
                                    req.user.id
                                );
                            delete result.foli;
                            return result;
                        })
                    });
                else next({ code: 404 });
            });
        })
        .catch(err => next(err));
};

// ------------------ Search project ------------------
exports.searchProject = (req, res, next) => {
    const { paginate, query } = req.body,
        selector = _.fromPairs(
            query.members
                .filter(member => member.value.length >= 1)
                .map(member => [project_lookup[member.field], member.value])
        );
    if ('priority' in query && query.priority !== null) {
        selector.priority = query.priority;
    }
    if (req.user && req.user.id) selector.uid = req.user.id;
    let order_by = !project_lookup[query.sort.field]
        ? project_lookup['magic']
        : query.sort.field == 'last_upvoted'
          ? 'MAX(pl.creation_date)'
          : project_lookup[query.sort.field];

    search
        .getCategory(selector.skills || 'nope')
        .then(cats => {
            if (cats !== 'nope') {
                selector.cats = selector.skills
                    .concat(cats.map(e => e.name))
                    .map(
                        (el, i) =>
                            ` WHEN s.name = "${el}" THEN ${100 -
                                i} WHEN c.name = "${el}" THEN ${50 - i} `
                    )
                    .join(' ');
            } else {
                selector.cats = `WHEN s.name like "noNeedSkill" THEN 150 `;
            }

            let q = search
                .cardProject(selector)
                .orderByRaw(`${order_by} ${query.sort.reverse ? 'desc' : 'asc'}`)
                .offset(paginate.offset)
                .limit(paginate.limit);

            return q.then(results => {
                if (!_.isEmpty(results)) {
                    res.send({ projects: results });
                } else next({ code: 404 });
            });
        })
        .catch(err => next(err));
};
