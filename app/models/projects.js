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

exports.updateProject = (id, project_data) => {
	return db(TABLES.PROJECTS).update(project_data).where('id', id)
};

exports.removeProject = (id) => {
	return h.exist(TABLES.PROJECTS, id).then(r => {
		if (!r.length){
			return "could not remove project"
		} else{
			return db(TABLES.PROJECTS).del().where('id', id);
		}
	})
};

const getMembers = (id) => {//Not sure about this, if project contributor or project user
	const members = db.select('p.user_id as creator', 'pcr.user_id')
					.from(TABLES.PROJECT_MEMBERS + ' as pcr')
					.join(TABLES.PROJECTS + ' as p', 'p.id', 'pcr.project_id')
					.where('project_id', id).as('pcr')
					.where('pcr.n_accept', 1)

	return db.distinct(['p.uid as id', 'p.first_name', 'p.last_name',
	 db.raw('CONCAT (p.first_name, " ", p.last_name) as username')]) 
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

exports.getProjectList = () => {
	const p_array = ['pr.id', 'pr.title', 'pr.description', 'pr.picture_card', 'pr.status',
	 'c.id as category_id', 'c.name as category_name', 'p.network',
	 'p.profile_picture', 'p.uid as user_id', db.raw('CONCAT (p.first_name, " ", p.last_name) as username'),
	 db.raw('CONCAT (city, ", ", country) as location')
	 ];

	 const sub_members = db(TABLES.PROJECT_MEMBERS).select('project_id', 'user_id').where('n_accept', 1).as('m')

	 return db.select(p_array)
	 		.countDistinct('pl.id as followers')
	 		.countDistinct('m.user_id as members')
	 		.from(TABLES.PROJECTS + ' as pr')
	 		.join(h.u_profile, 'p.uid', 'pr.user_id')
	 		.join(TABLES.CATEGORIES + ' as c', 'c.id', 'pr.category_id')
	 		.leftJoin(TABLES.PROJECT_LIKES + ' as pl', 'pl.project_id', 'pr.id')
	 		.leftJoin(sub_members, 'm.project_id', 'pr.id')
	 		.whereRaw('pr.picture_card <> ""')
	 		.groupBy('pr.id')
}
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
	let replies =(id) =>  db.select([ 'rep.id', 'user_id', 'p.fullName', 'p.username', 'p.profile_picture',
							 'creation_date', 'message'])
			.from(TABLES.PROJECT_DISCUSSION_REPLIES + ' as rep')
			.join(h.sub_profile, 'p.uid', 'rep.user_id')
			.where('project_discussion_id', id)

	let like = (id) => db.distinct('user_id', 'creation_date')
			.from(TABLES.PROJECT_DISCUSSION_LIKES).where({'project_discussion_id': id}).as('likes')

	let rep_like = (id) => db.distinct('user_id', 'creation_date')
			.from(TABLES.PROJECT_REPLY_LIKES).where({'project_reply_id': id})
			.orderByRaw('creation_date DESC')

	return db.select(['pr.id', 'pr.user_id', 'p.fullName', 'p.username', 'p.profile_picture', 
						'pr.title', 'pr.message', 'pr.creation_date'])
		.from(TABLES.PROJECT_DISCUSSION + ' as pr')
		.join(h.sub_profile, 'p.uid', 'pr.user_id')
		.where('pr.project_id', id)
		.orderByRaw('pr.creation_date DESC')
		.groupBy('pr.id')
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

// ------------------ Openings ------------------
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

