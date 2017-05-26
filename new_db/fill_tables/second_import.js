const second_import = (db, old, h) => {
  return Promise.all([
    // ------------------ projects ------------------
    old('projects')
      .select([
        'user_id as user_id',
        'category_id',
        'city as loc_id',
        'title',
        'description',
        'about',
        'status',
        'picture',
        'video',
        'link',
        'app',
        'logo',
        'public_id',
        'project_visibility'
      ])
      .then(r => {
        r = h.transform(r, ['users', 'location']);
        return db.batchInsert('projects', r);
      }),
    // ------------------ profiles ------------------
    old('profiles as p')
      .join('users as u', 'u.profile_id', 'p.id')
      .select([
        'u.id as user_id',
        'city as loc_id',
        'network as network_id',
        'first_name',
        'last_name',
        'profile_picture as picture',
        'cover_picture',
        'description',
        'about',
        'genre',
        'creation_date'
      ])
      .then(r => {
        r = h.transform(r, ['users', 'location', 'networks']);
        return db.batchInsert('profiles', r);
      }),

    // ------------------ reset_passwords ------------------
    old('reset_passwords')
      .select(['user_id', 'user_email as email', 'token'])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('reset_passwords', r);
      }),
    // ------------------ user_skills ------------------
    old('user_skills').select(['user_id as user_id', 'skill_id']).then(r => {
      r = h.transform(r, ['users']);
      return db.batchInsert('user_skills', r);
    }),
    // ------------------ user_experiences ------------------
    old('user_experiences')
      .select([
        'user_id as user_id',
        'location_city as loc_id',
        'title',
        'company',
        'date_from',
        'date_to',
        'description'
      ])
      .then(r => {
        r = h.transform(r, ['users', 'location']);
        return db.batchInsert('user_experiences', r);
      }),
    // ------------------ user_followers ------------------
    old('user_followers')
      .select(['user_id', 'follow_user_id as followed', 'creation_date'])
      .then(r => {
        r = h.transform(r, ['users', 'followed']);
        return db.batchInsert('user_followers', r);
      }),
    // ------------------ user_interests ------------------
    old('user_interests')
      .select(['user_id as user_id', 'interest_id'])
      .then(r => {
        r = h.transform(r, ['users', 'interests']);
        return db.batchInsert('user_interests', r);
      }),
    // ------------------ articles ------------------
    old('articles')
      .select([
        'id',
        'author_id as user_id',
        'title',
        'text',
        'picture',
        'views',
        'article_id as public_id',
        'read_time',
        'creation_date'
      ])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('articles', r);
      }),
    // ------------------ notification_permission ------------------
    old('notification_permission')
      .select(['user_id as user_id', 'notif_type', 'permission'])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('notification_permission', r);
      }),
    // ------------------ invite_university ------------------
    old('invite_university')
      .select([
        'number_students as nb_students',
        'sender as user_id',
        'university as partnership_id'
      ])
      .then(r => {
        r = h.transform(r, ['users', 'partnerships']);
        return db.batchInsert('partnerships_invite', r);
      }),
    // ------------------ views ------------------
    old('views')
      .select([
        'user_id as user_id',
        'viewed',
        db.raw('1 as mail_sent'),
        'creation_date'
      ])
      .then(r => {
        r = h.transform(r, ['users', 'viewed']);
        return db.batchInsert('views', r);
      }),
    // ------------------ room_members ------------------
    db('rooms').select(['id', 'name']).then(r => {
      let toInsert = [];
      r.forEach(e => {
        let x = e.name.split('_');
        toInsert.push({
          room_id: e.id,
          user_id: x[0]
        });
        toInsert.push({
          room_id: e.id,
          user_id: x[1]
        });
      });
      toInsert = h.transform(toInsert, ['users']);
      return db.batchInsert('room_members', toInsert);
    }),
    // ------------------ messages ------------------
    old('old_messages')
      .select([
        'from_user_id as user_id',
        'message',
        'creation_date',
        db.raw('CONCAT(from_user_id, "_", to_user_id) as room_id')
      ])
      .orderBy('creation_date')
      .then(r => {
        r = h.transform(r, ['users', 'rooms']);
        return db.batchInsert('messages', r);
      }),
    // ------------------ room_status ------------------
    old('old_messages')
      .select([
        'm_read as read',
        'm_send as mail_sent',
        'to_user_id as user_id',
        db.raw('CONCAT(from_user_id, "_", to_user_id) as room_id')
      ])
      .where('m_read', 1)
      .orWhere('m_send', 1)
      .then(r => {
        r = h.transform(r, ['users', 'rooms']);
        return db.batchInsert('room_status', r);
      }),
    // ------------------ invitations ------------------
    old('invitation')
      .select([
        'user_id',
        'invite_email as mail_to',
        'creation_date',
        old.raw('if(status = "pending", 0, 1) as status')
      ])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('invitations', r);
      }),
    // ------------------ networks_info ------------------
    old('networks_group')
      .select([
        'city as loc_id',
        'logo',
        'title as network_id',
        'story',
        'cover_picture',
        'creation_date'
      ])
      .then(r => {
        r = h.transform(r, ['location', 'networks']);
        return db.batchInsert('networks_info', r);
      }),
    // ------------------ network_verification ------------------
    old('profile_network')
      .select([
        'user_id',
        'network as network_id',
        'token',
        'verification',
        'creation_date'
      ])
      .then(r => {
        r = h.transform(r, ['users', 'networks']);
        return db.batchInsert('network_verification', r);
      }),
    // ------------------ ranks ------------------
    old('rank_of_the_day').select(['user_id', 'rank']).then(r => {
      r = h.transform(r, ['users']);
      return db.batchInsert('ranks', r);
    }),
    // ------------------ rank_history ------------------
    old('profile_ranking').select('*').then(r => {
      r = h.transform(r, ['users']);
      return db.batchInsert('rank_history', r);
    })
  ]); //promise_all
};

module.exports = second_import;
