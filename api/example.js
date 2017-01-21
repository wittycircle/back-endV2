/**
 * Created by rdantzer on 21/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router();

router
    .route('/users/:id')
    /**
     * @api {get} /users/:id Read data of user
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id The User's id
     *
     * @apiSuccess {Object} user            User data
     * @apiSuccess {Number} user.id         User id
     * @apiSuccess {Number} user.profile_id User profile
     *
     */
    .get()
    /**
     * @api {put} /users/:id Update data of user
     * @apiName PutUser
     * @apiGroup User
     *
     * @apiParam {Number} id The User's id
     *
     * @apiSuccess {Object} user            User data
     */
    .put();

router
    .route('/users')
    /**
     * @api {get} /users Get user list
     * @apiName GetUsers
     * @apiGroup User
     *
     * @apiSuccess {Object[]} users             User list
     * @apiSuccess {Number} users.id            User id
     * @apiSuccess {Number} users.profile_id    User profile
     */
    .get();
