/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router();

router
    .route('/auth/local')
    /**
     * @api {post} /auth/local Local strategy
     * @apiName LocalAuth
     * @apiGroup Auth
     *
     * @apiParam {Object}       auth
     * @apiParam {String}       auth.email          User email
     * @apiParam {String}       auth.password       User password
     *
     * @apiSuccess {Object} auth
     * @apiSuccess {String} auth.token  Bearer token for current session
     */
    .post();

router.route('/auth/facebook')
    /**
     * @api {get} /auth/facebook Facebook Oauth
     * @apiName FacebookAuth
     * @apiGroup Auth
     *
     * @apiSuccess {Object} auth
     * @apiSuccess {String} auth.token  Bearer token for current session
     *
     */
    .post();

router.route('/auth/google')
/**
 * @api {get} /auth/facebook Google Oauth2
 * @apiName GoogleAuth
 * @apiGroup Auth
 *
 * @apiSuccess {Object} auth
 * @apiSuccess {String} auth.token  Bearer token for current session
 *
 */
    .post();