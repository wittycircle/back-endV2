const { db, TABLES } = require('./app/models'),
  mailer = require('./app/services/mailer');

//Name of file not appropriate, more like setTimeout stuff misc
let QUARTER_HOUR = 1000 * 90;
let HALF_HOUR = 3600 * 500;
let ONE_DAY = 3600 * 24 * 1000;
let ONE_WEEK = ONE_DAY * 7;

let updateRanking = () => {
  console.log('Update called');
  return db
    .raw(`delete from ranks`)
    .then(() => db.raw('alter table ranks AUTO_INCREMENT = 1'))
    .then(() =>
      db.raw(`insert into ranks
        (user_id, rank) select user_id, @rank:=@rank+1 as rank
        from (select @rank:=0) r, rank_points s order by points desc`)
    );
};

module.exports = () => {
  setInterval(mailer.new_message, HALF_HOUR);
  setInterval(mailer.profile_views, ONE_WEEK);
  setInterval(updateRanking, QUARTER_HOUR);
};
