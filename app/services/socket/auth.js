/**
 * Created by rdantzer on 09/03/17.
 */

'use strict';

const _ = require('lodash'),
    session = require('../../middlewares/session').session;

/**
 * Promise helper
 * @param fn {function} callback fun
 * @param data
 */
const promisify = (fn, data) => {
    return new Promise((resolve, reject) => {
        if (typeof fn !== 'function') reject('fn must be a function');
        if (typeof data === 'undefined') {
            fn((err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        } else {
            fn(data, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        }
    })
};

const connection = {
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
    authenticate: data => promisify(session.getUser, data.token),
    postAuthenticate: (socket, data) => console.log(socket, data)
};

module.exports = io => {
    _.each(io.nsps, connection.forbid);
    io.on('connection', socket => {

        const notification = require('./notification').notify(socket);

        console.log(`${socket.id} just connected`);

        socket.auth = false;

        socket.on('authentication', data => {

            console.log(`${socket.id} is authenticating`);

            connection.authenticate(data)
                .then(success => {
                    socket.auth = true;
                    let restore = _.partialRight(connection.restore, socket);
                    _.each(io.nsps, restore);

                    notification('c', 'Connected', {
                        id: socket.id
                    });

                    console.log(`${socket.id} is now connected`);
                })
                .catch(err => {
                    console.error(err);
                    notification('c', 'Unauthorized', {
                        code: 403
                    })
                })
        });

        socket.on('disconnect', () => console.log(`${socket.id} disconnected`));

        socket.on('statistics', () => {
            return Promise.all([
                new Promise((ok, ko) => {
                    io.of('room::online::visitor').clients((err, res) => {
                        if (err) ko(err);
                        else ok(res);
                    })
                }),
                new Promise((ok, ko) => {
                    io.of('room::online').clients((err, res) => {
                        if (err) ko(err);
                        else ok(res);
                    })
                }),
                promisify(session.getUniqueActiveUsers, 3600)
            ])
                .then(data => notification('n:statistics', 'Statistics',
                    _.zipObject(['visitors', 'guests', 'sessions'], _.map(data, _.toJSON))))
                .catch(console.error);
        });
    })
};