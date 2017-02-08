/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const config = require('../private'),
    knex = require('knex')(config.database);

// if (process.env.DEBUG === true)
knex.on('query', (query) => console.log('SQL %s', query.sql));

exports.db = knex

exports.TABLES = {
    USERS: 'users',
    USER_PROFILES: 'profiles',
    USER_SKILLS: 'user_skills',
    USER_EXPERIENCES: 'user_experiences',
    USER_FOLLOWERS: 'user_followers',
    ACCOUNT_VALIDATION: 'account_validation',
    RESET: 'reset_passwords',
    RANK: 'rank_of_the_day',
    INVITATION: 'invitation',
    FIRST_LOG: 'first_log',
    PROJECTS: 'projects',
    USER_LIKES: 'user_followers',
    PROJECT_LIKES: 'project_followers',
    PROJECT_NETWORK: 'project_network',
    SKILLS: 'skills'
};