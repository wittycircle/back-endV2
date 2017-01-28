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

/**
 * @apiDefine UserStub
 * @apiSuccess {Object} user
 * @apiSuccess {Number} user.id             User id
 * @apiSuccess {Number} user.profile_id     User profile id
 * @apiSuccess {String} user.email          User email
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
     * @apiParamExample {json} Request-Example
     * {
     *      email: "raphael@wittycircle.com",
	 *      password: "password"
     * }
     *
     * @apiSuccessExample {json} Success-Response
     * HTTP/1.1 200 OK
     * {
     *      auth: {
     *          token: "IX0Rf0xSOEInNVm2pafUyBywCD6FMBqOootgutLiMI57IHSKrrTTd8oZiyej7nm6"
     *      },
     *      user: {
     *          id: 3719,
     *          profile_id: 3755,
     *          email: "raphael@wittycircle.com"
     *      }
     * }
     *
     *
     * @apiUse AuthToken
     * @apiUse UserStub
     *
     * @apiDescription
     * The token must be passed as a bearer token in the Authorization header, to each request needing user authentication<br>
     *
     * Token validity is <em>1 hour</em><br>
     * Eg: <code>Authorization: Bearer IX0Rf0xSOEInNVm2pafUyBywCD6FMBqOootgutLiMI57IHSKrrTTd8oZiyej7nm6</code>
     */
    .post();

router
    .route('/auth/facebook')
    /**
     * @api {post} /auth/facebook Facebook Oauth
     * @apiName FacebookAuth
     * @apiGroup Auth
     *
     *
     * @apiUse AuthToken
     * @apiUse UserStub
     *
     */
    .post();

router
    .route('/auth/google')
    /**
     * @api {post} /auth/facebook Google Oauth2
     * @apiName GoogleAuth
     * @apiGroup Auth
     *
     * @apiUse AuthToken
     * @apiUse UserStub
     */
    .post();