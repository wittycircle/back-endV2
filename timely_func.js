const { db, TABLES } = require('./app/models'),
  h = require('./app/models/helper'),
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
//TODO Find a way to calculate the "60" instead of hard value, because
// it will change with time
let viewers = () => {
  console.log('Viewers called', new Date());
  return Promise.all([
    db('views')
      .distinct('viewed', db.raw('GROUP_CONCAT(user_id) deja_vu'))
      .countDistinct('user_id as notif')
      .where('mail_sent', 0)
      .groupBy('viewed')
      .having('notif', '<', '5')
      .orderBy('notif'),

    db('views')
      .countDistinct('viewed as cv')
      .groupBy('user_id')
      .orderByRaw('cv DESC')
      .limit(15)
      .then(r => {
        const limit = r[r.length - 1].cv;
        print(limit, 'limit view');
        return db(h.spe_profile({}))
          .distinct(db.raw('CHAR_LENGTH(description) as length'), 'p.*', 'r.rank')
          .countDistinct('v.viewed as countView')
          .join(TABLES.RANK + ' as r', 'r.user_id', 'p.uid')
          .leftJoin(TABLES.VIEWS + ' as v', 'v.user_id', 'p.uid')
          .whereRaw('picture is not null')
          .having('length', '>', 12)
          .having('countView', '<', limit)
          .orderBy('rank')
          .groupBy('p.uid');
      })
  ]).then(r => {
    const from = r[1].map(e => e.uid);
    const to = r[0].map(e => e.viewed);
    console.log('FROM', from[0]);
    console.log('TO', to[0]);
    console.log('CALLING THE BOT !');
    return bot(from, to, {
      fromCount: from.length / 10,
      toCount: to.length - to.length / 10,
      timeInterval: 1000 * Math.floor(Math.random() * 7200),
      action: 'profile_view'
    });
  });
};

module.exports = () => {
  setInterval(mailer.new_message, HALF_HOUR);
  setInterval(mailer.profile_views, ONE_WEEK);
  setInterval(updateRanking, QUARTER_HOUR / 10);
  setInterval(viewers, QUARTER_HOUR / 100);
};
