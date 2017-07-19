const { db, TABLES } = require('./index'), h = require('./helper');

exports.updateReplyDiscussion = (reply_id, uid, message) => {
	return h.owner(TABLES.DISCUSSION_MESSAGES, reply_id, uid).then(r => {
		if (!r.length) return 'Invalid discussion id';
		else {
			return db(TABLES.DISCUSSION_MESSAGES)
				.update({ message: message })
				.where({ id: reply_id });
		}
	});
};

exports.removeReplyDiscussion = (reply_id, uid) => {
	return h.owner(TABLES.DISCUSSION_MESSAGES, reply_id, uid).then(r => {
		if (!r.length) return 'Invalid id';
		else {
			return db(TABLES.DISCUSSION_MESSAGES).del().where({ id: reply_id });
		}
	});
};

exports.likeReply = (reply_id, uid) => {
	return h.exist(TABLES.DISCUSSION_MESSAGES, reply_id).then(r => {
		if (!r.length) return 'Invalid id';
		else {
			return db(TABLES.DISCUSSION_LIKES)
				.first('id')
				.where({ message_id: reply_id, user_id: uid })
				.then(r => {
					if (!r)
						return db(TABLES.DISCUSSION_LIKES).insert({
							message_id: reply_id,
							user_id: uid
						});
					else
						return db(TABLES.DISCUSSION_LIKES)
							.del()
							.where({ message_id: reply_id, user_id: uid });
				});
		}
	});
};

exports.unlikeReply = (reply_id, uid) => {
	return h.owner(TABLES.DISCUSSION_MESSAGES, reply_id, uid).then(r => {
		if (!r.length) return 'Invalid id';
		else {
			return db(TABLES.DISCUSSION_LIKES)
				.del()
				.where({ message_id: reply_id, user_id: uid });
		}
	});
};
