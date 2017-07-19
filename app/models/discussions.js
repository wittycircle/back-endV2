const { db, TABLES } = require('./index'), h = require('./helper');

// ------------------ Project Discussions ------------------
// unused
// exports.updateProjectDiscussion = (discussion_id, message, uid) => {
//   return h.owner(TABLES.DISCUSSIONS, discussion_id, uid).then(r => {
//     if (!r.length) {
//       return 'could not update project dicussion';
//     } else {
//       return db(TABLES.DISCUSSIONS)
//         .update({ message: message })
//         .where({ id: discussion_id });
//     }
//   });
// };

exports.removeProjectDiscussion = discussion_id => {
	return h.exist(TABLES.DISCUSSIONS, discussion_id).then(r => {
		if (!r.length) return 'Invalid discussion id';
		else {
			return db(TABLES.DISCUSSIONS).del().where({ id: discussion_id });
		}
	});
};
// ------------------ Reply ------------------
exports.getDiscussionReplies = discussion_id => {
	let rep_like = id =>
		db
			.select('user_id', 'creation_date')
			.from(TABLES.DISCUSSION_LIKES)
			.where({ message_id: id });

	return db
		.select([
			'rep.id',
			'rep.user_id',
			'rep.message',
			'p.fullName',
			'p.username',
			'p.picture',
			'creation_date'
		])
		.from(TABLES.DISCUSSION_MESSAGES + ' as rep')
		.join(h.sub_profile, 'p.uid', 'rep.user_id')
		.where('discussion_id', discussion_id)
		.then(r => {
			let x = [];
			r.forEach(el => {
				x.push(
					rep_like(el.id).then(rr => {
						return (el.likes = rr);
					})
				);
			});
			return Promise.all(x).then(() => r);
		});
};

exports.replyDiscussion = (discussion_id, uid, message) => {
	return h.exist(TABLES.DISCUSSIONS, discussion_id).then(r => {
		if (!r.length) return 'Invalid discussion id';
		else {
			return db(TABLES.DISCUSSION_MESSAGES).insert({
				user_id: uid,
				discussion_id: discussion_id,
				message: message
			});
		}
	});
};

// ------------------ Like ------------------
//unused anymore [since no title]
// exports.likeDiscussion = (discussion_id, uid) => {
//   const obj = { discussion_id: discussion_id, user_id: uid };
//   return h.exist(TABLES.DISCUSSIONS, discussion_id).then(r => {
//     if (!r.length) return 'Invalid discussion id';
//     return db(TABLES.DISCUSSION_LIKES).first('id').where(obj).then(r => {
//       if (!r) return db(TABLES.DISCUSSION_LIKES).insert(obj);
//       else return db(TABLES.DISCUSSION_LIKES).del().where(obj);
//     });
//   });
// };

//unsued, likeDiscussion does the unlike too
// exports.unlikeDiscussion = (discussion_id, uid) => {
//   return h.exist(TABLES.DISCUSSIONS, discussion_id).then(r => {
//     if (!r.length) return 'Invalid discussion id';
//     else {
//       return db(TABLES.DISCUSSION_LIKES)
//         .del()
//         .where({ discussion_id: discussion_id, user_id: uid });
//     }
//   });
// };
