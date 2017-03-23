/**
 * Created by rdantzer on 22/03/17.
 */

'use strict';

const NAMESPACE = 'rest:update',
    events = [
        'article_creation',
        'article_like',
        'discussion_like',
        'discussion_reply',
        'discussion_reply_like',
        'discussion_reply_update',
        'opening_creation',
        'profile_update',
        'project_creation',
        'project_up',
        'project_update',
        'ranking',
        'user_follow',
        'user_offline',
        'user_online',
        'user_register'
    ].map(event => `${NAMESPACE}:${event}`),
    Redis = require('ioredis'),
    config = require('../private').redis,
    redis = Redis(config),
    pub = Redis(config);

exports.watch = () => {
    redis.subscribe(events, (err, count) => {
        if (err) console.error(err);
        else console.log(`EVENT BUS: connected to ${count} channels: ${events.concat(',')}`)
    })
};

const send = (channel, payload) => {
    pub.publish(`${NAMESPACE}:${channel}`, JSON.stringify(payload))
    .then(() => {
        console.log("TOTOTOTOTOTOOTOTOTOTO")
        return null});
};

exports.mount = (req, res, next) => {
    req.broadcastEvent = send;
    // req.broadcastEvent = console.log
    next();
};

