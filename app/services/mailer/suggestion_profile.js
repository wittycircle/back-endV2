const { wm, TEMPLATES } = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('./app/models/helper');
const { db, TABLES } = require('../../models/index');
const _ = require('lodash');

let testJsonTwo = o => {
  let ret = '"{",';
  for (k in o) {
    ret += ` '"',   "${k}" , '":"',  ${o[k]},  '",'`;
  }
  ret = ret.substr(0, ret.length - 2) + `'"}"`;
  console.log('ret', ret);
  return ret;
};

const whatIWant = {
  username: 'u.username',
  uid: 'u.id',
  network: 'u.invite_link'
};
let test = db('project_members')
  .distinct('user_id')
  .union(db('projects').distinct('user_id'))
  .then(r => {
    const members = r.map(e => e.user_id);
    return db
      .distinct(
        db.raw('GROUP_CONCAT(DISTINCT s.name) as skills'),
        'pr.id',
        'pr.user_id as creator',
        db.raw(
          'GROUP_CONCAT(DISTINCT pm.user_id order by pm.user_id) as members'
        ),
        db.raw(
          `GROUP_CONCAT(DISTINCT ${testJsonTwo(
            whatIWant
          )} SEPARATOR "∆∆∆") as lesBails`
        )
      )
      .from('openings as o')
      .join('projects as pr', 'pr.id', 'o.project_id')
      .join('opening_tags as ot', 'ot.opening_id', 'o.id')
      .join('skills as s', 's.id', 'ot.skill_id')
      .join('user_skills as us', 's.id', 'us.skill_id')
      .join('users as u', 'u.id', 'us.user_id')
      .leftJoin('project_members as pm', 'pm.project_id', 'pr.id')
      .where('pr.project_visibility', 1)
      .where('u.fake', 0)
      .whereNotIn('u.id', members)
      .havingRaw('members IS NOT NULL')
      .limit(1)
      .groupBy('pr.id');
  });

// NEW STUFF ABOVE
// old stuff below
const send_mail = (data, token) => {
  let mail = new helper.Mail();
  wm.from(mail, 'noreply@wittycircle.com', 'Wittycircle');
  wm.content(mail);
  wm.reply(mail, 'noreply@wittycircle.com');
  mail.setTemplateId(TEMPLATES.suggestion_profile);

  data.forEach((e, i) => {
    let pers = new helper.Personalization();
    let subject = 'Reset password';
    let sub = {
      // "*|UNAME|*": ,
      // "*|SKILLS|*": ,
      //
      // "*|PIMG1|*": ,
      // "*|PNAME1|*": ,
      // "*|PLOC1|*": ,
      // "*|PURL1|*": ,
      // from 1 to 5
    };
    // x.forEach(b => {
    // 	sub.push({

    // 	})
    // })
    console.log(sub);
    console.log('\n-------------------------------------------------\n');
    wm.subject(pers, subject);
    wm.to(pers, /*e.email*/ 'sequoya@wittycircle.com');
    wm.substitutions(pers, sub);
    mail.addPersonalization(pers);
  }); //foreach
  wm.send(mail);
  return null;
};

const suggestion_profile = args => {
  let user_profile = h.sub_profile.select(
    'u.fake',
    'p.city',
    'p.country',
    'p.state',
    'u.email'
  );

  let selection = [
    'pr.id',
    'pr.title',
    'pr.user_id as creator_id',
    'pr.city',
    'pr.country',
    'p.email',
    'p.uid'
    // 's.skill_name', 'o.skill', 'ot.tag'
    // db.raw('GROUP_CONCAT(DISTINCT  p.email) as tabuid'),
    // db.raw('GROUP_CONCAT (DISTINCT p.fullName) as fullName'),
    // db.raw('GROUP_CONCAT (DISTINCT s.skill_name ) as skills'),
    // 's.skill_name','ot.tag', 'o.skill'
  ];

  let location = '';
  location += `WHEN pr.city LIKE p.city THEN 1 `;
  location += `WHEN pr.state LIKE p.state THEN 2 `;
  location += `WHEN pr.country LIKE p.country THEN 3 `;

  let project = db(TABLES.PROJECTS + ' as pr')
    .distinct(selection)
    .join(TABLES.PROJECT_OPENINGS + ' as o', 'o.project_id', 'pr.id')
    .join(TABLES.OPENING_TAGS + ' as ot', 'ot.opening_id', 'o.id')
    .join(TABLES.USER_SKILLS + ' as s', function() {
      this.on('s.skill_name', 'ot.tag');
      this.orOn('s.skill_name', 'o.skill');
    })
    .join(user_profile, function() {
      this.on('p.uid', 's.user_id');
    })
    .where('project_visibility', 1)
    .where('u.fake', 0)
    // .where('p.about', 'join projects')
    .orderByRaw('CASE ' + location + ' else 100 END')
    // .limit(10)
    .orderBy('p.uid');
  // .groupBy('p.uid')

  console.log(project.toString());
  return (
    project //.then((data) => send_mail(data, args.token))
      // .then((data) => console.log(data.map(e => [e.skill, e.skill_name, e.tag])))
      // .then((data) => console.log(data.map(e => [e.skill_name, e.uid])))
      .then(console.log)
  );
}; //exports

suggestion_profile(args);
//module.exports = suggestion_profile
