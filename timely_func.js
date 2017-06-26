const { db, TABLES } = require('./app/models'),
  h = require('./app/models/helper'),
  mailer = require('./app/services/mailer'),
  bot = require('./socket-server/lib/bot');

const ONE_HOUR = 1000 * 3600,
  QUARTER_HOUR = ONE_HOUR / 4,
  HALF_HOUR = ONE_HOUR / 2,
  TWO_HOURS = ONE_HOUR * 2,
  ONE_DAY = ONE_HOUR * 24,
  ONE_WEEK = ONE_DAY * 7;

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
        console.log(limit, 'limit view');
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
    return bot(from, to, {
      fromCount: from.length / 10,
      toCount: to.length - to.length / 10,
      timeInterval: 1000 * Math.floor(Math.random() * 7200),
      action: 'profile_view'
    });
  });
};

const recentActivityBot = require('./socket-server/lib/bot/activities');

module.exports = () => {
  setInterval(mailer.new_message, HALF_HOUR);
  setInterval(mailer.profile_views, ONE_WEEK);
  setInterval(updateRanking, QUARTER_HOUR);
  setInterval(viewers, TWO_HOURS);
  setInterval(recentActivityBot({
    minInterval: QUARTER_HOUR,
    maxInterval: HALF_HOUR,
    projectCount: 15,
    userCount: 15,
    viewOnFollow: true,
    dontSave: false,
    blacklist: {
      projects: [],
      users: []
    }
  }), ONE_DAY)
};
