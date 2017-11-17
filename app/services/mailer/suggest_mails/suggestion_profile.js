const { wm, TEMPLATES } = require('../wittymail');
const helper = require('sendgrid').mail;
const h = require('../../../models/helper'); //NIK
const suggestions = require('../../../models/suggestions');
const { db, TABLES } = require('../../../models/index');

const profile_bloc = (
  name,
  picture,
  description,
  location,
  network,
  skills,
  username
) => {
  return `<div class="main-class"><div class="bloc1" style="display: inline-block;"><div class="first-container" style="margin-bottom: 10px;"><img style="border-radius: 50%; width: 50px;" src="${picture}" alt="profile_picture"></div>
<div class="second-container" style="margin: 0 10px 10px 10px;"><h2 style="margin: 0; font-family: Arial, Tahoma, Vernada; font-weight: bold; font-size: 14px; color: #323232; margin-bottom: 5px;">${name}</h2><h3 class="space-normal" style="margin: 0; font-family: Tahoma; font-weight: normal; font-size: 12px; color: #697178; margin-bottom: 5px; ">${wm.shortenerText(
    description,
    true,
    76,
    ' ...'
  )}</h3>
<div class="location" style="margin-bottom: 10px;">${wm.location_bloc(
    wm.location(location)
  )}${wm.network_bloc(
    network
  )}</div><div class="skill-list space-normal" style="margin-top: 10px"><ul class="noPadding">${wm.skills_bloc2(
    skills
  )}
</ul></div></div></div><div class="third-container"><a href="https://www.wittycircle.com/${username}" class="button">View profile</a></div></div>`;
};

const fillSub = b => {
  return profile_bloc(
    b.fullName,
    b.picture,
    b.description,
    b,
    b.network,
    b.skills,
    b.username
  );
};

const send_mail = (project, profiles) => {
  let mail = new helper.Mail();
  wm.from(mail, 'notifications@wittycircle.com', 'Wittycircle');
  wm.content(mail);
  wm.reply(mail, 'notifications@wittycircle.com');
  mail.setTemplateId(TEMPLATES.suggestions_profile);

  const category = new helper.Category('suggestion_profiles');
  mail.addCategory(category);

  let laString = '';
  let pers = new helper.Personalization();
  let subject = 'Those people could help you with *|PR_TITLE|*';
  let sub = {
    '*|PF_NAME|*': project.first_name,
    '*|PR_TITLE|*': project.title,
    MAIL: project.email
  };
  profiles.forEach((b, i) => {
    if (i < 3) laString += fillSub(b);
  });
  sub['*|PROFILES_BLOC|*'] = laString;

  wm.subject(pers, subject);
  wm.to(pers, project.email);

  wm.substitutions(pers, sub);
  mail.addPersonalization(pers);
  wm.send(mail, 'suggestion_profiles');

  return null;
};

const saveSentData = (project, profiles) => {
  let data = [];

  profiles.forEach(e => {
    data.push({ user_id: e.uid, project_id: project.id });
  });

  db(TABLES.SUG_PROFILES)
    .insert(data)
    .then(r => {
      return null;
    });
};

const suggestionProfileToProject = () => {
  db
    .select('pr.id', 'pr.title', 'u.email', 'p.first_name', 'p.last_name')
    .from(TABLES.PROJECTS + ' as pr')
    .join(TABLES.USERS + ' as u', 'u.id', 'pr.user_id')
    .join(TABLES.PROFILES + ' as p', 'p.user_id', 'pr.user_id')
    .whereRaw(
      'pr.picture is not null && pr.picture != "" && pr.description is not null && pr.description != ""'
    )
    .then(r => {
      r.forEach((e, i) => {
        if (e.email.indexOf('witty') < 0) {
          suggestions.matchProfilesToProject(e.id, 1).then(profiles => {
            let profilesSent = profiles.splice(0, 3);
            send_mail(e, profilesSent);
            saveSentData(e, profilesSent);
          });
        }
      });
      console.log('PROFILE DONE!');
    });
};

// suggestionProfileToProject();
module.exports = suggestionProfileToProject;
