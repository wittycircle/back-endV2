/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const Redis = require('ioredis'),
    redis = new Redis(require('../private').redis),
    fmt = require('util').format,
    {models, TABLES} = require('../models');

const formats = {
    client: 'client:%s',
    token: 'tokens:%s',
    user: 'users:%s'
};

module.exports = {
    debug: true,
    model: {
        getAccessToken: (bearerToken) => {
            return redis.hgetall(fmt(formats.token, bearerToken))
                .then(token => {
                    if (!token)
                        return;
                    return {
                        accessToken: token.accessToken,
                        clientId: token.clientId,
                        expires: token.accessTokenExpiresOn,
                        userId: token.userId
                    };
                });
        },
        getClient: (clientId, clientSecret) => {
            // return redis.hgetall(fmt(formats.client, clientId))
            //     .then(function (client) {
            //         if (!client || client.clientSecret !== clientSecret) {
            //             return;
            //         }
//todo fix this mess
                    return {
                        clientId: 'wittycircle_js_client',
                        clientSecret: 'r-qi3qwopejdslkcz-tg'
                    };
                // });
        },
        getRefreshToken: (bearerToken) => {
            return redis.hgetall(fmt(formats.token, bearerToken))
                .then(function (token) {
                    if (!token) {
                        return;
                    }

                    return {
                        clientId: token.clientId,
                        expires: token.refreshTokenExpiresOn,
                        refreshToken: token.accessToken,
                        userId: token.userId
                    };
                });
        },
        getUser: (email, password) => {
            console.log(email, password);
            return models('users')
                .select(['email', 'password'])
                .where('email', email)
            .then(user => {
                if (!user || password !== user.password) {
                    return;
                }
                return {
                    id: email
                };
            });
        },
        saveToken: (token, client, user) => {
            const data = {
                accessToken: token.accessToken,
                accessTokenExpiresAt: token.accessTokenExpiresAt,
                clientId: client.id,
                refreshToken: token.refreshToken,
                refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                userId: user.id
            };

            return Promise.all([
                redis.hmset(fmt(formats.token, token.accessToken), data),
                redis.hmset(fmt(formats.token, token.refreshToken), data)
            ]).return(data);
        }
    }
    };