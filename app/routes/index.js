/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

module.exports = app => {
    const express = require('express');

    fs
        .readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== 'index.js')
        })
        .forEach(file => {
            app.use(require(file)(app.Router()));
        });

};