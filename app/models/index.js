/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const config = require('../private'), knex = require('knex')(config.database);

// if (process.env.DEBUG === true)
// knex.on('query', (query) => console.log('SQL %s', query.sql));

exports.db = knex;

exports.TABLES = {
  //            ***    USERS    ***
  ACCOUNT_VALIDATION: 'account_validation',
  RESET_PASSWORDS: 'reset_passwords',
  USERS: 'users',
  PROFILES: 'profiles',
  USER_SKILLS: 'user_skills',
  USER_EXPERIENCES: 'user_experiences',
  USER_FOLLOWERS: 'user_followers',
  USER_SOCIALS: 'user_socials',
  FIRST_LOG: 'first_log',
  SHARE_INVITE: 'share_invite_link',
  //            *** INTERESTS  ***
  INTERESTS: 'interests',
  USER_INTERESTS: 'user_interests',

  //            ***    PROJECTS    ***
  PROJECTS: 'projects',
  PROJECT_LIKES: 'project_followers',
  DISCUSSIONS: 'discussions',
  DISCUSSION_LIKES: 'discussion_likes',
  DISCUSSION_MESSAGES: 'discussion_messages',
  PROJECT_MEMBERS: 'project_members',
  PROJECT_CONTRIBUTOR: 'project_contributor',
  PROJECT_INVITE: 'project_invites',
  //            ***   openings     ***
  PROJECT_OPENINGS: 'openings',
  OPENING_TAGS: 'opening_tags',
  //            ***    NETWORK    ***
  NETWORKS: 'partnerships',
  NETWORKS_INFO: 'networks_info',
  NETWORKS_LIST: 'networks_list',
  NETWORK_VERIFICATION: 'network_verification',
  //            *** HISTORY ***
  HISTORY: 'project_history',
  //            ***    ARTICLES    ***
  ARTICLES: 'articles',
  TAG_ARTICLES: 'tag_articles',
  ARTICLE_TAGS: 'article_tags',
  ARTICLE_LIKES: 'article_likes',
  ARTICLE_MSG: 'article_messages',
  //            ***    CHAT    ***
  MESSAGES: 'messages',
  ROOM_MEMBERS: 'room_members',
  ROOM_STATUS: 'room_status',
  ROOMS: 'rooms',
  //            ***    MISC    ***
  CATEGORIES: 'categories',
  RANK: 'ranks',
  SCORE: 'rank_points',
  INVITATION: 'invitations',
  SKILLS: 'skills',
  LOCATION: 'location',
  //            ***   Notifications    ***
  NOTIF_PERM: 'notification_permission',
  NOTIF_LIST: 'notification_list',

  //            *** FORGOTTEN TABLES ***
  INVITE_UNIVERSITY: 'invite_university',
  VIEWS: 'views',
  profile_ranking: 'profile_ranking'
};

// Redis stuff

const ioredis = require('ioredis');
const redis = ioredis(config.redis);
exports.redis = redis;
