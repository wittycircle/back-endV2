  const getDiscussions = (db) => {
  	let o = {}
  		return db('discussion_messages').select('id', 'discussion_id')
  		.then(r => {
  			r.forEach(e => o[e.id] = e.id)
        return o;
  		})
  };

  const fifth_import = (db,old, h) => {
  return	Promise.all([
  // ------------------ discussion_likes ------------------
        old('project_discussion_likes')
        .select(['user_id', 'project_discussion_id as message_id',
        'creation_date'])
        .then(r => {
          return getDiscussions(db).then(o => {
            r.forEach(e => {
              e.message_id = o[e.message_id]
            })
            r = h.transform(r, ['users'])
            return db.batchInsert('discussion_likes', r)
          })
        }),
  // ------------------ discussion_likes [bis] ------------------
        old('project_reply_likes')
        .select(['user_id', 'project_reply_id as message_id', 'creation_date'])
        .then(r => {
          r = h.transform(r, ['users'])
          return db.batchInsert('discussion_likes', r)
        }),
    ]) //promise_all
  };

  module.exports = fifth_import
