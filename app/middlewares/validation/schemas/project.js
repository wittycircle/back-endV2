/**
 * Created by rdantzer on 31/01/17.
 */

'use strict';

const Joi = require('joi'),
    detail = {
        string: Joi.string().required(),
        optstring: Joi.string()
    };

//
// exports.location = Joi.object().keys({
//     country: detail.string,
//     city: detail.string,
//     state: detail.string
// });
//
// exports.opening = Joi.object().keys({
//     skill: detail.string,
//     status: detail.string,
//     description: detail.string,
//     tags: Joi.array().items(detail.string)
// });
//
// exports.creation = Joi.object().keys({
//     title: detail.string,
//     category: detail.string.lowercase(),
//     picture: detail.optstring.url(),
//     video: detail.optstring.url(),
//     about: detail.string,
//     description: detail.string,
//     network: detail.string,
//     public: Joi.boolean().required(),
//
// });
