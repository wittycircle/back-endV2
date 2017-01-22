/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

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

        console.log('%s %s %s', req.method, req.path, body.length > 512 ? body.length + ' Response to big for terminal output' : body);
        
        oldEnd.apply(res, arguments);
    };
    next();
};