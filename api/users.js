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
     *
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
    .get()
    /**
     * @api {post} /users Create new user
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiSuccess {Object} user               User list
     * @apiSuccess {Number} user.id            User id
     * @apiSuccess {Number} user.profile_id    User profile
     */
    .post();

router
    .route('/users/:id/skills')
    /**
     * @api {get} /users/:id/skills Get user skill list
     * @apiName GetUserSkills
     * @apiGroup Skill
     *
     * @apiParam {Number} id The User's id
     *
     * @apiSuccess {Object[]}  skills                 User's skill list
     * @apiUse SkillData
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          skills: [
     *              {
     *                  id: 13,
     *                  name: "NodeJS",
     *                  category: "development"
     *              },
     *              {
     *                  id: 56,
     *                  name: "C++",
     *                  category: "development"
     *               },
     *               {
     *                  ...
     *               }
     *          ]
     *      }
     * @apiErrorExample {json} No content error
     *      HTTP/1.1 204 NO CONTENT
     *      {
     *          error: 'no_content'
     *          error_description: 'User has no skills'
     *      }
     *
     */
    .get()
    /**
     * @api {post} /users/:id/skills Add skill to user
     * @apiName AddUserSkill
     * @apiGroup Skill
     *
     * @apiParam {Number}  id The User's id
     *
     * @apiSuccess {Object[]} skills        User's updated skill list
     * @apiUse SkillData
     *
     * @apiParamExample {json} Request-Example:
     *      {
     *          id: 1337
     *      }
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 201 CREATED
     *      {
     *          skills: [
     *              {
     *                  id: 13,
     *                  name: "NodeJS",
     *                  category: "development"
     *              },
     *              {
     *                  id: 56,
     *                  name: "C++",
     *                  category: "development"
     *               },
     *               {
     *                  id: 1337,
     *                  name: "Growth hacking",
     *                  category: "marketing"
     *               }
     *          ]
     *      }
     *
     */
    .post();

router
    .route('/users/:user_id/skills/:skill_id')
    /**
     * @api {delete} /users/:id/skills/:id Remove skill from user
     * @apiName RemoveUserSkill
     * @apiGroup User
     *
     * @apiParam {Number}   user_id     The user id
     * @apiParam {Number}   skill_id    The skill id
     *
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          success: true
     *      }
     *
     */
    .delete();


