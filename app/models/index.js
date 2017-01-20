/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const config = require('../private'),
    knex = require('knex')(config.database);

// if (process.env.DEBUG === true)
knex.on('query', (query) => console.log('SQL %s', query.sql));

exports.db = knex;

exports.TABLES = {
    USERS: 'users',
    USER_PROFILES: 'profiles',
    ACCOUNT_VALIDATION: 'account_validation',
    FIRST_LOG: 'first_log'
};