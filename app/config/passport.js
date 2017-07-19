/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';
const mailer = require('../services/mailer');

const Strategy = {
	local: require('passport-local').Strategy,
	facebook: require('passport-facebook').Strategy,
	google: require('passport-google-oauth').OAuth2Strategy,
	bearer: require('passport-http-bearer').Strategy
},
	_ = require('lodash'),
	bcrypt = require('bcrypt-nodejs'),
	session = require('../middlewares/session').session,
	account = require('../models/account'),
	users = require('../models/users'),
	config = require('../private').social_auth; //automatically selects prod or dev config

const { db, TABLES } = require('../models');
const social = require('../services/social');

module.exports = function(passport) {
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((token, done) => {
		session.getUser(token, done);
	});

	passport.use(
		new Strategy.bearer(
			{
				session: true
			},
			(token, done) => {
				session.getUser(token, function(err, resp) {
					if (err) return done(err);
					if (_.isEmpty(resp)) return done(null, false);
					else return done(null, resp);
				});
			}
		)
	);

	const oauth_helper = {
		logon: (req, user, profile, origin) => {
			if (user.length) {
				user = user[0];
				return {
					id: user.id,
					profile_id: user.id,
					email: user.email
				};
			} else {
                mailer.welcome({ email: user.email, token: 'social' });
				return account.socialRegister(req, profile, origin).then(r => r);
			}
		}
	};

	passport.use(
		new Strategy.facebook(
			{
				passReqToCallback: true,
				clientID: config.facebook.clientID,
				clientSecret: config.facebook.clientSecret,
				callbackURL: config.facebook.callbackURL,
				profileFields: [
					'id',
					'email',
					'gender',
					'link',
					'locale',
					'name',
					'timezone',
					'updated_time',
					'verified',
					'photos',
					'displayName',
					'friends'
				]
			},
			(req, accessToken, refreshToken, profile, done) => {
				profile.accessToken = accessToken; // ici je passe accessToken au profile
				users
					.getUserBySocialId(profile.id, 'facebook')
					.then(user => oauth_helper.logon(req, user, profile, 'facebook'))
					.then(data => {
						data.ip = req.ip;
						done(null, data);
					})
					.catch(err => done(err));
			}
		)
	);

  passport.use(
    new Strategy.google(
      {
        passReqToCallback: true,
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
      },
      (req, accessToken, refreshToken, profile, done) => {
        users
          .getUserBySocialId(profile.id, 'google')
          .then(user => oauth_helper.logon(req, user, profile, 'google'))
          .then(data => {
            // social
            //   .gmailContactsCampaign(accessToken)
            //   .then(contacts => {
            //     console.log(contacts);
            //     contacts = contacts || [];
            //     return db('invitations')
            //       .distinct('mail_to')
            //       .whereIn('mail_to', contacts)
            //       .then(result => _.difference(contacts, result));
            //   })
            //   .then(mailList => mailer.invite_user({ mailList, uid: data.id }));
            data.ip = req.ip;
            return done(null, data);
          })
          .catch(err => done(err));
      }
    )
  );

						users
							.getUserBySocialId(profile.id, 'google')
							.then(user => oauth_helper.logon(req, user, profile, 'google'))
							.then(data => {
								// social
								// 	.gmailContactsCampaign(accessToken)
								// 	.then(contacts => {
								// 		console.log(contacts);
										// contacts = contacts || [];
										// return db('invitations')
										// .distinct('mail_to')
										// .whereIn('mail_to', contacts)
										// .then(result => _.difference(contacts, result));
									// })
									// .then(mailList => mailer.invite_user({ mailList, uid: data.id }));
								data.ip = req.ip;
								return done(null, data);
							})
							.catch(err => done(err));
					})
			}
		)
	);

	passport.use(
		new Strategy.local(
			{
				usernameField: 'email',
				// session: true,
				passReqToCallback: true
			},
			(req, email, password, done) => {
				users
					.getUserBy({ email: email })
					.then(user => {
						if (!user.length) return done(null, false);
						else user = user[0];
						if (bcrypt.compareSync(password, user.password)) {
							return done(null, {
								id: user.id,
								profile_id: user.profile_id,
								email: email,
								ip: req.ip
							});
						} else return done(null, false);
					})
					.catch(err => done(err));
			}
		)
	);
};
