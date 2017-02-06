const joi = require('joi');


const success_schema = joi.object().keys({
    success: joi.boolean().invalid(false).required()
});

const create_user_schema = joi.object().keys({
	id: joi.number().integer().required(),
	profile_id: joi.number().integer().required()
});

exports.user_schema = joi.object().keys({
	// success: joi.boolean().valid(true).required(),
	user: create_user_schema

});