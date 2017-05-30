const first_import = (db, old) => {
  return Promise.all([
    // ------------------ users ------------------
    old('users as u')
      .select([
        'email',
        'password',
        'username',
        'valid',
        'moderator',
        'fake',
        'invite_id as invite_link'
      ])
      .leftJoin('share_invite_link as s', 'u.id', 's.user_id')
      .then(r => {
        return db.batchInsert('users', r);
      }),
    // ------------------ categories ------------------
    old('categories').select(['id', 'name']).then(r => {
      return db.batchInsert('categories', r);
    }),
    // ------------------ account_validation ------------------
    old('account_validation').select(['token', 'user_email as email']).then(r => {
      return db.batchInsert('account_validation', r);
    }),
    // ------------------ skills ------------------
    old('skills').select(['id', 'name', 'category', 'priority']).then(r => {
      r.push({ id: 1, name: 'unknown' });
      return db.batchInsert('skills', r);
    }),
    // ------------------ interests ------------------
    old('interests')
      .distinct(['name', db.raw('MAX(priority) as priority')])
      .groupBy('name')
      .then(r => {
        let flags = [];
        let ret = r
          .map(item => {
            item.name = item.name.replace(/^[\s]+|[^ |^\w]|\s+$/g, '');
            return item;
          })
          .filter(e => {
            if (flags[e.name] || e.name === 'RC cars') {
              console.log('e.name', e.name);
              return false;
            }
            flags[e.name] = true;
            return e;
          });
        return db.batchInsert('interests', ret);
      }),
    // ------------------ article_tags ------------------
    old('article_tags').select(['name']).then(r => {
      return db.batchInsert('article_tags', r);
    }),
    // ------------------ rooms ------------------
    old('old_messages')
      .distinct([db.raw('CONCAT(from_user_id, "_", to_user_id) as name')])
      .then(r => {
        let a = [];
        let nr = [];
        r.forEach(e => {
          let n = e.name.split('_');
          a.forEach(el => {
            if (
              (el[0] == n[0] && n[1] == el[1]) ||
              (el[1] == n[0] && n[1] == el[0])
            ) {
              n[0] = 'EXIST';
            }
          });
          if (n[0] !== 'EXIST') {
            a.push(n);
            nr.push(e);
          } else {
            delete e;
          }
        });
        return db.batchInsert('rooms', nr);
      }),
    // ------------------ networks_list ------------------
    old('university_list')
      .select(['name', 'website as url', 'launched', 'popular', 'country'])
      .then(r => {
        r = [{ name: 'Unknown' }, ...r];
        return db.batchInsert('networks_list', r);
      }),
    // ------------------ partnerships ------------------
    old('networks')
      .select(['name', 'type', 'url_name as url', 'token'])
      .then(r => {
        return db.batchInsert('partnerships', r);
      })
  ]);
};

module.exports = first_import;
