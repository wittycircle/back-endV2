'use strict';

const Joi = require('joi'),
  common = require('./common'),
  p_empty = ['', null],
  p_field = ['status', 'category', 'skills', 'network', 'location', 'opening'],
  p_field2 = ['status', 'category', 'skills', 'network', 'location', 'about'];

const sort = Joi.object().keys({
  field: Joi.string()
    .trim()
    .allow(p_empty)
    .required(),
  reverse: Joi.boolean()
});

const member = Joi.object().keys({
  field: Joi.string()
    .trim()
    .only(p_field)
    .required(),
  value: Joi.any().allow([
    (Joi.string()
      .trim()
      .allow(p_empty)
      .required(),
    Joi.array().items(
      Joi.string()
        .trim()
        .allow(p_empty)
        .required()
    ))
  ])
});

const member2 = Joi.object().keys({
  field: Joi.string()
    .trim()
    .only(p_field2)
    .required(),
  value: Joi.any().allow([
    (Joi.string()
      .trim()
      .allow(p_empty)
      .required(),
    Joi.array().items(
      Joi.string()
        .trim()
        .allow(p_empty)
        .required()
    ))
  ])
});

const paginate = Joi.object().keys({
  limit: Joi.number()
    .integer()
    .required(),
  offset: Joi.number()
    .integer()
    .required()
});
// ------------------ Project ------------------
const query = Joi.object().keys({
  priority: Joi.string(),
  sort: sort,
  members: Joi.array().items(member)
});

const query2 = Joi.object().keys({
  priority: Joi.string(),
  sort: sort,
  members: Joi.array().items(member2)
});

module.exports.project = Joi.object().keys({
  query: query,
  paginate: paginate
});

// ------------------ Profile ------------------
module.exports.profile = Joi.object().keys({
  query: query2,
  paginate: paginate
});
