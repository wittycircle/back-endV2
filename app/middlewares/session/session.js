/**
 * Created by rdantzer on 23/01/17.
 */

'use strict';

const loglevel = process.env.RS_LOGLEVEL || 'dev',
    Redis = require('redis-sessions'),
    rs = new Redis(require('../../private/index').redis),
    _ = require('lodash'),
    express = require('express'),
    app = express(),
    router = express.Router();

if (loglevel !== 'none') {
    app.use(require('morgan')(loglevel));
}

const rsapp = 'wittycircle',
    ttl = 3600;

/**
 * Get all current sessions within the last deltaT seconds
 * @param deltaT (default 60)
 * @param cb
 */
exports.getUniqueActiveUsers = (deltaT, cb) => {
    if (typeof deltaT === 'undefined') {
        cb = deltaT;
        deltaT = 60;
    }
    rs.activity({
        app: rsapp,
        dt: deltaT
    }, cb)
};

/**
 * Create a new session with optional data field
 * @param {Object} user
 * @param user.ip
 * @param user.id
 * @param cb
 * @param optional
 */
exports.createUserSession = (user, cb, optional) => {
    let params = {
        app: rsapp,
        id: user.id,
        ttl: ttl,
        ip: user.ip
    };
    if (_.keys(optional).length) {
        params = _.extend(params, {
            d: optional
        })
    }
    rs.create(params, cb);
};

/**
 * Get user id for token
 */
exports.getUser = (token, cb) => {
    rs.get({
        app: rsapp,
        token: token
    }, cb)
};

/**
 * Set optional data fields for token
 */
exports.updateFromToken = (token, data, cb) => {
    rs.set({
        app: rsapp,
        token: token,
        d: data || null
    }, cb)
};

/**
 * Get all sessions within the last deltaT seconds
 */
exports.getAllSessions = (deltaT, cb) => {
    if (typeof deltaT === 'undefined') {
        cb = deltaT;
        deltaT = 60;
    }
    rs.soapp({
        app: rsapp,
        dt: deltaT
    }, cb)
};

/**
 * Get all sessions of a single id within an app
 */
exports.getAllSessionsFromUser = (id, cb) => {
    rs.soid({
        app: rsapp,
        id: id
    }, cb)
};

/**
 * Kill a single session
 */
exports.killSession = (token, cb) => {
    rs.kill({
        app: rsapp,
        token: token
    }, cb)
};

/**
 * Kill all session of user
 */
exports.killAllFromUser = (id, cb) => {
    rs.killsoid({
        app: rsapp,
        id: id
    }, cb)
};

/**
 * Kill everything!!!
 */
exports.killAll = (cb) => {
    rs.killall({
        app: rsapp
    }, cb)
};

/**
 * Ping redis-sessions
 * @param cb callback
 */
exports.ping = (cb) => {
    rs.ping(cb);
};