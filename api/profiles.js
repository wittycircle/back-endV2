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
 * @apiSuccess {String} profiles.profile_picture         User profile picture
 * @apiSuccess {String} profiles.about           About User
 * @apiSuccess {String} profiles.cover_picture   User cover picture
 */

/**
 * @apiDefine ProfileStub
 * @apiSuccess {Object} profile
 * @apiSuccess {Number} profile.id              Profile id
 * @apiSuccess {String} profile.first_name      User first name
 * @apiSuccess {String} profile.last_name       User last name
 * @apiSuccess {String} profile.profile_picture User profile picture
 * @apiSuccess {String} profile.about           About User
 * @apiSuccess {String} profile.cover_picture   User cover picture
 */

/**
 * @apiDefine ProfileUpdateStub
 * @apiParam {Object} profile                 An object containing fields to be updated
 * @apiParam {String} [profile.first_name]    User first name
 * @apiParam {String} [profile.last_name]     User last name
 * @apiParam {String} [profiles.about]        About User
 *
 */

/**
 * @apiDefine LocationStub
 * @apiSuccess {Object} location
 * @apiSuccess {String} location.country        Country
 * @apiSuccess {String} location.city           City
 * @apiSuccess {String} location.state          State
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
    .get();

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
     *
     * @apiUse ProfileUpdateStub
     * @apiUse Success
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

router
    .route('/profiles/:id/location')
    /**
     * @api {get} /profiles/:id/location Get user location
     * @apiName GetProfileLocation
     * @apiGroup Location
     *
     * @apiUse ProfileId
     *
     * @apiUse LocationStub
     *
     */
    .get()
    /**
     * @api {put} /profiles/:id/location Update profile location
     * @apiName UpdateProfileLocation
     * @apiGroup Location
     *
     * @apiUse ProfileId
     *
     * @apiPermission owner
     *
     * @apiParam {Object} location
     * @apiParam {String {..64}} [location.country] Country
     * @apiParam {String {..64}} [location.city] City
     * @apiParam {String {..64}} [location.state] State
     *
     */
    .put();