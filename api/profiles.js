/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const express = require('express'),
    router = express.Router();

/**
 * @apiDefine ProfileId
 * @apiParam {Number} id The Profile's id
 */

/**
 * @apiDefine ProfileLike
 * @apiSuccess {Object} like
 * @apiSuccess {Number} like.count              Like count
 * @apiSuccess {Number[]} like.who              List of profile (who likes this profile)
 */

/**
 * @apiDefine ProfileListStub
 * @apiSuccess {Object[]} profiles               Profile list
 * @apiSuccess {Number} profiles.id              Profile id
 * @apiSuccess {String} profiles.first_name      User first name
 * @apiSuccess {String} profiles.last_name       User last name
 * @apiSuccess {String} profiles.profession      User profession
 * @apiSuccess {String} profiles.picture         User profile picture
 */

/**
 * @apiDefine ProfileStub
 * @apiSuccess {Object} profile
 * @apiSuccess {Number} profile.id              Profile id
 * @apiSuccess {String} profile.first_name      User first name
 * @apiSuccess {String} profile.last_name       User last name
 * @apiSuccess {String} profile.profession      User profession
 * @apiSuccess {String} profile.picture         User profile picture
 */

router
    .route('/profiles')
    /**
     * @api {get} /profiles Get profile list
     * @apiName GetProfiles
     * @apiGroup Profile
     *
     * @apiUse ProfileListStub
     */
    .get()
    /**
     * @api {post} /profiles Create profile
     * @apiName CreateProfile
     * @apiGroup Profile
     */
    .post();

router
    .route('/profiles/:id')
    /**
     * @api {get} /profiles/:id Get profile
     * @apiName GetProfile
     * @apiGroup Profile
     *
     * @apiUse ProfileId
     *
     * @apiUse ProfileStub
     */
    .get()
    /**
     * @api {put} /profiles/:id Update profile
     * @apiName UpdateProfile
     * @apiGroup Profile
     *
     * @apiUse ProfileId
     *
     * @apiPermission owner
     */
    .put();

router
    .route('/profiles/:id/like')
    /**
     * @api {get} /profiles/:id/like Get profile likes
     * @apiName GetProfileLikes
     * @apiGroup Like
     *
     * @apiUse ProfileId
     * @apiUse ProfileLike
     */
    .get()
    /**
     * @api {post} /profiles/:id/like Like profile
     * @apiName LikeProfile
     * @apiGroup Like
     *
     * @apiUse ProfileId
     *
     */
    .post()
    /**
     * @api {delete} /profiles/:id/like Remove like from profile
     * @apiName UnlikeProfile
     * @apiGroup Like
     *
     * @apiUse ProfileId
     *
     */
    .delete();