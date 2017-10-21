const { db, TABLES } = require('./index'),
	_ = require('lodash'),
	h = require('./helper');

//will disapear in v3
// ------------------ Projects [main methods] ------------------

const udpateProjectPictures = (project_id, pictures) => {
	return db(TABLES.PROJECT_PICTURES).where('project_id', project_id).del()
		.then(r => {
			let array = []
			pictures.forEach(p => {
				array.push({ project_id: project_id, picture: p });
			});
			return db(TABLES.PROJECT_PICTURES).insert(array);
		})
}

exports.createProject = (project_data, location) => {
	console.log('CREATING');
	return h.setLocation(location).then(r => {
		console.log('LOCATION SET');
		project_data.loc_id = r[0];
		return db(TABLES.PROJECTS).insert(project_data).then(r => {
			console.log(r);
			return r
		});
	});
};

exports.updateProject = (id, project_data, location_data, pictures) => {
	// console.log(pictures);
	return h.setLocation(location_data).then(r => {
		project_data.loc_id = r[0];
		return db(TABLES.PROJECTS).update(project_data).where('id', id)
			.then(r =>
				udpateProjectPictures(id, pictures)
			);
	});
};

exports.updateProjectLocation = (id, location) => {
	console.log('ICI');
	return db(TABLES.LOCATION)
		.first('id')
		.where({ city: location.city })
		.orWhere({ state: location.state || '' })
		.orWhere({ country: location.country || '' })
		.then(r => db(TABLES.PROJECTS).update({ loc_id: r.id || 1 }).where('id', id));
};

exports.removeProject = id => {
	return h.exist(TABLES.PROJECTS, id).then(r => {
		if (!r.length) {
			throw 'could not remove project';
		} else {
			return db(TABLES.PROJECTS).del().where('id', id);
		}
	});
};

const getMembers = id => {
	const members = db
		.select('p.user_id as creator', 'pcr.user_id')
		.from(TABLES.PROJECT_MEMBERS + ' as pcr')
		.join(TABLES.PROJECTS + ' as p', 'p.id', 'pcr.project_id')
		.where('project_id', id)
		.where('pcr.accepted', 1)
		.as('pcr');

	return db
		.distinct([
			'p.uid as id',
			'p.first_name',
			'p.last_name',
			db.raw('CONCAT (p.first_name, " ", p.last_name) as username')
		])
		.from(h.sub_profile)
		.join(members, function() {
			this.on('p.uid', '=', 'pcr.user_id').orOn('p.uid', '=', 'creator');
		});
};

const getFollowerCount = id => {
	return db
		.count('project_id as count')
		.from(TABLES.PROJECT_LIKES + ' as l')
		.join(TABLES.PROJECTS + ' as p', 'p.id', 'l.project_id')
		.where('p.id', id);
};

exports.getProject = (id, uid) => {
	const pr_array = [
		'pr.id',
		'pr.title',
		'pr.picture',
		'pr.description',
		h.format_location,
		'pr.about',
		'pr.video',
		'c.name as category',
		'p.uid as profile_id',
		'pr.public_id',
		'pr.project_visibility',
		'pr.link',
		'pr.app',
		'pr.logo',
		'pr.1st_description',
		'pr.2nd_description'
	],
		x = [];
	if (uid) {
		pr_array.push(db.raw('GROUP_CONCAT(l.user_id) as hasLiked'));
	}
	const req = db
		.distinct(pr_array)
		.from(TABLES.PROJECTS + ' as pr')
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'pr.loc_id')
		.join(TABLES.CATEGORIES + ' as c', 'c.id', 'pr.category_id')
		.join(h.sub_profile, 'p.uid', 'pr.user_id')
		.leftJoin(TABLES.PROJECT_LIKES + ' as l', 'l.project_id', 'pr.id');
	req.where('pr.public_id', id);

	return req.then(r => {
		console.log(r);
		r.forEach(el => {
			x.push(
				exports.getProjectDiscussion(el.id).then(rr => {
					el.discussions = rr;
				})
			);
			x.push(
				exports.getProjectOpenings(el.id).then(rr => {
					el.openings = rr;
				})
			);
			x.push(getMembers(el.id).then(rr => (el.members = rr)));
			x.push(
				getFollowerCount(el.id).then(rr => {
					el.follower_count = rr[0].count;
				})
			);
			x.push(
				exports.getProjectPictures(el.id).then(rr => {
					el.pictures = rr;
				})
			);
		});
		return Promise.all(x).then(() => {
			return r;
		});
	});
};
//
// ------------------ Discussions ------------------

exports.createProjectDiscussion = data => {
	return h.exist(TABLES.PROJECTS, data.project_id).then(r => {
		if (!r.length) {
			return 'could not create project dicussion';
		} else {
			return db(TABLES.DISCUSSIONS)
				.insert({
					project_id: data.project_id,
					user_id: data.user_id
				})
				.then(([r]) => {
					return db(TABLES.DISCUSSION_MESSAGES).insert({
						discussion_id: r,
						user_id: data.user_id,
						message: data.message
					});
				});
		}
	});
};

exports.getProjectDiscussion = id => {
	let replies = id =>
		db
			.select([
				'rep.id',
				'rep.user_id',
				'rep.message',
				'rep.creation_date',
				'p.fullName',
				'p.username',
				'p.picture'
			])
			.from(TABLES.DISCUSSION_MESSAGES + ' as rep')
			.join(h.sub_profile, 'p.uid', 'rep.user_id')
			.where('discussion_id', id);

	let rep_like = id =>
		db
			.distinct('user_id', 'creation_date')
			.from(TABLES.DISCUSSION_LIKES)
			.where({ message_id: id })
			.orderByRaw('creation_date DESC');

	return db
		.select([
			'd.id',
			'd.user_id',
			'p.fullName',
			'p.username',
			'p.picture',
			'd.creation_date'
		])
		.from(TABLES.DISCUSSIONS + ' as d')
		.join(h.sub_profile, 'p.uid', 'd.user_id')
		.where('d.project_id', id)
		.orderByRaw('d.creation_date DESC')
		.groupBy('d.id')
		.then(r => {
			let x = [];
			let y = [];
			r.forEach(e => {
				x.push(
					replies(e.id).then(rr => {
						rr.forEach(m => {
							y.push(rep_like(m.id).then(rr => (m.likes = rr)));
						});
						e.replies = rr;
						return rr;
					})
				);
			});
			return Promise.all(x).then(() => Promise.all(y).then(() => r));
		});
};

// ------------------ Openings ------------------
exports.createOpening = (data, tags) => {
	return h.exist(TABLES.PROJECTS, data.project_id).then(r => {
		if (!r.length) {
			throw 'could not create project opening';
		} else {
			return Promise.all([
				db(TABLES.PROJECT_OPENINGS).insert(data),
				db(TABLES.SKILLS).select('id as skill_id').whereIn('name', tags)
			]).then(([id, skill_ids]) => {
				skill_ids.forEach(e => {
					e.opening_id = id;
				});
				return db(TABLES.OPENING_TAGS).insert(skill_ids).then(() => id);
			});
		}
	});
};

exports.getProjectOpenings = id => {
	return db
		.select(
			'o.id',
			'o.creation_date',
			'o.status',
			'o.position',
			'o.description',
			db.raw('GROUP_CONCAT(s.name) as tags')
		)
		.from(TABLES.PROJECT_OPENINGS + ' as o')
		.leftJoin(TABLES.OPENING_TAGS + ' as t', 't.opening_id', 'o.id')
		.leftJoin(TABLES.SKILLS + ' as s', 't.skill_id', 's.id')
		.groupBy('o.id')
		.where({ project_id: id });
};

exports.getProjectPictures = id => {
	return db(TABLES.PROJECT_PICTURES)
		.select('picture')
		.where('project_id', id)
		.then(r => {
			let array = [];
			r.forEach(i => {
				array.push(i.picture);
			})
			return array
		});
}

// ------------------ Likes ------------------
exports.getProjectLikes = project_id => {
	return db
		.select(h.p_array)
		.from(TABLES.PROJECT_LIKES + ' as pl')
		.join(TABLES.PROJECTS + ' as pj', 'pj.id', 'pl.project_id')
		.join(h.u_profile, 'p.uid', 'pl.user_id')
		.where({ 'pj.id': project_id })
		.groupBy('p.id');
};

exports.likeProject = (project_id, uid) => {
	let obj = { user_id: uid, project_id: project_id };
	return h.exist(TABLES.PROJECTS, project_id).then(r => {
		if (!r.length) throw 'Project not found';
		return db(TABLES.PROJECT_LIKES).first('id').where(obj).then(r => {
			if (!r) return db(TABLES.PROJECT_LIKES).insert(obj);
			else return db(TABLES.PROJECT_LIKES).del().where(obj);
		});
	});
};

exports.unlikeProject = (project_id, uid) => {
	return db(TABLES.PROJECT_LIKES).del().where({
		user_id: uid,
		project_id: project_id
	});
};

// ------------------ Network ------------------
exports.getFromProjectNetwork = (need, cond) => {
	return db(TABLES.PROJECT_NETWORK).select(need).where(cond);
};

exports.updateProjectNetwork = (info, cond) => {
	return db(TABLES.PROJECT_NETWORK).update(info).where(cond);
};

// ------------------ INVITE ------------------
exports.inviteTeam = (uid, project_id, user_id, token) => {
	let o = {
		project_id: project_id,
		user_id: user_id,
		invited_by: uid,
		token: token
	};
	return h.exist(TABLES.PROJECTS, project_id).then(r => {
		if (!r.length) throw 'Could not match project';
		return db.select('id').from(TABLES.PROJECT_MEMBERS).where(o).then(r => {
			if (r.length) throw 'Already exist';
			else {
				return db(TABLES.PROJECT_MEMBERS).insert(o);
			}
		});
	});
};

exports.getInvite = project_id => {
	return h.exist(TABLES.PROJECTS, project_id).then(r => {
		if (!r.length) throw 'Could not match project';
		return db(TABLES.PROJECT_MEMBERS + ' as m')
			.select([
				'm.id',
				'project_id',
				'user_id',
				'invited_by',
				'accepted',
				'p.picture',
				'p.fullName',
				'm.token'
			])
			.join(h.sub_profile, 'p.uid', 'm.user_id')
			.where('project_id', project_id);
	});
};

exports.deleteInvite = (uid, invite_id) => {
	return db(TABLES.PROJECT_MEMBERS)
		.select('id')
		.where({ id: invite_id, invited_by: uid })
		.then(r => {
			if (!r.length)
				throw "Ressource does not exist, or you didn't invite that person";
			return db(TABLES.PROJECT_MEMBERS).del().where({ id: invite_id });
		});
};

exports.acceptInvite = (uid, token) => {
	return db(TABLES.PROJECT_MEMBERS).update('accepted', 1).where('token', token);
};
