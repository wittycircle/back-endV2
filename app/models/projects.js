const { db, TABLES } = require('./index'),
		_ = require('lodash'),
		h = require('./helper');

// ------------------ Projects [main methods] ------------------

exports.createProject = (project_data, members, openings, discussions) => {
	let x = []
	return db(TABLES.PROJECTS).insert(project_data)
			.then(([id]) => {
				openings.forEach(el => {
					el.project_id = id;
					x.push(exports.createOpening(el).return())
				});
				discussions.forEach(el => {
					el.project_id = id;
					el.user_id = project_data.user_id;
					x.push(exports.createProjectDiscussion(el).return())
				});
				members.forEach(el => {
					x.push(db(TABLES.PROJECT_MEMBERS).insert({project_id: id, user_id: el}).return())
				});
				return Promise.all(x)
				.then(() => {return id})
			})
};

exports.removeProject = (id) => {
	return db(TABLES.PROJECTS).del().where('id', id);
};

const getMembers = (id) => {//Not sure about this, if project contributor or project user
	const members = db.select('p.user_id as creator', 'pcr.user_id')
					.from(TABLES.PROJECT_CONTRIBUTOR + ' as pcr')
					.join(TABLES.PROJECTS + ' as p', 'p.id', 'pcr.project_id')
					.where('project_id', id).as('pcr')

	return db.distinct('p.uid as id', 'p.first_name', 'p.last_name') 
		.from(h.u_profile)
		.join(members, function() {
			this.on('p.uid', '=', 'pcr.user_id').orOn('p.uid', '=', 'creator')
		})
	};

const getFollowerCount = (id) => {
	return  db.count('project_id as count').from(TABLES.PROJECT_LIKES + ' as l') 
	 	.join(TABLES.PROJECTS + ' as p', 'p.id', 'l.project_id').where('p.id', id)
	};

exports.getProject = (id) => {
	const pr_array = [
		'pr.id', 'pr.title', 'pr.picture', 'pr.description',
		'pr.about', 'pr.video'
	],
	x = [];
const req = db.distinct(pr_array)
			.from(TABLES.PROJECTS + ' as pr')
			// .limit(27) //User see 9 at a time, so preload 2 more
			if (id)
				req.where('pr.id', id)

		return req.then( (r) => {
			r.forEach(el => {
				x.push(exports.getProjectDiscussion(el.id).then(rr => {el.discussions = rr}));
				x.push(exports.getProjectOpenings(el.id).then(rr => {el.openings = rr}));
				x.push(getMembers(el.id).then(rr => el.members = rr));
				x.push(getFollowerCount(el.id).then(rr => {el.follower_count = rr[0].count}));
			})
			return Promise.all(x)
				.then(() => r);
		});
};
// ------------------ Discussions ------------------

exports.createProjectDiscussion = (data) => {
	return h.exist(TABLES.PROJECTS, data.project_id).then(r => {
		if (!r.length){
			return "could not create project dicussion"
		} else{
		return db(TABLES.PROJECT_DISCUSSION)
			.insert(data)
		}
	})
};

//make a request whereIn from array of id, then hydrate the main object. so 4 request instead of 4 * number of
exports.getProjectDiscussion = (id) => {
	let mega_array = ['pr.id', 'pr.user_id', 'pr.title', 'pr.message', 'pr.creation_date',
			db.raw('GROUP_CONCAT (DISTINCT r.id) as rep_id'), db.raw('GROUP_CONCAT (DISTINCT r.user_id) as rep_user_id'),
			db.raw('GROUP_CONCAT (r.creation_date) as rep_creation_date'), db.raw('GROUP_CONCAT (r.message  SEPARATOR "€€¢€€") as rep_message'),
			db.raw('GROUP_CONCAT (prl_user_id) as prl_user_id'), db.raw('GROUP_CONCAT (prl_creation_date) as prl_creation_date'),
			db.raw(`GROUP_CONCAT(l_user_id) as like_user_id`), db.raw(`GROUP_CONCAT(l_creation_date) as like_creation_date`)
			];

	let p_rep = ['r.project_discussion_id', 'r.id', 'r.user_id', 'r.creation_date', 'r.message',
				db.raw('CONCAT (r.id, "-", prl.user_id) as prl_user_id'), 'prl.creation_date as prl_creation_date']

	let p_like = ['l.project_discussion_id', 'l.user_id as l_user_id', 'l.creation_date as l_creation_date']

	let reply = db.distinct(p_rep)
					.from(TABLES.PROJECT_DISCUSSION_REPLIES + ' as r')
					.leftJoin(TABLES.PROJECT_REPLY_LIKES + ' as prl', 'prl.project_reply_id', 'r.id')
					.groupBy('prl_user_id', 'r.id')
					.as('r')

	let likes = db.distinct(p_like)
		.from(TABLES.PROJECT_DISCUSSION_LIKES + ' as l')
		.groupBy('l.project_discussion_id')
		.as('l')

	return db.distinct(mega_array)
		.from(TABLES.PROJECT_DISCUSSION + ' as pr')
		.leftJoin(reply, 'pr.id', 'r.project_discussion_id')
		.leftJoin(likes, 'l.project_discussion_id', 'pr.id')
		.where({'pr.project_id': id})
		.groupBy('pr.id')
};

// exports.getProjectDiscussion = (id) => {

// 	let replies =(id) =>  db.select( 'id', 'user_id', 'creation_date', 'message')
// 			.from(TABLES.PROJECT_DISCUSSION_REPLIES).where('project_discussion_id', id)

// 	let like = (id) => db.select('user_id', 'creation_date')
// 			.from(TABLES.PROJECT_DISCUSSION_LIKES).where({'project_discussion_id': id}).as('likes')


// 	let rep_like = (id) => db.select('user_id', 'creation_date')
// 			.from(TABLES.PROJECT_REPLY_LIKES).where({'project_reply_id': id})

// 	return db.select(_.concat(['pr.id', 'pr.user_id', 'pr.title', 'pr.message', 'pr.creation_date']))
// 		.from(TABLES.PROJECT_DISCUSSION + ' as pr')
// 		.where({'pr.project_id': id})
// 		.groupBy('pr.id')
// 		.then(r => {
// 			let x = []
// 			let y = []
// 			r.forEach(el => {
// 				x.push(like(el.id).then(rr=> el.likes = rr))
// 				x.push(replies(el.id).then(rr => {
// 					rr.forEach(i => {y.push(rep_like(i.id).then(rr => {return i.likes = rr })) });
// 					return (el.replies = rr); 
// 				})) 
// 			});
// 			return Promise.all(x)
// 				.then(()=> {
// 					return Promise.all(y).then(() =>{return r})
// 				})
// 		})
// };

// exports.getProjectDiscussion = (id) => {

// 	let replies =(id) =>  db.select( 'id', 'user_id', 'creation_date', 'message')
// 			.from(TABLES.PROJECT_DISCUSSION_REPLIES).where('project_discussion_id', id)

// 	let like = (id) => db.select('user_id', 'creation_date')
// 			.from(TABLES.PROJECT_DISCUSSION_LIKES).where({'project_discussion_id': id}).as('likes')


// 	let rep_like = (id) => db.select('user_id', 'creation_date')
// 			.from(TABLES.PROJECT_REPLY_LIKES).where({'project_reply_id': id})


// 	return db.select(_.concat(['pr.id', 'pr.user_id', 'pr.title', 'pr.message', 'pr.creation_date']))
// 		.from(TABLES.PROJECT_DISCUSSION + ' as pr')
// 		.where({'pr.project_id': id})
// 		.groupBy('pr.id')
// 		.then(r => {
// 			let x = []
// 			let y = []
// 			r.forEach(el => {
// 				x.push(like(el.id).then(rr=> el.likes = rr))
// 				x.push(replies(el.id).then(rr => {
// 					rr.forEach(i => {y.push(rep_like(i.id).then(rr => {return i.likes = rr })) });
// 					return (el.replies = rr); 
// 				})) 
// 			});
// 			return Promise.all(x)
// 				.then(()=> {
// 					return Promise.all(y).then(() =>{return r})
// 				})
// 		})
// };

// ------------------ Opening ------------------
exports.createOpening = (data) => {
		return h.exist(TABLES.PROJECTS, data.project_id).then(r => {
		if (!r.length){
			return "could not create project opening"
		} else{
		return db(TABLES.PROJECT_OPENINGS)	
			.insert(data)
		}
	})
};

exports.getProjectOpenings = (id) => {
	return db.select('id', 'created_at', 'status', 'description', 'tags')
		.from(TABLES.PROJECT_OPENINGS)
		.where({project_id: id})
};

// ------------------ Likes ------------------
exports.getProjectLikes = (project_id) => {
	return db.select(h.p_array)
		.from(TABLES.PROJECT_LIKES + ' as pl')
		.join(TABLES.PROJECTS + ' as pj', 'pj.id', 'pl.project_id')
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
                    project_id: project_id
				}); 
			}
		}); 
};

exports.unlikeProject = (project_id, uid) => {
	return db(TABLES.PROJECT_LIKES)	.del()
			.where({
				user_id: uid, 
				project_id: project_id 
			})
};

// ------------------ Network ------------------
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

