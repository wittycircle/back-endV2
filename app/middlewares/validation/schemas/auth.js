/**
 * Created by rdantzer on 30/01/17.
 */

'use strict';

const Joi = require('joi');

exports.local = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
});
