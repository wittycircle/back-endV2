const second_import = (db,old, h) => {
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

  ]) //promise_all
};

module.exports = second_import
