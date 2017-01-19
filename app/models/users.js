/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const { db, TABLES } = require('./index');

const getProfileOfUser = (id) => {
    return db.from(TABLES.USER_PROFILES).where({id: id});
};

exports.getUser = id => {
    return db.from(TABLES.USERS).where({id: id});
};

exports.getUsers = () => {
    return db.from(TABLES.USERS);
};

exports.getUserProfile = id => {
    exports.getUser(id).then(user => {
        return getProfileOfUser(user.id);
    })
};

exports.getUserShare = id => {
	return db.select(['social_share']).from(TABLES.USERS).where({'id': id});
};

exports.updateUserShare = id => {
    return db.update({social_share: 1}).from(TABLES.USERS).where({id: id});
};

exports.getUserByEmail = email => {
    return db.from(TABLES.USERS).where({email: email});
};

