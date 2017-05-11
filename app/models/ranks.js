/**
 * Created by rdantzer on 10/05/17.
 */

const Redis = require('ioredis');
const config = require('../private').redis;

const redis = Redis(config);
const { db, TABLES } = require('../models');

const getUserRank = id => redis.lrange(`rank:${id}`, 1, 1);

const getUserRanks = (id, qty = -1) => redis.lrange(`rank:${id}`, 0, qty);
