/**
 * Created by rdantzer on 22/03/17.
 */

'use strict';

const NAMESPACE = 'rest:update',
    Redis = require('ioredis'),
    config = require('../private').redis,
    redis = Redis(config),
    pub = Redis(config);

const send = (channel, payload) => {
    process.nextTick(() => {
        payload.when = Date.now();
        pub.publish(`${NAMESPACE}:${channel}`, JSON.stringify(payload))
    })
};

exports.mount = (req, res, next) => {
    if (process.env.NO_SOCKET === true) {
        console.error('req.broadcastEvent set to stdout');
        req.broadcastEvent = (channel, payload) => console.log(`Event: ${channel}`, payload);
    } else {
        req.broadcastEvent = send
    }
    next();
};

