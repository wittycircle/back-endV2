/**
 * Created by rdantzer on 21/03/17.
 */

'use strict';


const AUTH_MODE = exports.AUTH = {
    PRIVATE: 1,
    PUBLIC: 2
};

const session = require('../middlewares/session').session,
    match = new RegExp(/^Bearer\s?([a-zA-Z0-9]{64})/);

exports.auth = (privilege) => (req, res, next) => {
    console.log(req.get('Authorization'));
    let authorization = match.exec(req.get('Authorization'));
    console.log(authorization);
    if (authorization.length !== 2 && privilege === AUTH_MODE.PRIVATE)
        next({code: 400});
    else
        session.getUser(authorization[1], (err, user) => {
            if (err) next({code: 400});
            else {
                req.user = user;
                next();
            }
        })
};
