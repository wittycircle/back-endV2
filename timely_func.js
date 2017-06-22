const { db, TABLES } = require('./app/models'),
  mailer = require('./app/services/mailer'),
  bot = require('./socket-server/lib/bot');

//Name of file not appropriate, more like setTimeout stuff misc
let QUARTER_HOUR = 1000 * 90;
let HALF_HOUR = 3600 * 500;
let ONE_DAY = 3600 * 24 * 1000;
let ONE_WEEK = ONE_DAY * 7;

let updateRanking = () => {
  console.log('Update called', new Date());

  return db
    .raw(`delete from ranks`)
    .then(() => db.raw('alter table ranks AUTO_INCREMENT = 1'))
    .then(() =>
      db.raw(`insert into ranks
        (user_id, rank) select user_id, @rank:=@rank+1 as rank
        from (select @rank:=0) r, rank_points s order by points desc`)
    );
};

let viewers = () =>
  Promise.all([
    db('views')
      .distinct('viewed', db.raw('GROUP_CONCAT(user_id) deja_vu'))
      .countDistinct('user_id as notif')
      .where('mail_sent', 0)
      .groupBy('viewed')
      .having('notif', '<', '5'),

    db(h.spe_profile({}))
      .distinct(db.raw('CHAR_LENGTH(description) as length'), 'p.*', 'r.rank')
      .join(TABLES.RANK + ' as r', 'r.user_id', 'p.uid')
      .whereRaw('picture is not null')
      .having('length', '>', 12)
      .orderBy('rank')
  ]).then(r => {
    bot(r[1], r[0], {
      fromCount: r[1].length / 10,
      toCount: r[0].length - r[0].length / 10,
      timeInterval: 1000 * Math.floor(Math.random() * 3600),
      action: 'profile_view'
    });
  });

module.exports = () => {
  setInterval(mailer.new_message, HALF_HOUR);
  setInterval(mailer.profile_views, ONE_WEEK);
  setInterval(updateRanking, QUARTER_HOUR);
};
