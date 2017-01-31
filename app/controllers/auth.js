/**
 * Created by rdantzer on 19/01/17.
 */
const passport = require('passport'),
    session = require('../middlewares/session').session,
    user = require('../models/users'),
    schemas = require('../middlewares/validation').schemas,
    _ = require('lodash');

'use strict';

exports.checkLog = (req, res) => {
    res.send({success: req.isAuthenticated()})
};

exports.logout = (req, res) => {
    if (typeof req.user !== 'undefined')
        session.killAllFromUser(req.user.id, (err, result) => {
            if (err) throw (err);
            else
                res.send({success: true});
        });
};

exports.localLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            res.status(400).json({
                tg: 'tg'
            });
        else if (_.isEmpty(user))
            res.status(400).json({
                error: 'malformed_request',
                error_description: 'Your request is invalid'
            });
        else
            req.logIn(user, err => {
                if (err) res.status(400).json({
                    error: 'malformed_request',
                    error_description: 'Your request is invalid'
                });
                else
                    res.json({
                        auth: _.pick(req.session.passport.user, ['token']),
                        user: _.pick(req.user, ['id', 'profile_id', 'email'])
                    });
            });
    })(req, res, next);
};

exports.resetPassword = (req, res) => {
    const token = crypto.randomBytes(20).toString('hex'),
    const link = 'https://www.wittycircle.com/password/reset/' + token;

	user.getFromUser(['id'], {email: req.body.email_reset})	
	.then(r => {
		if (!r.length) {
			res.status(400).send({message: "No account with this email"});
		} else {
			user.resetPass({token: token, user_id: r[0].id, user_email: req.body.email_reset})
			.then(res.send({success: true}))
		}
	}).catch((e) => console.error(e))
	//mail stuff to do
}

exports.getUserForResetPassword = (req, res) => {
	user.getUserReset(['token', 'user_id', 'user_email'], {token: req.param.token})
	.then(r => {
		if (!r.length) {
			res.status(404).send({message: 'You are not authorized to make this action.'});
		} else {
			res.send({data: r, message: 'Password Changed !'});
		}
	}).catch((e) => console.error(e))
}     


















