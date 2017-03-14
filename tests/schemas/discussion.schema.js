'use strict';

const joi = require('joi'),
    p_empty = ['', null];

const p_likes = joi.object().keys({
    user_id: joi.number().integer().required(),
    creation_date: joi.string().trim().allow(p_empty).required()
});

const p_replies = joi.object().keys({
    id: joi.number().integer().required(),
    user_id: joi.number().integer().required(),
    creation_date: joi.string().trim().allow(p_empty).required(),
    message: joi.string().trim().allow(p_empty).required(),
    likes: joi.array().items(p_likes)
});

module.exports.replies = joi.object().keys({
    replies: joi.array().items(p_replies)
});