// /**
//  * Created by rdantzer on 08/02/17.
//  */

// 'use strict';

// /**
//  * Rebuilds the complete sql query
//  * @param query
//  */

// const _ = require('lodash');

// module.exports = function(query) {
//     let sql = query.sql;
//     _.forEach(query.bindings, binding => {
//         sql.replace('\?', binding);
//     });

//     return sql;
// };