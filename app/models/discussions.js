const { db, TABLES } = require('./index'),
		h = require('./helper');

// ------------------ Project Discussions ------------------

exports.updateProjectDiscussion = (discussion_id, message, title, uid) => {
	return h.owner(TABLES.PROJECT_DISCUSSION, discussion_id, uid).then(r => {
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
// ------------------ Reply ------------------
exports.getDiscussionReplies = (discussion_id) => {
	let rep_like = (id) => db.select('user_id', 'creation_date')
					.from(TABLES.PROJECT_REPLY_LIKES).where({'project_reply_id': id})

		return db.select([ 'rep.id', 'user_id', 'p.fullName', 'p.username', 'p.profile_picture',
							 'creation_date', 'message'])
			.from(TABLES.PROJECT_DISCUSSION_REPLIES + ' as rep')
			.join(h.sub_profile, 'p.uid', 'rep.user_id')
			.where('project_discussion_id', discussion_id)
			.then(r => {
				let x = []
				r.forEach(el => {
					x.push((rep_like(el.id).then(rr => {return el.likes = rr })) )
				});
				return Promise.all(x).then(()=> {return r})
			})
};


exports.replyDiscussion = (discussion_id, uid, message) => {
		return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
		if (!r.length) 
			return "Invalid discussion id"
		else {
	return db(TABLES.PROJECT_DISCUSSION_REPLIES)
		.insert({user_id: uid, project_discussion_id: discussion_id, message: message})
		}
	});
};

// ------------------ Like ------------------
exports.likeDiscussion = (discussion_id, uid) => {
	return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
		if (!r.length) 
			return "Invalid discussion id"
		else {
			return db(TABLES.PROJECT_DISCUSSION_LIKES).first('id')
				.where({project_discussion_id: discussion_id, user_id: uid})
			.then(r => {
				if (!r)
				return db(TABLES.PROJECT_DISCUSSION_LIKES)
					.insert({project_discussion_id: discussion_id, user_id: uid})
				else 
				return db(TABLES.PROJECT_DISCUSSION_LIKES)
					.del()
					.where({project_discussion_id: discussion_id, user_id: uid})
			})
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
