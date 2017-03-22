/**
 * Created by rdantzer on 22/03/17.
 */

'use strict';

const events = [
        'user_register',
        'user_follow',
        'opening_creation',
        'project_up',
        'project_creation',
        'ranking',
        'discussion_reply',
        'discussion_like',
        'article_creation',
        'article_like'
    ], Redis = require('ioredis'),
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
    console.log(`Published ${channel} ${payload}`);
    pub.publish(channel, JSON.stringify(payload));
};

exports.mount = (req, res, next) => {
    req.broadcastEvent = send;
    next();
};

