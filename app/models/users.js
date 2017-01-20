/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';
//TO_DO: create associated test, using mocha or avajs

const { db, TABLES } = require('./index');

const getProfileOfUser = (id) => {
    return db.from(TABLES.USER_PROFILES).where({id: id});
};

exports.getUserShare = (id) => {
	return db.select(['social_share'])
			.from(TABLES.USERS).where({'id': id});
};

exports.updateUserShare = (id) => {
    return db.update({social_share: 1})
    		.from(TABLES.USERS)
    		.where({id: id});
};

exports.getUsersValidateMail = (token) =>  {
	return db.select(['user_email'])
			.from(TABLES.ACCOUNT_VALIDATION)
			.where({token:token})
}

//ValidateAccount
exports.getToken = (token) => {
	return db.select(['token'])
			.from(TABLES.ACCOUNT_VALIDATION)
			.where({token: token})
}

exports.updateValidEmail = (email) => {
	return db.update({valid: 1})
			.from(TABLES.USERS)
			.where({email: email})
}

exports.deleteValidationToken = (token) => {
	return db.del()
			.where({token: token})
			.from(TABLES.ACCOUNT_VALIDATION)
}
//----
//Log 

 exports.getFirstLog = (id) => {
 	return db.select(['value'])
 			.from(TABLES.FIRST_LOG)
 			.where({user_id: id})
 }

exports.updateFirstLog = (id) => {
	return db.update({value: 1})
			.from(TABLES.FIRST_LOG)
			.where({user_id: id})
}

exports.getUserFromProfile = (id) => {
	return db.select(['id', 'username'])
			.from(TABLES.USERS)
			.where({profile_id: id})
}

exports.getAllProfiles = (id) => {
	return db.from(TABLES.USER_PROFILES)
			.where({id: id})
}
// ----
//not done till //===****==
exports.getUser = (id) => {
    return db.from(TABLES.USERS).where({id: id});
};

exports.getUsers = () => {
    return db.from(TABLES.USERS);
};

exports.getUserProfile = (id) => {
    exports.getUser(id).then(user => {
        return getProfileOfUser(user.id);
    })
};

exports.getUserByEmail = (email) => {
    return db.select(['id', 'profile_id']).from(TABLES.USERS).where({email: email});
}
//===****==