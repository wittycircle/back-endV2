'use strict';

const {db, TABLES} = require('./index'),
    _ = require('lodash'),
    h = require('./helper');
// ------------------ Little helpers ------------------
exports.checkUsername = (username) => {
    return db(TABLES.USERS)
        .select('username')
        .whereIn('username', username)
};

// ------------------ Main methods ------------------
exports.activate = (token) => {
    return db(TABLES.ACCOUNT_VALIDATION).select('user_email').where('token', token)
        .then((r) => {
            if (!r.length) {
                return "Bad token"
            } else {
                return Promise.all([
                    db(TABLES.USERS).first('email').where('email', r[0].user_email),
                    db(TABLES.USERS).update({valid: 1}).where('email', r[0].user_email),
                    db(TABLES.ACCOUNT_VALIDATION).del().where('token', token)
                ]);
            }
        });
};

// ------------------ SOCIAL ------------------
const social_helper = {
    'facebook': (data) => {
        return {
            profile: {
                facebook_id: data.id,
                facebook_url: data.profileUrl,
                first_name: data.name.givenName,
                last_name: data.name.familyName,
                profile_picture: data.photos[0].value
            },
            user: {
                email: data.emails[0].value,
                username: _.escape(data.displayName)
            }
        }
    },
    'google': (data) => {
        data = JSON.parse(data._raw);
        return {
            profile: {
                google_id: data.id,
                google_url: data.url,
                first_name: data.name.givenName,
                last_name: data.name.familyName,
                profile_picture: data.image.url
            },
            user: {
                email: data.emails[0].value,
                username: _.escape(data.displayName)
            }
        }
    }
};

exports.socialRegister = (data, origin) => {
    console.log(data);
    const helper = social_helper[origin](data);
    return db(TABLES.USER_PROFILES)
        .insert(helper.profile)
        .then((profileId) => {
            helper.user.profile_id = profileId;
            helper.user.password = '';
            db(TABLES.USERS).insert(helper.user)
        })
};
// ------------------ END SOCIAL ------------------

exports.register = (data, token) => {
    let profile_data = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
        },
        user_data = {
            email: data.email,
            password: data.password,
            username: data.username,
        };

    return h.exist(TABLES.USERS, "data.email", 'email').then(r => {
        if (r.length)
            return "Email already taken"
        else {
            return db(TABLES.USER_PROFILES).insert(profile_data)
                .then((profileId) => {
                    user_data.profile_id = profileId[0];
                    return db(TABLES.USERS).insert(user_data)
                        .then(() => db(TABLES.ACCOUNT_VALIDATION).insert({user_email: data.email, token: token}))
                });
        }
    })
};

exports.resetPassword = (token, email, password) => {
    return db(TABLES.RESET_PASSWORDS).first('id')
        .where({user_email: email, token: token})
        .then(r => {
            if (!r)
                return "bad email"
            else {
                return db(TABLES.USERS).update({password: password})
                    .where({email: email})
            }
        });
};

exports.recoverPassword = (email, token) => {
    return db(TABLES.USERS).first('id')
        .where('email', email)
        .then(user => {
            if (!user)
                return "Invalid email"
            else {
                return db(TABLES.RESET_PASSWORDS)
                    .insert({user_email: email, user_id: user.id, token: token})
            }
        })
};

exports.updatePassword = (password, uid) => {
    return h.exist(TABLES.USERS, uid).then(r => {
        if (!r.length)
            return "bad user id"
        else {
            return db(TABLES.USERS).update({password: password})
                .where({id: uid})
        }
    });
};

