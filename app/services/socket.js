/**
 * Created by rdantzer on 22/02/17.
 */

'use strict';

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', client => {
        console.log(client)
    })
};
