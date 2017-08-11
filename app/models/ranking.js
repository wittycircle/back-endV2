/**
 * Created by rdantzer on 26/05/17.
 */

const { redis } = require('../models');

const keys = {
	ranks: 'ranking',
	userRank: id => `user:${id}:points`
};

/**
 * Get the rank of one or multiple users
 * @param {Number | Number[]} id - The user(s) id
 * @returns {Promise<Number> | Promise<Number[]>} - The rank(s)
 */
// exports.get = id => redis.zrevrank(keys.ranks, i).then(r => r + 1);
exports.get = id => redis.zrevrank(keys.ranks, i).then(r => r + 1);

/**
 * Set the points of one user
 * @param {Number} id  - The user id
 * @param {Number} score  - The associated score
 * @example Promise.all([[1, 10], [2, 11]].map(([a, b]) => ranking.set(a, b)));
 */
exports.set = (id, score) => redis.zadd(keys.ranks, score, id);

/**
 * Increments the points of one user
 * @param {Number} id  - The user id
 * @param {Number} quantity - An amount of point
 */
exports.incr = (id, quantity) => redis.zincrby(keys.ranks, quantity, id);

exports.getPointHistory = (id, from, to = -1) =>
	redis.zrange(keys.userRank(id), from, to === -1 ? Date.now() : to);
