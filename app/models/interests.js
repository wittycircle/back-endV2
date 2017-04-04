'use strict';

const {db, TABLES} = require('./index'),
    _ = require('lodash'),
    h = require('./helper');

exports.getList = () => {
    return db(TABLES.INTERESTS)
        .distinct('name', 'priority')
};
