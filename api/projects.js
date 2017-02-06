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
 * @apiDefine OpeningId
 * @apiParam {Number} opening_id The Opening's id
 */

/**
 * @apiDefine DiscussionId
 * @apiParam {Number} discussion_id The Discussion's id
 */

/**
 * @apiDefine ProjectLike
 * @apiSuccess {Object} upvotes
 * @apiSuccess {Number} upvotes.count              Upvote count
 */

/**
 * @apiDefine ProjectStub
 * @apiSuccess {Object} project                         Project detail
 * @apiSuccess {Number} project.id                      Project id
 * @apiSuccess {String} project.title                   Project title
 * @apiSuccess {String} project.picture                 Project picture
 * @apiSuccess {String} project.description             Project description
 * @apiSuccess {String} project.post                    Project post
 * @apiSuccess {String} project.video                   Project video url
 * @apiSuccess {Object[]} project.owners                Project owners
 * @apiSuccess {Number} project.owners.id               User id
 * @apiSuccess {String} project.owners.first_name       User first name
 * @apiSuccess {String} project.owners.last_name        User last name
 * @apiSuccess {Number} project.followers_count         Followers count
 * @apiSuccess {Object[]} project.feedbacks             Feedbacks
 * @apiSuccess {Number} project.feedbacks.id            Feedback id
 * @apiSuccess {Object[]} project.openings              Openings
 * @apiSuccess {Number} project.opening.id              Opening id
 *
 */

/**
 * @apiDefine ProjectListStub
 * @apiSuccess {Object[]} projects                      Project list
 * @apiSuccess {Number} projects.id                     Project id
 * @apiSuccess {String} projects.title                  Project title
 * @apiSuccess {String} projects.description            Project description
 * @apiSuccess {String} projects.picture_card           Project picture card url
 * @apiSuccess {Object} projects.category               Category
 * @apiSuccess {Number} projects.category.id            Category id
 * @apiSuccess {String} projects.category.name          Category name
 * @apiSuccess {Object[]} projects.owners               Project owners
 * @apiSuccess {Number} projects.owners.id              User id
 * @apiSuccess {String} projects.owners.first_name      User first name
 * @apiSuccess {String} projects.owners.last_name       User last name
 * @apiSuccess {Number} projects.followers_count        Followers count
 * @apiSuccess {String="idea", "draft", "beta", "live"} projects.status             Project status
 * @apiSuccess {Object} projects.location               Project location
 * @apiSuccess {String} projects.location.country       Location country
 * @apiSuccess {String} projects.location.city          Location city
 * @apiSuccess {String} projects.location.state         Location state
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     projects: [
 *          {
 *              id: 132,
 *              title: "Recast.ai",
 *              description: "Des bails",
 *              owners: [{
 *                  id: 229,
 *                  first_name: "Jasmine",
 *                  last_name: "Anteunis"
 *              }],
 *              category: {
 *                  id: 16,
 *                  name: "Technology"
 *              }
 *              followers_count: 512,
 *              status: "live",
 *              location: {
 *                  country: "France",
 *                  state: "",
 *                  city: "Paris"
 *              }
 *          },
 *          {
 *              id: 133,
 *              title: "Wizpay",
 *              description: "Des bails belges",
 *              owners: [{
 *                  id: 241,
 *                  first_name: "Maximilien",
 *                  last_name: "Le jeune"
 *              }],
 *              category: {
 *                  id: 16,
 *                  name: "Technology"
 *              }
 *              followers_count: 64,
 *              status: "beta",
 *              location: {
 *                  country: "Bruges",
 *                  state: "",
 *                  city: "Belgium"
 *              }
 *          },
 *          ...
 *     ]
 * }
 */

/**
 * @apiDefine ProjectOpeningStub
 * @apiSuccess {Object} opening                 Opening
 * @apiSuccess {String} opening.created_at      Creation date
 * @apiSuccess {String} opening.skill           Opening skill
 * @apiSuccess {String} opening.status          Opening status
 * @apiSuccess {String} opening.description     Opening description
 * @apiSuccess {String[]} opening.tags          Opening tag array
 */

/**
 * @apiDefine ProjectOpeningListStub
 * @apiSuccess {Object[]} openings              Opening array
 * @apiSuccess {String} openings.created_at      Creation date
 * @apiSuccess {String} openings.skill           Opening skill
 * @apiSuccess {String} openings.status          Opening status
 * @apiSuccess {String} openings.description     Opening description
 * @apiSuccess {String[]} openings.tags          Opening tag array
 */

/**
 * @apiDefine ProjectOpeningCreationStub
 * @apiParam {String} skill                                             Opening skill
 * @apiParam {String = "any", "tips", "teammate", "mentor"} status      Opening status
 * @apiParam {String} description                                       Opening description
 */

/**
 * @apiDefine ProjectDiscussionCreationStub
 * @apiParam {String} message               Discussion message
 * @apiParam {String} title                 Discussion title
 */

/**
 * @apiDefine ProjectDiscussionStub
 * @apiSuccess {Object} discussion                  Discussion
 * @apiSuccess {String} discussion.title            Discussion title
 * @apiSuccess {String} discussion.message          Discussion message
 * @apiSuccess {String} discussion.creation_date    Discussion creation date
 * @apiSuccess {Object[]} discussion.replies        Discussion replies
 */

router
    .route('/projects')
    /**
     * @api {get} /projects Get project list
     * @apiName GetProjects
     * @apiGroup Project
     *
     * @apiUse ProjectListStub
     *
     */
    .get()
    /**
     * @api {post} /projects Create project
     * @apiName CreateProject
     * @apiGroup Project
     *
     * @apiPermission logged
     */
    .post();

router
    .route('/projects/:id')
    /**
     * @api {get} /projects/:id Get project detail
     * @apiName GetProject
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiUse ProjectStub
     *
     */
    .get()
    /**
     * @api {put} /projects/:id Update project
     * @apiName UpdateProject
     * @apiGroup Project
     *
     * @apiUse ProjectId
     */
    .put()
    /**
     * @api {delete} /projects/:id Delete project
     * @apiName RemoveProject
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiPermission owner
     * @apiUse Success
     */
    .delete();

router
    .route('/projects/:id/upvote')
    /**
     * @api {get} /projects/:id/up Get project upvotes
     * @apiName GetProjectUps
     * @apiGroup Upvote
     *
     * @apiUse ProjectId
     * @apiUse ProjectLike
     * @apiPermission logged
     *
     */
    .get()
    /**
     * @api {post} /projects/:id/up Upvote project
     * @apiName UpProject
     * @apiGroup Upvote
     *
     * @apiUse ProjectId
     * @apiPermission owner
     * @apiUse Success
     */
    .post()
    /**
     * @api {delete} /projects/:id/up Un-upvote project
     * @apiName DeUpProject
     * @apiGroup Upvote
     *
     * @apiUse ProjectId
     * @apiPermission owner
     * @apiUse Success
     */
    .delete();


router
    .route('/projects/:id/openings')
    /**
     * @api {get} /projects/:id/openings Get project openings
     * @apiName GetProjectOpenings
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiUse ProjectOpeningListStub
     */
    .get()
    /**
     * @api {post} /projects/:id/openings Create new opening
     * @apiName CreateProjectOpening
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiPermission owner
     * @apiUse ProjectOpeningCreationStub
     */
    .post();

router
    .route('/projects/:id/openings/:opening_id')
    /**
     * @api {put} /projects/:id/openings/:opening_id Update opening
     * @apiName UpdateProjectOpening
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiUse OpeningId
     * @apiUse ProjectOpeningStub
     * @apiPermission owner
     */
    .put()
    /**
     * @api {delete} /projects/:id/openings/:opening_id Delete opening
     * @apiName RemoveProjectOpening
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiUse OpeningId
     * @apiUse Success
     * @apiPermission owner
     */
    .delete();

router
    .route('/projects/:id/discussions')
    /**
     * @api {get} /projects/:id/discussions Get project discussions
     * @apiName GetProjectDiscussions
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiUse ProjectDiscussionStub
     *
     */
    .get()
    /**
     * @api {post} /projects/:id/discussions Create a new project discussion
     * @apiName CreateProjectDiscussion
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiPermission owner
     * @apiUse ProjectDiscussionCreationStub
     */
    .post();

router
    .route('/projects/:id/discussions/:discussion_id')
    /**
     * @api {put} /projects/:id/discussions/:discussion_id Update discussion
     * @apiName UpdateProjectDiscussion
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiUse DiscussionId
     * @apiPermission owner
     */
    .put()
    /**
     * @api {delete} /projects/:id/discussions/:discussion_id Delete discussion
     * @apiName RemoveProjectDiscussion
     * @apiGroup Project
     *
     * @apiUse ProjectId
     * @apiUse DiscussionId
     * @apiUse Success
     * @apiPermission owner
     */
    .delete();