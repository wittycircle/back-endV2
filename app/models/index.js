/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const config = require('../private'),
    knex = require('knex')(config.database);

const ioredis = require('ioredis');
const redis = ioredis(config.redis);

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
    USER_FOLLOWERS: 'user_followers',
    FIRST_LOG: 'first_log',
    'SHARE_INVITE': 'share_invite_link',
//            *** INTERESTS  ***
    INTERESTS: 'interests',
    USER_INTERESTS: 'user_interests',

//            ***    PROJECTS    ***
    PROJECTS: 'projects',
    PROJECT_LIKES: 'project_followers',
    PROJECT_REPLY_LIKES: 'project_reply_likes',
    PROJECT_DISCUSSION: 'project_discussion',
    PROJECT_DISCUSSION_LIKES: 'project_discussion_likes',
    PROJECT_DISCUSSION_REPLIES: 'project_discussion_replies',
    PROJECT_MEMBERS: 'project_users',
    PROJECT_CONTRIBUTOR: 'project_contributor',
    PROJECT_INVITE: 'project_invites',
//            ***   openings     ***
    PROJECT_OPENINGS: 'project_openings',
    OPENING_TAGS: 'opening_tags',
//            ***    NETWORK    ***
    'NETWORKS': 'networks',
    'NETWORKS_GROUP': 'networks_group',
    'PROJECT_NETWORK': 'project_network',
    'UNIV_NETWORK': 'university_list',
    'PROFILE_NETWORK': 'profile_network',
    'PROFILE_INCUBATOR': 'profile_network_2',
    //            *** HISTORY ***
    'HISTORY': 'project_history',
//            ***    ARTICLES    ***
    ARTICLES: 'articles',
    TAG_ARTICLES: 'tag_articles',
    ARTICLE_TAGS: 'article_tags',
    ARTICLE_LIKES: 'article_likes',
    ARTICLE_MSG: 'article_message',
//            ***    CHAT    ***
    MESSAGES: 'messages',
    OMESSAGES: 'old_messages',
//            ***    MISC    ***
    CATEGORIES: 'categories',
    RANK: 'rank_of_the_day',
    INVITATION: 'invitation',
    SKILLS: 'skills',
//            ***   Notifications    ***
    NOTIF_PERM: 'notification_permission',
    NOTIF_LIST: 'notification_list',

    //            *** FORGOTTEN TABLES ***
    INVITE_UNIVERSITY: 'invite_university',
    VIEWS: 'views',
profile_ranking: 'profile_ranking',
// ask_replies: 'ask_replies',
// feedback_replies: 'feedback_replies',
// history: 'history',
// news_feature: 'news_feature',
// notification_view: 'notification_view',
// opening_skills: 'opening_skills',
// portfolios_likes: 'portfolios_likes',
// project_asks: 'project_asks',
// project_feedbacks: 'project_feedbacks',
// project_polls: 'project_polls',
// send_mail: 'send_mail',
// sessions: 'sessions',
// track_client_ip: 'track_client_ip',
// user_portfolios: 'user_portfolios',
// witty_cover_pictures: 'witty_cover_pictures',
// witty_profile_pictures: 'witty_profile_pictures',
};

exports.redis = redis;