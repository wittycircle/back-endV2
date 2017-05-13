const third_import = (db,old, h) => {
return	Promise.all([
// ------------------ user_socials ------------------
      old('profiles as p')
      .join('users as u', 'u.profile_id', 'p.id')
      .select(['u.id as user_id', 'website_url',
      'facebook_url', 'google_url', 'twitter_url', 'linkedin_url',
      'facebook_id', 'google_id', 'twitter_id'])
      .then(r => {
          r = h.transform(r, ['users'])
          return db.batchInsert('user_socials', r)
      }),
// ------------------ project_followers ------------------
      old('project_followers')
      .select(['user_id', 'project_id'])
      .then(r => {
        r = h.transform(r, ['users', 'projects'])
        return db.batchInsert('project_followers', r)
      }),
// ------------------ project_users ------------------
      old('project_users')
      .select(['user_id', 'project_id', 'invited_by', 'n_accept as accepted'])
      .then(r => {
        r = h.transform(r, ['users', 'projects', 'invited_by'])
        return db.batchInsert('project_users', r)
      }),
// ------------------ discussions ------------------
      old('project_discussion')
      .select(['id', 'project_id', 'user_id'])
      .then(r => {
        r = h.transform(r, ['users', 'projects'])
        return db.batchInsert('discussions', r)
      }),
// ------------------ project_invites ------------------
      old('project_invites')
      .select(['project_id', 'token', 'accepted', 'creation_date'])
      .then(r => {
        r = h.transform(r, ['projects'])
        return db.batchInsert('project_invites', r)
      }),
// ------------------ openings ------------------
      old('project_openings')
      .select(['id', 'project_id', 'status', 'description', 'picture',
      'created_at as creation_date'])
      .then(r => {
        r = h.transform(r, ['projects'])
        return db.batchInsert('openings', r)
      }),
// ------------------ tag_articles ------------------
      old('tag_articles')
      .select(['id', 'creation_date', 'article_id', 'tag_id'])
      .then(r => {
        return db.batchInsert('tag_articles', r)
      }),
// ------------------ article_likes ------------------
      old('article_likes')
      .select(['user_id', 'article_id', 'creation_date'])
      .then(r => {
        r = h.transform(r, ['users'])
        return db.batchInsert('article_likes', r)
      }),
// ------------------ article_messages ------------------
      old('article_message')
      .select(['article_id', 'user_id', 'message', 'creation_date'])
      .then(r => {
        return db.batchInsert('article_messages', r)
      }),
  ]) //promise_all
};

module.exports = third_import
