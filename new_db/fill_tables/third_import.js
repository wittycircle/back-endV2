const third_import = (db, old, h) => {
  const subInfoProfiles = id => {
    const views = old
      .countDistinct('id as value')
      .where('user_notif_id', id)
      .where('type_notif', 'view')
      .from('notification_list'),
      started_projects = old
        .distinct(db.raw('count(id) * 200'))
        .where('user_id', id)
        .from('projects'),
      invitation = old
        .distinct(db.raw('count(id) * 500'))
        .where('user_id', id)
        .where('status', 'registed')
        .from('invitation'),
      project_feedback = old
        .distinct(db.raw('count(id) * 15'))
        .where('user_id', id)
        .from('project_discussion'),
      following = old
        .countDistinct('id')
        .where('user_id', id)
        .from('user_followers'),
      follower = old
        .distinct(db.raw('count(id) * 2'))
        .where('follow_user_id', id)
        .from('user_followers'),
      upvoted_project = old
        .distinct(db.raw('count(id) * 2'))
        .where('user_id', id)
        .from('project_users'),
      messages = old
        .distinct(db.raw('count(id) * 2'))
        .where('to_user_id', id)
        .from('old_messages'),
      profile_skills = old
        .distinct(db.raw('250'))
        .where('user_id', id)
        .from('user_skills'),
      profile_interests = old
        .distinct(db.raw('250'))
        .where('user_id', id)
        .from('user_interests'),
      profile_experiences = old
        .distinct(db.raw('250'))
        .where('user_id', id)
        .from('user_experiences'),
      profile_description = old
        .distinct(db.raw('250'))
        .whereRaw('description IS NOT NULL')
        .andWhere('u.id', id)
        .from('profiles as p')
        .join('users as u', 'u.profile_id', 'p.id');
    const test = [
      started_projects,
      invitation,
      project_feedback,
      following,
      follower,
      upvoted_project,
      messages,
      profile_skills,
      profile_interests,
      profile_experiences,
      profile_description
    ];

    return views
      .union(test)
      .then(r => r.map(e => e.value).reduce((e, a) => e + a));
  };
  return Promise.all([
    console.log('third import'),
    // ------------------ user_socials ------------------
    old('profiles as p')
      .join('users as u', 'u.profile_id', 'p.id')
      .select([
        'u.id as user_id',
        'website_url',
        'facebook_url',
        'google_url',
        'twitter_url',
        'linkedin_url',
        'facebook_id',
        'google_id',
        'twitter_id'
      ])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('user_socials', r);
      }),
    // ------------------ project_followers ------------------
    old('project_followers').select(['user_id', 'project_id']).then(r => {
      r = h.transform(r, ['users', 'projects']);
      return db.batchInsert('project_followers', r);
    }),
    // ------------------ project_members ------------------
    old('project_users')
      .select(['user_id', 'project_id', 'invited_by', 'n_accept as accepted'])
      .then(r => {
        r = h.transform(r, ['users', 'projects', 'invited_by']);
        return db.batchInsert('project_members', r);
      }),
    // ------------------ discussions ------------------
    old('project_discussion').select(['id', 'project_id', 'user_id']).then(r => {
      r = h.transform(r, ['users', 'projects']);
      return db.batchInsert('discussions', r);
    }),
    // ------------------ project_invites ------------------
    old('project_invites')
      .select(['project_id', 'token', 'accepted', 'creation_date'])
      .then(r => {
        r = h.transform(r, ['projects']);
        return db.batchInsert('project_invites', r);
      }),
    // ------------------ openings ------------------
    old('project_openings')
      .select([
        'id',
        'project_id',
        'status',
        'description',
        'picture',
        'created_at as creation_date'
      ])
      .then(r => {
        r = h.transform(r, ['projects']);
        return db.batchInsert('openings', r);
      }),
    // ------------------ tag_articles ------------------
    old('tag_articles')
      .select(['id', 'creation_date', 'article_id', 'tag_id'])
      .then(r => {
        return db.batchInsert('tag_articles', r);
      }),
    // ------------------ article_likes ------------------
    old('article_likes')
      .select(['user_id', 'article_id', 'creation_date'])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('article_likes', r);
      }),
    // ------------------ article_messages ------------------
    old('article_message')
      .select(['article_id', 'user_id', 'message', 'creation_date'])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('article_messages', r);
      }),
    // ------------------ rank_points ------------------
    // SALE
    old('users').select('id as user_id').orderBy('id').then(r => {
      r = h.transform(r, ['users']);
      return Promise.all(
        r.map(e =>
          subInfoProfiles(e.user_id).then(score => {
            return { user_id: e.user_id, points: score + 300 };
          })
        )
      ).then(result => db.batchInsert('rank_points', result));
    })
  ]); //promise_all
};

module.exports = third_import;
