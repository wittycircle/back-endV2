const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('./app/models/helper');
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

