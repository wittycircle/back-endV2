/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const config = require('../private'),
    knex = require('knex')(config.database);

exports.db = knex;

exports.TABLES = {
    USERS: 'users',
    USER_PROFILES: 'profiles'
};