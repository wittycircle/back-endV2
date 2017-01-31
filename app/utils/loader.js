/**
 * Created by rdantzer on 31/01/17.
 */

'use strict';

const _ = require('lodash');

exports.requireDir = (dirname, object) => {
    fs
        .readdirSync(dirname)
        .filter(file => file.indexOf(".") !== 0 && (file !== "index.js"))
        .forEach(file => {
            object[file.substr(0, -3)] = require(dirname + '/' + file);
        });
};