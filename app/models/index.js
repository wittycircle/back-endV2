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
//            ***    USERS    ***
    ACCOUNT_VALIDATION: 'account_validation',
    RESET_PASSWORDS: 'reset_passwords',
    USERS: 'users',
    USER_PROFILES: 'profiles',
    USER_SKILLS: 'user_skills',
    USER_EXPERIENCES: 'user_experiences',
    USER_LIKES: 'user_followers',
    USER_FOLLOWERS: 'user_followers',
    RESET: 'reset_passwords',
    FIRST_LOG: 'first_log',
//            ***    PROJECTS    ***
    PROJECTS: 'projects',
    PROJECT_LIKES: 'project_followers',
    PROJECT_NETWORK: 'project_network',
    PROJECT_REPLY_LIKES: 'project_reply_likes',
    PROJECT_DISCUSSION: 'project_discussion',
    PROJECT_DISCUSSION_LIKES: 'project_discussion_likes',
    PROJECT_DISCUSSION_REPLIES: 'project_discussion_replies',
    PROJECT_OPENINGS: 'project_openings',
    PROJECT_MEMBERS: 'project_users',
    PROJECT_CONTRIBUTOR: 'project_contributor',
//            ***    ARTICLES    ***
    ARTICLES: 'articles',
    TAG_ARTICLES: 'tag_articles',
    ARTICLE_TAGS: 'article_tags',
    ARTICLE_LIKES: 'article_likes',
//            ***    CHAT    ***
    MESSAGES: 'messages',
//            ***    MISC    ***
    CATEGORIES: 'categories',
    RANK: 'rank_of_the_day',
    INVITATION: 'invitation',
    SKILLS: 'skills'
};