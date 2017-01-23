/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router();

/**
 * @apiDefine AuthToken
 * @apiSuccess {Object} auth
 * @apiSuccess {String} auth.token Bearer token for current session
 */

router
    .route('/auth/local')
    /**
     * @api {post} /auth/local Local strategy
     * @apiName LocalAuth
     * @apiGroup Auth
     *
     * @apiParam {String}       email          User email
     * @apiParam {String}       password       User password
     *
     * @apiUse AuthToken
     */
    .post();

router
    .route('/auth/facebook')
    /**
     * @api {get} /auth/facebook Facebook Oauth
     * @apiName FacebookAuth
     * @apiGroup Auth
     *
     *
     * @apiUse AuthToken
     */
    .post();

router
    .route('/auth/google')
    /**
     * @api {get} /auth/facebook Google Oauth2
     * @apiName GoogleAuth
     * @apiGroup Auth
     *
     * @apiUse AuthToken
     */
    .post();