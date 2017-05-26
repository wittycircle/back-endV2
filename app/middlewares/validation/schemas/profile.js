/**
 * Created by rdantzer on 31/01/17.
 */

'use strict';

const Joi = require('joi'), common = require('./common');

const profile_update = Joi.object().keys({
  first_name: Joi.string().alphanum().trim().min(1).max(64).optional(),
  last_name: Joi.string().alphanum().trim().min(1).max(64).optional(),
  about: Joi.string().max(10000).optional(),
  description: Joi.string().optional(),
  profile_picture: Joi.string().optional(),
  cover_picture: Joi.string().optional(),
  genre: Joi.string().optional(),
  location: common.location.required(),
  network: Joi.string().optional()
});

exports.update = profile_update;
// exports.update = Joi.object().keys({
//   profile: profile_update
// });

exports.location = Joi.object().keys({
  location: common.location.required()
});
