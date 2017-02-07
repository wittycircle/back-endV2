/**
 * Created by rdantzer on 23/01/17.
 */

'use strict';

/**
 * @apiDefine SkillData
 * @apiSuccess {Number} skills.id        Skill id
 * @apiSuccess {String} skills.name      Skill name
 * @apiSuccess {String} skills.category  Skill category
 */
router.route('/skills')
    /**
     * @api {get} /skills Get skill list
     * @apiName GetSkills
     * @apiGroup Skill
     *
     * @apiSuccess {Object[]}   skills        Skill list
     * @apiUse SkillData
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          skills: [
     *              {
     *                  id: 1,
     *                  name: "Growth hacking",
     *                  category: "sales & marketing"
     *              },
     *              {
     *                  id: 2,
     *                  name: "NodeJS",
     *                  category: "development"
     *               },
     *               {
     *                  ...
     *               }
     *          ]
     *      }
     */
    .get()
    /**
     * @api {post} /skills Add new skill
     * @apiName CreateSkill
     * @apiGroup Skill
     *
     * @apiParam {Object[]}  skill          Skill object
     * @apiParam {String}    skill.name     Skill name
     * @apiParam {String}    skill.category Skill category
     * @apiParam {Number}    skill priority Skill priority
     *
     * @apiSuccess {Object[]}  skill          Skill object
     * @apiSuccess {Number}    skill.id       Skill id
     * @apiSuccess {String}    skill.name     Skill name
     * @apiSuccess {String}    skill.category Skill category
     * @apiSuccess {Number}    skill priority Skill priority
     *
     * @apiPermission admin
     *
     * @apiParamExample {json}  Request-Example:
     *      {
     *          skill: {
     *              name: "Growth hacking",
     *              category: "sales & marketing"
     *              priority: 3
     *          }
     *      }
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 201 CREATED
     *      {
     *          skill: {
     *              id: 1337
     *              name: "Growth hacking"
     *              category: "sales & marketing"
     *              priority: 3
     *          }
     *      }
     *
     * @apiErrorExample {json} Validation error
     *      HTTP/1.1 400 BAD REQUEST
     *      {
     *          error: 'validation_error'
     *          error_description: '"Growth hacking" is not a valid skill name'
     *      }
     *
     * @apiErrorExample {json} Conflict error
     *      HTTP/1.1 400 BAD REQUEST
     *      {
     *          error: 'content_exists'
     *          error_description: 'skill "Growth hacking" already exists'
     *      }
     *
     *
     */
    .post();

router.route('/skills/:id');