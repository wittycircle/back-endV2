const { wm, TEMPLATES } = require('../wittymail');
const helper = require('sendgrid').mail;
const h = require('../../../models/helper'); //NIK
const suggestions = require('../../../models/suggestions');
const { db, TABLES } = require('../../../models/index');

const transformStatus = status => {
  if (status === 'Mentor' || status === 'Teammate')
    return 'a ' + status.toLowerCase() + ' skilled in';
  return status.toLowerCase() + ' in';
};

const project_bloc = (
  picture,
  title,
  description,
  location,
  project_status,
  need_status,
  skills,
  public_id
) => {
  const noLogo =
    'https://res.cloudinary.com/dqpkpmrgk/image/upload/v1501823817/Witty-icon/Icon_NoLogo_Project.png';

  return `<div class="main-class"><div class="bloc1" style="display: inline-block;"><div class="first-container" style="margin-bottom: 10px;"><img style="border-radius: 4px; width: 50px; height: 50px;" src="${picture ||
    noLogo}" alt="project_picture">
</div><div class="second-container" style="margin: 0 10px 10px 10px;"><h2 class="sc-1">${title}</h2><h3 class="space-normal sc-2">${description ||
    ''}</h3><div class="location" style="margin-bottom: 10px;">${wm.location_bloc(
    wm.location(location)
  )}
<span class="sc-4"><img style="width: 12px; vertical-align: baseline; margin-right: 0px;" src="https://res.cloudinary.com/dqpkpmrgk/image/upload/v1505329697/Witty-icon/21744733_10214601532891653_1649129114_n.png" alt="status_icon" /> ${project_status}</span>
</div><div class="skill-list space-normal"><p class="sl-p">Looking for ${transformStatus(
    need_status
  )}</p><ul class="noPadding noMargin">${wm.skills_bloc2(
    skills
  )}</ul></div></div></div>
<div class="third-container"><a href="https://www.wittycircle.com/project/${public_id}/${title}" class="button">View project</a></div></div>`;
};

const fillSub = b => {
  return project_bloc(
    b.picture,
    b.title,
    b.projectDescription,
    b,
    b.project_status,
    b.need_status,
    b.skillName,
    b.public_id
  );
};

const send_mail = (projects, profile) => {
  console.log('SEND MAIL CALLED');

  let mail = new helper.Mail();
  wm.from(mail, 'notifications@wittycircle.com', 'Wittycircle');
  wm.content(mail);
  wm.reply(mail, 'notifications@wittycircle.com');
  mail.setTemplateId(TEMPLATES.suggestions_project);

  const category = new helper.Category('suggestion_projects');
  mail.addCategory(category);

  let laString = '';
  let pers = new helper.Personalization();
  let subject = 'Looking for new opportunities, *|PF_NAME|*?';
  let sub = {
    '*|PF_NAME|*': profile.first_name,
    MAIL: profile.email
  };
  projects.forEach((b, i) => {
    if (i < 3) laString += fillSub(b);
  });
  sub['*|PROJECTS_BLOC|*'] = laString;

  wm.subject(pers, subject);
  wm.to(pers, profile.email);

  wm.substitutions(pers, sub);
  mail.addPersonalization(pers);
  wm.send(mail, 'suggestion_projects');
  console.log('GOOD!');
  return null;
};

const saveSentData = (projects, profile) => {
  let data = [];

  projects.forEach(e => {
    data.push({ user_id: profile.id, project_id: e.id });
  });

  db(TABLES.SUG_PROJECTS)
    .insert(data)
    .then(r => {
      return null;
    });
};

const suggestionProjectToProfile = () => {
  db
    .select('u.id', 'u.email', 'p.first_name', 'p.about')
    .from(TABLES.USERS + ' as u')
    .join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
    .join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'u.id')
    .where('u.email', 'not like', '%witty%')
    .groupBy('u.id')
    .then(r => {
      console.log(r);
      r.forEach((e, i) => {
        suggestions.matchProjectsToProfile(e.id).then(projects => {
          let projectsSent = projects.splice(0, 3);
          send_mail(projectsSent, e);
          saveSentData(projectsSent, e);
        });
      });
    });
};

module.exports = suggestionProjectToProfile;
