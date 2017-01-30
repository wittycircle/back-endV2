/**
 * Created by rdantzer on 30/01/17.
 */

'use strict';

exports.login = {
    'email': {
        notEmpty: true,
        isEmail: {
            errorMessage: 'validation.email.invalid'
        }
    },
    'password': {
        notEmpty: true,
        errorMessage: 'validation.password.invalid'
    }
};