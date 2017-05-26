/**
 * Created by rdantzer on 31/01/17.
 */

'use strict';

const Joi = require('joi'),
  common = require('./common'),
  p_empty = ['', null],
  p_status = ['any', 'tips', 'teammate', 'mentor'];

const discussion = Joi.object().keys({
  title: Joi.string().trim().allow(p_empty),
  message: Joi.string().trim().allow(p_empty).required()
});

const opening = Joi.object().keys({
  skill: Joi.string().trim().allow(p_empty),
  status: Joi.string().trim().allow(p_status).required(),
  description: Joi.string().trim().allow(p_empty),
  tags: Joi.string().trim().allow(p_empty)
});

module.exports.opening = opening;
module.exports.discussion = discussion;

module.exports.creation = Joi.object().keys({
  title: Joi.string().trim().allow(p_empty).required(),
  category: Joi.number().integer().required(),
  location: common.location.required(),
  status: Joi.string().trim().required(),
  picture: Joi.string().trim().allow(p_empty) /*.required()*/,
  video: Joi.string().trim().allow(p_empty) /*.required()*/,
  description: Joi.string().trim().allow(p_empty) /*.required()*/,
  about: Joi.string().trim().allow(p_empty) /*.required()*/,
  network: Joi.string().trim().allow(p_empty) /*.required()*/,
  project_visibility: Joi.boolean() /*.required()*/,
  members: Joi.array().items(Joi.number().integer() /*.required()*/),
  openings: Joi.array().items(opening),
  discussions: Joi.array().items(discussion)
});

module.exports.update = Joi.object().keys({
  title: Joi.string().trim().allow(p_empty),
  location: common.location,
  category: Joi.number().integer(),
  picture: Joi.string().trim().allow(p_empty),
  picture_card: Joi.string().trim().allow(p_empty),
  video: Joi.string().trim().allow(p_empty),
  description: Joi.string().trim().allow(p_empty),
  about: Joi.string().trim().allow(p_empty),
  network: Joi.string().trim().allow(p_empty),
  link: Joi.string().trim().allow(p_empty),
  app: Joi.string().trim().allow(p_empty),
  logo: Joi.string().trim().allow(p_empty),
  public: Joi.boolean(),
  project_visibility: Joi.boolean()
});
