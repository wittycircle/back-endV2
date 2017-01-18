/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const config = require('../private'),
    knex = require('knex')(config.database);

let BaseModel = function(tableName) {
    this.tableName = tableName;
};

/**
 * Get all table entries
 * @param cb (err, data) => {}
 * @param fields ['a', 'b']
 */
BaseModel.prototype.findAll = function (cb, fields) {
    if (typeof fields === 'undefined') fields = '*';

    knex.select(fields).from(this.tableName).then(results => {
        cb(null, results);
    }).catch(error => {
        cb(error);
    })
};

/**
 * Get table entry related to id
 * @param cb (err, data) => {}
 * @param id number
 * @param fields ['a', 'b']
 */
BaseModel.prototype.findById = function (cb, id, fields) {
    if (typeof id !== 'number')  throw 'id must be a number';
    if (typeof fields === 'undefined') fields = '*';

    knex.select(fields).from(this.tableName).where({
        id: id
    }).then(result => {
        cb(null, result);
    }).catch(error => {
        cb(error);
    })
};


/**
 * Model factory
 */
module.exports = (table) => {
    return new BaseModel(table);
};