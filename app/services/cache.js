/**
 * Created by rdantzer on 19/02/17.
 */

'use strict';

const {db, TABLES} = require('../models'),
    _ = require('lodash'),
    Redis = require('ioredis'),
    config = require('../private').redis,
    redis = new Redis(config),
    pub = new Redis(config),
    _key = (channel, id) => `${channel}_${id}`;


const _bootstrap_user_follows = () => {
    return db.raw('SELECT DISTINCT f.user_id, o.following, e.follower FROM user_followers f LEFT JOIN ' +
        '(SELECT u.user_id, COUNT(DISTINCT u.follow_user_id) ' +
        'AS following FROM user_followers u GROUP BY u.user_id) ' +
        'AS o ON f.user_id = o.user_id LEFT JOIN ' +
        '(SELECT u.follow_user_id, COUNT(DISTINCT u.user_id) AS follower FROM user_followers u GROUP BY u.follow_user_id) ' +
        'AS e ON f.user_id = e.follow_user_id ')
        .then(results => {
            console.log(results);
            redis.set('user_cache_status', 'ok');
        })
        .catch(err => {
            throw err
        })
};

exports.init = () => {
    redis.on('message', function (channel, message) {
        const res = JSON.parse(message);
        switch (channel) {
            case 'user_follow_action' :
                redis.pipeline()
                    .hincrby(_key('user_cache', res.user_id), 'following', 1)
                    .hincrby(_key('user_cache', res.followed_id), 'followers', 1)
                    .exec();
                break;
            case 'user_unfollow_action' :
                redis.pipeline()
                    .hincrby(_key('user_cache', res.user_id), 'following', -1)
                    .hincrby(_key('user_cache', res.followed_id), 'followers', -1)
                    .exec();
                break;
            default:
                break;
        }
    });

    /**
     * https://stackoverflow.com/questions/34328422/how-to-get-followers-following-listing-from-mysql-query/34328625#34328625
     * SELECT DISTINCT
     *     f.user_id, o.following, e.follower
     * FROM
     *     user_followers f
     *         LEFT JOIN
     *     (SELECT
     *         u.user_id, COUNT(DISTINCT u.follow_user_id) AS following
     *     FROM
     *         user_followers u
     *     GROUP BY u.user_id) AS o ON f.user_id = o.user_id
     *         LEFT JOIN
     *     (SELECT
     *         u.follow_user_id, COUNT(DISTINCT u.user_id) AS follower
     *     FROM
     *         user_followers u
     *     GROUP BY u.follow_user_id) AS e ON f.user_id = e.follow_user_id
     */

    redis.get('user_cache_status').then(value => {
        if (_.isEmpty(value))
            _bootstrap_user_follows();
    });

};

exports.pub = pub;
