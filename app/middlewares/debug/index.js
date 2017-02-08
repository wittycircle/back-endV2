/**
 * Created by rdantzer on 08/02/17.
 */

'use strict';

const _ = require('lodash'),
    pretty = require('prettyjson'),
    sqlColorize = require('./colors'),
    {db} = require('../../models');

db.on('query', (query) => console.log(sqlColorize(query.sql)));

exports.resDebugger = (req, res, next) => {
    let oldWrite = res.write,
        oldEnd = res.end;

    let chunks = [];

    res.write = function (chunk) {
        chunks.push(new Buffer(chunk));
        oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk)
            chunks.push(new Buffer(chunk));
        const body = Buffer.concat(chunks).toString('utf8');
        console.log('%s %s %s', req.method, req.path, pretty.render(_.truncate(body, {
            length: 512,
            separator: ' '
        })));
        oldEnd.apply(res, arguments);
    };
    next();
};