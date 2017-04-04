const joi = require('joi'),
    p_empty = ['', null];


const detail = joi.object().keys({
    id: joi.number().integer().required(),
    first_name: joi.string().trim().allow(p_empty).required(),
    last_name: joi.string().trim().allow(p_empty).required(),
    about: joi.string().trim().allow(p_empty).required(),
    description: joi.string().trim().allow(p_empty).required()
});

const p_like = joi.object().keys({
    count: joi.number().integer().required(),
    who: joi.array().items(detail)
});

module.exports.success = joi.object().keys({
    success: joi.only(true).required()
});

module.exports.likes = joi.object().keys({
    like: p_like
});

module.exports.upvotes = joi.object().keys({
    upvotes: p_like
});

module.exports.id = joi.object().keys({
    id: joi.number().integer().required()
});

module.exports.detail = detail;
