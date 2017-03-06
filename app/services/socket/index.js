/**
 * Created by rdantzer on 06/03/17.
 */

'use strict';

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {

        console.log(`ws: ${socket.id} just logged in`);

        io.on('user::message', data => io.emit('server::notification', data));

        io.emit('server::notification', {
            type: 'login',
            message: `hello ${socket.id}`
        });
    });

};
