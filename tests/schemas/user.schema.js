const joi = require('joi');


const success_schema = joi.object().keys({
    success: joi.boolean().invalid(false).required()
});

exports.user_schema = joi.object().keys({
	success: joi.boolean().valid(true).required()

});