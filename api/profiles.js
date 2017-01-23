/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router();

router
    .route('/profiles')
    .get()
    .post();

router
    .route('/profiles/:id')
    .get()
    .put();

router
    .route('/profiles/:id/like')
    .post()
    .delete();

router
    .route('/profiles/:id');