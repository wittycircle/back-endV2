const { db, TABLES } = require('./index'),
		h = require('./helper');

// ------------------ Project Discussions ------------------

exports.updateProjectDiscussion = (discussion_id, message, title) => {
	return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
		if (!r.length){
			return "could not create project dicussion"
		} else{
		return db(TABLES.PROJECT_DISCUSSION)	
			.update({message: message, title: title})
			.where({id: discussion_id})
		}
	})
};

exports.removeProjectDiscussion = (discussion_id) => {
	return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
		if (!r.length) 
			return "Invalid discussion id"
		else {
			return db(TABLES.PROJECT_DISCUSSION) 
				.del() 
				.where({id: discussion_id}) 
		} 
	});
};

exports.replyDiscussion = (discussion_id, uid, messsage) => {
		return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
		if (!r.length) 
			return "Invalid discussion id"
		else {
	return db(TABLES.PROJECT_DISCUSSION_REPLIES)
		.insert({user_id: uid, project_discussion_id: discussion_id, message: message})
		}
	});
};

exports.updateReplyDiscussion = (discussion_id, uid, messsage) => {
		return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
		if (!r.length) 
			return "Invalid discussion id"
		else {
			return db(TABLES.PROJECT_DISCUSSION_REPLIES) 
				.update({message: message}) 
				.where({user_id: uid, project_discussion_id: discussion_id})
		}
	});
};

exports.likeDiscussion = (discussion_id, uid) => {
	return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
		if (!r.length) 
			return "Invalid discussion id"
		else {
			return db(TABLES.PROJECT_DISCUSSION_LIKES)
					.insert({project_discussion_id: discussion_id, user_id: uid})
		}
	});
};

exports.unlikeDiscussion = (discussion_id, uid) => {
	return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
		if (!r.length) 
			return "Invalid discussion id"
		else {
			return db(TABLES.PROJECT_DISCUSSION_LIKES)
					.del()
					.where({project_discussion_id: discussion_id, user_id: uid})
		}
	});
};
