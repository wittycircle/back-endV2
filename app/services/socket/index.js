/**
 * Created by rdantzer on 06/03/17.
 */

'use strict';

const _ = require('lodash'),
    channels = {
        NOTIFICATION: 'server::notification',
        ONLINE: 'room::online::visitor',
        ONLINE_AUTH: 'room::online',
        ONLINE_FRIENDS: 'room::online::friends'
    };

const client = {
    pub: [
        {
            name: 'tg',
            fn: console.log
        }

    ],
    sub: []
};

module.exports = server => {
    const io = require('socket.io')(server, {
        serveClient: false
    });

    require('./auth')(io);
};
