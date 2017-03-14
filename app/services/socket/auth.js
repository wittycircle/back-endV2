/**
 * Created by rdantzer on 09/03/17.
 */

'use strict';

const _ = require('lodash'),
    session = require('../../middlewares/session').session,
    promisify = require('../../utils').promisify;

const connection = exports.connection = {
    forbid: nsp => {
        nsp.on('connect', socket => {
            if (!socket.auth)
                delete nsp.connected[socket.id];
        })
    },
    restore: (nsp, socket) => {
        if (_.find(nsp.sockets, {id: socket.id}))
            nsp.connected[socket.id] = socket;
    },
    authenticate: data => promisify(session.getUser, data.token)
};

exports.ensureAuthentication = (io, socket, cb) => {
    const notification = require('./notification').notify(socket);

    console.log(`${socket.id} just connected`);

    socket.auth = false;

    socket.on('authentication', data => {

        console.log(`${socket.id} is authenticating`);

        connection.authenticate(data)
            .then(success => {
                socket.auth = true;
                _.each(io.nsps, nsp => connection.restore(nsp, socket));

                notification('c', 'Connected', {
                    id: socket.id
                });

                console.log(`User ${success.id} is ${socket.id}`);
                if (typeof cb !== 'undefined')
                    cb(success);
            })
            .catch(err => {
                console.error(err);
                notification('c', 'Unauthorized', {
                    code: 403
                })
            })
    });
};