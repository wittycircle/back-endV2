const fourth_import = (db, old, h) => {
  return Promise.all([
    console.log('fourth import'),
    // ------------------ discussion_messages ------------------
    old('project_discussion as d')
      .select(['d.id as discussion_id', 'user_id', 'message', 'creation_date'])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('discussion_messages', r);
      }),
    // ------------------ discussion_messages[bis] ------------------
    old('project_discussion_replies')
      .select(['project_discussion_id as discussion_id', 'user_id', 'message'])
      .then(r => {
        r = h.transform(r, ['users']);
        return db.batchInsert('discussion_messages', r);
      }),
    // ------------------ opening_tags ------------------
    old('project_openings')
      .select([
        'id as opening_id',
        'skill as skill_id',
        old.raw('"1" as priority')
      ])
      .then(r => {
        r = h.transform(r, ['skills']);
        return db.batchInsert('opening_tags', r);
      }),
    // ---------------- triggered tags shit parse ARGH ----
    old('project_openings')
      .select([
        'id as opening_id',
        'tags as skill_id',
        old.raw(`"1" as priority`)
      ])
      .whereRaw('tags IS NOT NULL')
      .andWhere('tags', '<>', '0')
      .andWhere('tags', '<>', '')
      .then(r => {
        let argh = [];
        r.forEach(e => {
          let nd = e.skill_id[0] == '['
            ? JSON.parse(e.skill_id)
            : e.skill_id.split(',');
          nd = nd.map(m => {
            return {
              opening_id: e.opening_id,
              skill_id: m
            };
          });
          argh.push(...nd);
        });
        r = h.transform(argh, ['skills']);
        return db.batchInsert('opening_tags', r);
      }),
    // ------------------ opening_tags[bis] ------------------
    old('opening_tags').select(['opening_id', 'tag as skill_id']).then(r => {
      r = h.transform(r, ['skills']);
      return db.batchInsert('opening_tags', r);
    })
  ]); //promise_all
};

module.exports = fourth_import;
