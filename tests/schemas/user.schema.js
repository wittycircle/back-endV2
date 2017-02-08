const joi = require('joi');

const success_schema = joi.object().keys({
    success: joi.boolean().invalid(false).required()
});

const create_user_schema = joi.object().keys({
    id: joi.number().integer().required(),
    profile_id: joi.number().integer().required()
});

const p_skill = joi.object().keys({
    id: joi.number().integer().required(),
    name: joi.string().trim().required(),
    category: joi.string().trim().required()
});

exports.user_schema = joi.object().keys({
    // success: joi.boolean().valid(true).required(),
    user: create_user_schema
});

exports.skills = joi.object().keys({
    skills: joi.array().items(p_skill)
});