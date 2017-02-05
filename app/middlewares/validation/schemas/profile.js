/**
 * Created by rdantzer on 31/01/17.
 */

'use strict';

const Joi = require('joi');

const profile_update = Joi.object().keys({
    first_name: Joi.string().alphanum().trim().min(1).max(64).optional(),
    last_name: Joi.string().alphanum().trim().min(1).max(64).optional(),
    about: Joi.string().max(10000).optional()
});

const location_update = Joi.object().keys({
	country: Joi.string().alphanum().trim().min(1).max(64).optional(),
	city: Joi.string().alphanum().trim().min(1).max(64).optional(),
	state: Joi.string().alphanum().trim().min(1).max(64).optional()
}).or('country', 'city', 'state')

exports.update = Joi.object().keys({
	profile: profile_update,
})

exports.location = Joi.object().keys({
	location: location_update.required()
})