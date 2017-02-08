/**
 * Created by rdantzer on 08/02/17.
 */

'use strict';

/**
 * Highly adapted from
 * https://github.com/pomahtuk/sequilize-highlight/blob/master/index.js
 * @param text SQL query
 * @returns {string} colorized output
 */
const _ = require('lodash'),
    chalk = require('chalk'),
    queryFormat = require('./query');

module.exports = (query) => {
    let text = query.sql;

    const keyWords = [
        'PRAGMA', 'CREATE', 'EXISTS', 'INTEGER', 'PRIMARY', 'VARCHAR',
        'DATETIME', 'NULL', 'REFERENCES', 'AND', 'AS', 'ASC', 'INDEX_LIST',
        'BETWEEN', 'BY', 'CASE', 'CURRENT_DATE', 'CURRENT_TIME', 'DELETE',
        'DESC', 'DISTINCT', 'EACH', 'ELSE', 'ELSEIF', 'FALSE', 'FOR', 'FROM',
        'GROUP', 'HAVING', 'IF', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS',
        'JOIN', 'KEY', 'KEYS', 'LEFT', 'LIKE', 'LIMIT', 'MATCH', 'NOT',
        'ON', 'OPTION', 'OR', 'ORDER', 'OUT', 'OUTER', 'REPLACE', 'TINYINT',
        'RIGHT', 'SELECT', 'SET', 'TABLE', 'THEN', 'TO', 'TRUE', 'UPDATE',
        'VALUES', 'WHEN', 'WHERE', 'UNSIGNED', 'CASCADE', 'UNIQUE', 'DEFAULT',
        'ENGINE', 'TEXT', 'auto_increment', 'SHOW', 'INDEX', 'INNER'
    ];

    const lineBreak = [
        'SELECT', 'WHERE', 'DELETE', 'IF', 'ELSE', 'INSERT', 'OR', 'INNER', 'LEFT', 'RIGHT'
    ];

    // just store original
    // to  compare for
    let newText = text;

    // regex time
    // looking fo defaults
    newText = newText.replace(/Executing \(default\): /g, '');

    //numbers - same color as strings
    newText = newText.replace(/(\d+)/g, chalk.green('$1'));

    // special chars
    newText = newText.replace(/(=|%|\/|\*|-|,|;|:|\+|<|>)/g, chalk.yellow('$1'));

    //strings - text inside single quotes and backticks
    newText = newText.replace(/(['`].*?['`])/g, chalk.green('$1'));

    //functions - any string followed by a '('
    newText = newText.replace(/(\w*?)\(/g, chalk.red('$1') + '(');

    //brackets - same as special chars
    newText = newText.replace(/([\(\)])/g, chalk.yellow('$1'));

    let i;
    //reserved mysql keywords

    const line_break = (keyword) => {
        return _.find(lineBreak, (item) => item == keyword) ? '\n' : '';
    };

    for (i = 0; i < keyWords.length; i += 1) {
        /**
         * regex pattern will be formulated based on the array values surrounded by word boundaries.
         * since the replace function does not accept a string as a regex pattern, we will use a regex object this time
         */

        const regEx = new RegExp('\\b' + _.upperCase(keyWords[i]) + '\\b', 'gi');
        newText = newText.replace(regEx, line_break(keyWords[i]) + chalk.red.bold(keyWords[i]));
    }

    _.forEach(query.bindings, binding => {
        newText = newText.replace('\?', chalk.blue(binding));
    });

    return newText;

};