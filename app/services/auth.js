/**
 * Created by rdantzer on 21/03/17.
 */

'use strict';


const AUTH_MODE = exports.AUTH = {
    PRIVATE: 1,
    PUBLIC: 2
};

const passport = require('passport');

exports.auth = (privilege) => (req, res, next) => passport.authenticate('bearer', {session: false}, function (err, user, info) {
    if (err) next(err);
    else if (!user && privilege === AUTH_MODE.PRIVATE)
        next({code: 400});
    else
        req.logIn(user, err => {
            if (err && privilege === AUTH_MODE.PRIVATE) next(err);
            else next();
        })
})(req, res, next);
