/**
 * Created by rdantzer on 14/03/17.
 */

'use strict';

/**
 * Promise helper
 * @param fn {function} callback fun
 * @param data
 */
exports.promisify = (fn, data) => {
    return new Promise((resolve, reject) => {
        if (typeof fn !== 'function') reject('fn must be a function');
        if (typeof data === 'undefined') {
            fn((err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        } else {
            fn(data, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        }
    })
};