/**
 * Created by rdantzer on 28/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router();

/**
 * @apiDefine ProjectId
 * @apiParam {Number} id The Project's id
 */

/**
 * @apiDefine ProjectLike
 * @apiSuccess {Object} like
 * @apiSuccess {Number} like.count              Like count
 * @apiSuccess {Number[]} like.who              List of profile (who likes this project)
 */


router
    .route('/projects')
    .get()
    .post();

router
    .route('/projects/:id')
    .get()
    .put()
    .delete();

router
    .route('/projects/:id/like')
    /**
     * @api {get} /projects/:id/like Get project likes
     * @apiName GetProjectLikes
     * @apiGroup Like
     *
     * @apiUse ProjectId
     * @apiUse ProjectLike
     *
     */
    .get()
    /**
     * @api {post} /projects/:id/like Like project
     * @apiName LikeProject
     * @apiGroup Like
     *
     * @apiUse ProjectId
     *
     */
    .post()
    /**
     * @api {delete} /projects/:id/like Unlike project
     * @apiName UnlikeProject
     * @apiGroup Like
     *
     * @apiUse ProjectId
     *
     */
    .delete();
