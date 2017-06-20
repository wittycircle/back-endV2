const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

let toInsert = (name, location, date, picture, url) => {
  return `
<table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto" width="350px">
  <tbody>
    <tr>
      <td><span class="sg-image" data-imagelibrary="%7B%22width%22%3A36%2C%22height%22%3A36%2C%22alt_text%22%3A%22profile_picture%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//res.cloudinary.com/dqpkpmrgk/image/upload/w_36%2Ch_36%2Cc_fill%2Cg_face/v1493332197/rzxugrlqswu6veak8gqe.jpg%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><img alt="profile_picture" height="36" src=${picture} style="width: 36px; height: 36px; border-radius: 50%" width="36" /></span></td>
      <td><span>${name}</span><br />
        <span>${location}</span><br />
        <span>${date}</span></td>
        <a href=${url} style="padding: 3px 10px; background-color: #fff; border: 1px solid #222; border-radius: 4px; text-decoration: none; color: #222; font-family: Helvetica; font-size: 14px">Follow</a>
    </tr>
  </tbody>
</table>

<table border="0" cellpadding="0" cellspacing="0" height="20px" style="min-width:100%;" width="100%">
</table>
`;
};

const fillSub = (d, sub, i) => {
  return toInsert(
    `${d.first_name} ${d.last_name}`,
    d.location,
    d.date,
    d.picture,
    wm.url(d.username)
  );
};
// ---------------------- old stuff ----------------------

const send_mail = (data, bail) => {
  let mail = new helper.Mail();
  wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
  wm.content(mail);
  wm.reply(mail, 'noreply@wittycircle.com');
  mail.setTemplateId('1d3396dd-12c4-469f-8bfc-8c4a564ea2d3');

  data.forEach((e, i) => {
    let pers = new helper.Personalization();
    let subject =
      'You may have something special 🙈  *|NVIEW|* people recently visited your profile.';
    let notif = e.notif.split(',');
    let laString = '';
    let nview = notif.length;
    let sub = {
      '*|FNAME|*': e.first_name,
      '*|RANK|*': `${e.rank}`,
      '*||NEW_RANK|*': `${e.rank < 10
        ? e.rank - 2
        : e.rank - Math.random() * 10}`,
      '*|FURL2|*': wm.url('statistics'),
      '*|NVIEW|*': nview.toString(),
      '*|EMAIL|*': e.email
    };
    bail[i].forEach((b, j) => {
      if (j < 5) laString += fillSub(b, sub, j + 1);
    });
    sub['*|TOUSLESBAILS|*'] = laString;
    // console.log('\n-------------------------------------------------\n');
    // console.log(sub);
    wm.subject(pers, subject);
    wm.to(pers, 'sequoya@wittycircle.com');
    wm.substitutions(pers, sub);
    mail.addPersonalization(pers);
  }); //foreach
  wm.send(mail);
  return null;
};

const profile_views = args => {
  const request = db
    .distinct(
      'v.viewed',
      'u.email',
      'r.rank',
      'p.first_name',
      'p.description',
      db.raw('GROUP_CONCAT(distinct v.user_id order by v.user_id)  as notif')
    )
    .countDistinct('v.user_id as vcount')
    .from('views as v')
    .join(TABLES.USERS + ' as u', 'v.viewed', 'u.id')
    .join(TABLES.RANK + ' as r', 'r.user_id', 'u.id')
    .join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
    .join(wm.notif('profile_view'), 'n.user_id', 'v.viewed')
    // .having('vcount', '>=', 5)
    // .andWhere('mail_sent', 0)
    .groupBy('v.viewed')
    .limit(1);

  const lesDates = notif =>
    db('views')
      .select(['user_id', 'viewed', db.raw('max(creation_date) as date')])
      .groupBy('viewed')
      .whereIn('user_id', notif)
      .as('v');

  const reqAll = notif =>
    db
      .distinct(
        h.p_uarray.concat([
          h.format_location,
          db.raw('DATE_FORMAT(v.date, "%W %M %Y") as date'),
          db.raw('CONCAT(loc.city, ", ", loc.country) as location')
        ])
      )
      .from(TABLES.PROFILES + ' as p')
      .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
      .join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
      .leftJoin(lesDates(notif), 'v.user_id', 'u.id')
      .whereIn('u.id', notif)
      .groupBy('u.id');
  const setToOne = ids =>
    db('views').update('mail_sent', 1).whereIn('viewed', ids);

  return request.then(array => {
    if (!array.length) {
      console.log(request.toString());
      console.log('empty');
      return null;
    }
    let x = [];
    let ids = array.map(e => e.viewed);
    array.forEach((e, i) => {
      let notif = e.notif.split(',').splice(0, 5);
      print(notif);
      x.push(
        reqAll(notif).then(x => {
          print(x, 'stuff');
          return x;
        })
      );
    }); //foreach
    x.push(setToOne(ids).return());
    return Promise.all(x).then(bail => {
      print(array);
      // print(bail);
      send_mail(array, bail);
    });
  });
}; //exports // module.exports = profile_views;
profile_views();
