const { db, TABLES } = require('./index'),
		_ = require('lodash'),
		h = require('./helper');

exports.getInvitation = (id) => {
	return db(TABLES.SHARE_INVITE).select('*').where('invite_id', id)
};

exports.addInvitation = (uid, mail) => {
	return h.exist(TABLES.USERS, uid).then(r => {
		if (!r.length){
			return "Unknown user"
		} 
		let x = mail.map(e => {return {user_id: uid, invite_email: e} }) 
		return db.batchInsert(TABLES.SHARE_INVITE, x)
	})
};

exports.fromUser = (id, email) => {
	return db(TABLES.SHARE_INVITE).select('user_id').where('invite_id', id)
		.then(r => {
			if (!r.length)
				return "Unknown invite"
			return db(TABLES.INVITATION).insert({user_id: r[0],
			 status: 'registed',
			 invite_email: email
			})
		})
};
