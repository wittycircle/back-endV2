/**
 * Created by rdantzer on 06/03/17.
 */

'use strict';

const Redis = require('ioredis')(require('../../private').redis),
    redis = new Redis();

const detail = {
    room_formatter: (owner, name) => `room::${owner}::${name}`,
    message_formatter: (from, to) => `message::${from}::${to}`
};

class RedisMultiBuilder {
    get query() {
        return this._query;
    }

    constructor() {
        this._query = [];
    }

    set(key, value) {
        this._query.push(['set', key, value]);
        return this;
    }
}

exports.createRoom = (owner, name) => {
};

exports.joinRoom = (user_id, name) => {

};

exports.leaveRoom = (user_id, name) => {

};

exports.add = user_id => {

};

exports.message = (from, to, message) => {
    let builder = new RedisMultiBuilder();
    redis
        .multi(
            builder
                .set(detail.message_formatter(from, to, message), message)
                .query
        )
        .exec();
};