/**
 * Created by rdantzer on 21/03/17.
 */

'use strict';

const _ = require('lodash');

const AUTH_MODE = exports.AUTH = {
		PRIVATE: 1,
		PUBLIC: 2
};

const passport = require('passport');

exports.auth = (privilege) => (req, res, next) => passport.authenticate('bearer', function (err, user, info) {
		if (err) next(err);
		else if (_.isEmpty(user) && privilege === AUTH_MODE.PRIVATE)
				next({code: 403});
		else
				req.logIn(user, err => {
						if (err && privilege === AUTH_MODE.PRIVATE) next(err);
						else {
								if (typeof user.id !== 'undefined')
										req.broadcastEvent('user_activity', {id: user.id, route: req.originalUrl});
								next();
						}
				})
})(req, res, next);
