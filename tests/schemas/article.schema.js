'use strict';

const joi = require('joi'),
    p_empty = ['', null];

const article = joi.object().keys({
    id: joi.number().integer().required(),
    author_id: joi.number().integer().required(),
    creation_date: joi.string().trim().allow(p_empty).required(),
    picture: joi.string().trim().allow(p_empty).required(),
    read_time: joi.number().integer().required(),
    title: joi.string().trim().allow(p_empty).required(),
    text: joi.string().trim().allow(p_empty).required(),
    views: joi.number().integer().required(),
    tags: joi.any().allow([(joi.string().trim().allow(p_empty),
        joi.array().items(joi.string().trim().allow(p_empty)))])
});

const tags = joi.object().keys({
    id: joi.number().integer().required(),
    name: joi.string().trim().allow(p_empty).required(),
    creation_date: joi.string().trim().allow(p_empty).required(),
});

module.exports.tag_list = joi.object().keys({
    tags: joi.array().items(tags)
});

module.exports.list = joi.object().keys({
    articles: joi.array().items(article)
});