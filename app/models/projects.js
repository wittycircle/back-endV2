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

exports.getProject = (id) => {
	const pr_array = [
		'pr.id', 'pr.title', 'pr.picture', 'pr.description',
		'pr.about', 'pr.video'
	],
	x = [];
	return db.select(pr_array).count('l.id as follower_count')
			.from(TABLES.PROJECTS + ' as pr')	
			.join(TABLES.PROJECT_LIKES + ' as l', 'pr.id', 'l.project_id')
			.where('pr.id', id)
			.then( (r) => {
			r = r[0]
			x.push(exports.getProjectDiscussion(id).then(rr => {r.discussions = rr}));
			x.push(exports.getProjectOpenings(id).then(rr => {r.openings = rr}));
			x.push(getMembers(id).then(rr=> r.members = rr));
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

exports.getProjectDiscussion = (id) => {
	let replies =(id) =>  db.select( 'id', 'user_id', 'creation_date', 'message')
			.from(TABLES.PROJECT_DISCUSSION_REPLIES).where('project_discussion_id', id)

	let like = (id) => db.select('user_id', 'creation_date')
			.from(TABLES.PROJECT_DISCUSSION_LIKES).where({'project_discussion_id': id})

	let rep_like = (id) => db.select('user_id', 'creation_date')
			.from(TABLES.PROJECT_REPLY_LIKES).where({'project_reply_id': id})

	return db.from(TABLES.PROJECT_DISCUSSION + ' as pr')
		.select(['id', 'user_id', 'pr.title', 'pr.message', 'pr.creation_date'])
		.where({'pr.project_id': id})
		.groupBy('pr.project_id')
		.then(r => {
			let x = []
			let y = []
			r.forEach(el => {
				x.push(like(el.id).then(rr=> el.likes = rr))
				x.push(replies(el.id).then(rr => {
					rr.forEach(i => {y.push(rep_like(i.id).then(rr => {return i.likes = rr })) });
					return (el.replies = rr); 
				})) 
			});
			return Promise.all(x)
				.then(()=> {
					return Promise.all(y).then(() =>{return r})
				})
		})
};
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

