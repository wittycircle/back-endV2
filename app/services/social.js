/**
 * Created by rdantzer on 06/05/17.
 */

'use strict';

const config = require('../private');

const { db, TABLES } = require('../models');

const {Facebook} = require('fb'),
    FB = new Facebook({
        version: 'v2.9',
        appId: config.social_auth.facebook.clientID,
        appSecret: config.social_auth.facebook.clientSecret
    });

const getUsersFromFacebookIds = ids => db(`${TABLES.USER_PROFILES} as p`)
    .select('u.id')
    .innerJoin(`${TABLES.USERS} as u`, 'u.profile_id', 'p.id')
    .whereIn('p.facebook_id', ids);

const followMultiple = ids => db(`${TABLES.USER_LIKES}`);

exports.getFacebookStuff = (token, id) => {
    FB.setAccessToken(token);

    FB.api(`${id}/friends`, 'get')
        .then(res => {
            if (!res.data.length) {
                let data = res.data.map(r => r.id);
                return followMultiple(data)
            }
        })
};

exports.getGMailStuff = () => {
      
};