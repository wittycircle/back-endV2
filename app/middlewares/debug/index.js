/**
 * Created by rdantzer on 08/02/17.
 */

'use strict';

const _ = require('lodash'),
    pretty = require('prettyjson'),
    sqlColorize = require('./colors'),
    {db} = require('../../models');

db.on('query', (query) => {
    console.log(sqlColorize(query))
});

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
        try {
            console.log(pretty.render({
                method: req.method,
                path: req.url,
                body: JSON.parse(body)
            }, {
                maxArraySize: 2
            }));
            oldEnd.apply(res, arguments);
        } catch (tg) {
            console.log(body);
            oldEnd.apply(res, arguments);
        }
    };
    next();
};