const { db, TABLES } = require('./index'),
		h = require('./helper');
//discussions

exports.createProjectDiscussion = (pid, message, title, uid) => {
	return h.exist(TABLES.PROJECTS, pid).then(r => {
		if (!r.length){
			return "could not create project dicussion"
		} else{
		return db(TABLES.PROJECT_DISCUSSION)	
			.insert({project_id: pid, user_id: uid, message: message, title: title})
		}
	})
};

exports.removeProjectDiscussion = (pid, discussion_id) => {
	return h.exist(TABLES.PROJECTS, pid).then(r => {
		if (!r.length)
			return "Invalid project id"
		else{
			return h.exist(TABLES.PROJECT_DISCUSSION, discussion_id).then(r => {
				if (!r.length)
					return "Invalid discussion id"
				else {
					return db(TABLES.PROJECT_DISCUSSION)
						.del()
						.where({project_id: pid, id: discussion_id})
				}
			})
		}
	})
};

exports.getProjectDiscussion = (id) => {
	let replies =(id) =>  db.select( 'id', 'user_id', 'creation_date', 'message')
			.from(TABLES.PROJECT_DISCUSSION_REPLIES).where('project_discussion_id', id)

	let like = (id) => db.select('user_id', 'creation_date').from(TABLES.PROJECT_DISCUSSION_LIKES).where({'project_discussion_id': id})

	let rep_like = (id) => db.select('user_id', 'creation_date').from(TABLES.PROJECT_REPLY_LIKES).where({'project_reply_id': id})

	return db.from(TABLES.PROJECT_DISCUSSION + ' as pr')
		.select(['id', 'pr.title', 'pr.message', 'pr.creation_date'])
		.where({'pr.project_id': id})
		.groupBy('pr.id')
		.then(r => {
			let x = []
			r.forEach(el => {
				x.push(like(el.id).then(rr=> el.like = rr))
				x.push(replies(el.id).then(rr=> {
					el.replies = rr
					el.replies.forEach(i => {
						x.push(rep_like(i.id).then(rr => i.like = rr))
					})
				}))
			});
			return Promise.all(x)
			.then((x)=> {
			// 	r.forEach(el => if (el.replies) {
			// 		el.replies.forEach()
			// 	})
				console.log("VALUE OF X IS ", x)
				 return r})
		})
};

// exports.getProjectDiscussionReplies = (id) => {
// 	 return db.select('project_discussion_id', 'user_id', 'message')
// 		.from(TABLES.PROJECT_DISCUSSION_REPLIES)
// 		.where('project_discussion_id', id)
// 		.as('rep')
// }

//likes
exports.getProjectLikes = (project_id) => {
	return db.select(h.p_array)
		.from(TABLES.PROJECT_LIKES + ' as pl')
		.join(TABLES.PROJECTS + ' as pj', 'pj.id', 'pl.follow_project_id')
		.join(h.u_profile, 'p.uid', 'pl.user_id')
		.where({'pj.id': project_id})
		.groupBy('p.id')
};

exports.likeProject = (project_id, uid) => {
	return h.exist(TABLES.PROJECTS, project_id).then(r => {
		if (r.length){
			return db(TABLES.PROJECT_LIKES) 
				.insert({
                    user_id: uid,
                    follow_project_id: project_id
				}); 
			}
		}); 
};

exports.unlikeProject = (project_id, uid) => {
	return db(TABLES.PROJECT_LIKES)	.del()
			.where({
				user_id: uid, 
				follow_project_id: project_id 
			})
};

exports.getFromProjectNetwork = (need, cond) => {
	return db(TABLES.PROJECT_NETWORK)
		.select(need)
		.where(cond)
};

exports.updateProjectNetwork = (info, cond) => {
	return db(TABLES.PROJECT_NETWORK)
		.update(info)
		.where(cond)
};

