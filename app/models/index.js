/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const config = require('../private'),
    knex = require('knex')(config.database);

// if (process.env.DEBUG === true)
// knex.on('query', (query) => console.log('SQL %s', query.sql));

exports.db = knex;

exports.TABLES = {
    ACCOUNT_VALIDATION: 'account_validation',
    USERS: 'users',
    USER_PROFILES: 'profiles',
    USER_SKILLS: 'user_skills',
    USER_EXPERIENCES: 'user_experiences',
    USER_LIKES: 'user_followers',
    USER_FOLLOWERS: 'user_followers',
    RESET: 'reset_passwords',
    RANK: 'rank_of_the_day',
    INVITATION: 'invitation',
    FIRST_LOG: 'first_log',
    PROJECTS: 'projects',
    PROJECT_LIKES: 'project_followers',
    PROJECT_NETWORK: 'project_network',
    PROJECT_REPLY_LIKES :'project_reply_likes',
    PROJECT_DISCUSSION: 'project_discussion',
    PROJECT_DISCUSSION_LIKES: 'project_discussion_likes',   
    PROJECT_DISCUSSION_REPLIES: 'project_discussion_replies',
    
    SKILLS: 'skills'
};