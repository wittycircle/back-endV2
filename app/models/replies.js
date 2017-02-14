const { db, TABLES } = require('./index'),
		h = require('./helper');

exports.updateReplyDiscussion = (reply_id, uid, message) => {
		return h.owner(TABLES.PROJECT_DISCUSSION_REPLIES, reply_id, uid).then(r => {
		if (!r.length) 
			return "Invalid discussion id"
		else {
			return db(TABLES.PROJECT_DISCUSSION_REPLIES) 
				.update({message: message}) 
				.where({id: reply_id})
		}
	});
};

exports.removeReplyDiscussion = (reply_id, uid) => {
	return h.owner(TABLES.PROJECT_DISCUSSION_REPLIES, reply_id, uid).then(r => {
		if (!r.length)
			return "Invalid id"
		else{
		return db(TABLES.PROJECT_DISCUSSION_REPLIES) 
			.del() 
			.where({id: reply_id})
		}
	})
};

exports.likeReply = (reply_id, uid) => {
	return h.exist(TABLES.PROJECT_DISCUSSION_REPLIES, reply_id).then(r => {
		if (!r.lentgth)
			return "Invalid id"
		else{
			return db(TABLES.PROJECT_REPLY_LIKES)
				.insert({project_reply_id: reply_id, user_id: uid})
		}
	});
};

exports.unlikeReply = (reply_id, uid) => {
	return h.exist(TABLES.PROJECT_DISCUSSION_REPLIES, reply_id).then(r => {
		if (!r.lentgth)
			return "Invalid id"
		else{
			return db(TABLES.PROJECT_REPLY_LIKES)
				.del()
				.where({project_reply_id: reply_id, user_id: uid})
		}
	});
};
