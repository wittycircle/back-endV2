const project = require('../models/projects'),
  redis = require('ioredis')(require('../private').redis), //<= sale
  mailer = require('../services/mailer');
_ = require('lodash');

// ------------------ Project [main methods] ------------------
const data = req => {
  let r = {
    user_id: req.user.id,
    title: req.body.title,
    category_id: req.body.category, //id and not a string (there is a table categories)
    status: req.body.status,
    project_visibility: req.body.public || 1,
    public_id: Math.floor(Math.random() * 90000 + 10000)
  };
  return redis.smembers('project_public_id').then(public => {
    while (1) {
      let x = public.filter(e => e == r.public_id);
      if (x.length) {
        r.public_id = Math.floor(Math.random() * 90000 + 10000);
      } else break;
    }
    return [r, req.body.location];
  });
};

exports.createProject = (req, res, next) => {
  data(req).then(([d, location]) => {
    project
      .createProject(d, location)
      .then(r => {
        console.log('r', r);
        req.broadcastEvent('project_creation', { id: r, from: req.user.id });
        req.broadcastEvent('add_points', { user_id: req.user.id, points: 200 });
        res.send({ id: d.public_id });
      })
      .catch(err => next(['Invalid information', err]));
  });
};

const getFromBody = b => {
  let project_data = {};
  if (b.user_id) project_data.user_id = b.user_id;
  if (b.category_id) project_data.category_id = b.category_id;
  if (b.status) project_data.status = b.status;
  if (b.title) project_data.title = b.title;
  if (b.description) project_data.description = b.description;
  if (b.about) project_data.about = b.about;
  if (b.picture) project_data.picture = b.picture;
  if (b.video) project_data.video = b.video;
  if (b.link) project_data.link = b.link;
  if (b.app) project_data.app = b.app;
  if (b.logo) project_data.logo = b.logo;
  if (b.project_visibility)
    project_data.project_visibility = b.project_visibility;
  let loc_data = b.location;
  return [project_data, loc_data];
};

exports.updateProject = (req, res, next) => {
  const [project_data, location_data] = getFromBody(req.body);
  req.body.category_id = req.body.category;
  project
    .updateProject(req.params.id, project_data, location_data)
    .then(r => {
      req.broadcastEvent('project_update', {
        id: req.params.id,
        from: req.user.id
      });
      res.send({ success: true });
    })
    .catch(err => next(['Bad info', err]));
};

exports.updateProjectLocation = (req, res, next) => {
  project
    .updateProjectLocation(req.params.id, req.body)
    .then(r => {
      res.send({ success: true });
    })
    .catch(err => next([err]));
};

exports.removeProject = (req, res, next) => {
  project
    .removeProject(req.params.id)
    .then(r => {
      req.broadcastEvent('add_points', { user_id: req.user.id, points: -200 });
      res.send({ success: true });
    })
    .catch(err => next([err, 'Invalid id']));
};

exports.getProject = (req, res, next) => {
  let uid = req.user ? req.user.id : null;
  project
    .getProject(req.params.id, uid)
    .then(r => {
      if (uid) {
        r.forEach(e => {
          let ar = e.hasLiked ? e.hasLiked.split(',') : [];
          e.hasLiked = ar.indexOf(uid) != -1;
          e.discussions.forEach(el =>
            el.replies.forEach(
              rep => (rep.hasLiked = rep.likes.indexOf(uid) != -1)
            )
          );
        });
      }
      res.send({ project: r[0] });
    })
    .catch(err => next(err));
};

// ------------------ Discussions ------------------

const dataSpe = req => {
  let r = {
    user_id: req.body.from,
    title: req.body.title,
    category_id: req.body.category, //id and not a string (there is a table categories)
    description: req.body.description,
    about: req.body.about,
    status: req.body.status,
    picture: req.body.picture,
    video: req.body.video,
    project_visibility: req.body.public || 1,
    public_id: Math.floor(Math.random() * 90000 + 10000)
  };
  return redis.smembers('project_public_id').then(p => {
    while (1) {
      let x = p.filter(e => e == r.public_id);
      if (x.length) {
        r.public_id = Math.floor(Math.random() * 90000 + 10000);
      } else break;
    }
    if (req.body.location) {
      r.country = req.body.location.country;
      r.city = req.body.location.city;
      r.state = req.body.location.state;
    }
    return r;
  });
};

exports.createProjectFromExternal = (req, res, next) => {
  if (req.get('x-api-token') != 'LaChaussetteDesGensTriggerants') {
    return res.send({ success: false });
  }
  dataSpe(req).then(d => {
    project
      .createProject(d, req.body.members, req.body.openings, req.body.discussions)
      .then(r => {
        if (typeof r === 'string') {
          return next([r, 'Invalid informations']);
        } else res.send({ id: d.public_id });
      })
      .catch(err => next(err));
  });
};

exports.createProjectDiscussion = (req, res, next) => {
  const data = {
    project_id: req.params.id,
    user_id: req.user.id,
    message: req.body.message
  };
  project
    .createProjectDiscussion(data)
    .then(r => {
      if (typeof r === 'string') return next([r, 'Invalid project id']);
      else {
        mailer.ask_project(data);
        req.broadcastEvent('discussion_creation', {
          from: req.user.id,
          id: req.params.id,
          discussion: r[0]
        });
        req.broadcastEvent('add_points', { user_id: req.user.id, points: 15 });
        res.send({ id: r[0] });
      }
    })
    .catch(err => next(err));
};

let hackLiked = (r, req) => {
  if (req.user) {
    r.forEach(rep => {
      rep.replies.forEach(rl => {
        liked = false;
        rl.likes.forEach(l => (liked = l.user_id === req.user.id ? true : liked));
        rl.liked = liked;
      });
    });
  }
  return r;
};

exports.getProjectDiscussion = (req, res, next) => {
  project
    .getProjectDiscussion(req.params.id)
    .then(r => {
      if (_.isEmpty(r)) next(['Empty discussion', 'Wrong project id']);
      else {
        req.user = {
          id: 8
        };
        res.send({ discussions: hackLiked(r, req) });
      }
    })
    .catch(err => next(err));
};

// ------------------ Openings ------------------

exports.createOpening = (req, res, next) => {
  const data = {
    project_id: req.params.id,
    status: req.body.status,
    description: req.body.description
  };
  project
    .createOpening(data, req.body.tags)
    .then(r => {
      req.broadcastEvent('opening_creation', {
        from: req.params.id,
        id: r[0],
        tag: req.body.tags.split(',')[0],
        what: data.status
      });
      res.send({ id: r[0] });
    })
    .catch(err => next([err, 'Invalid project id']));
};

exports.getProjectOpenings = (req, res, next) => {
  project
    .getProjectOpenings(req.params.id)
    .then(r => {
      if (typeof r === 'string') {
        return next([r, 'Bad id']);
      } else {
        r.forEach(el => {
          el.tags = _.split(el.tags, ',');
        });
        res.send({ openings: r });
      }
    })
    .catch(err => next(err));
};

// ------------------ Likes ------------------
exports.getProjectLikes = (req, res, next) => {
  project
    .getProjectLikes(req.params.id)
    .then(r => {
      res.send({
        upvotes: {
          count: r.length,
          who: r
        }
      });
    })
    .catch(err => next(err));
};

exports.likeProject = (req, res, next) => {
  project
    .likeProject(req.params.id, req.user.id)
    .then(r => {
      if (_.isEmpty(r)) {
        req.broadcastEvent('project_up', {
          id: req.params.id,
          value: -1,
          from: req.user.id
        });
        req.broadcastEvent('add_points', { user_id: req.user.id, points: -2 });
        res.send({ success: true, type: 'Unlike' });
      } else {
        req.broadcastEvent('follow_project', {
          user_id: req.user.id,
          project_id: req.params.id
        });
        req.broadcastEvent('project_up', {
          id: req.params.id,
          value: 1,
          from: req.user.id
        });
        req.broadcastEvent('add_points', { user_id: req.user.id, points: 2 });
        res.send({ success: true, type: 'Like' });
      }
    })
    .catch(err => next([err, 'Invalid id']));
};

//deprecated, both in like
exports.unlikeProject = (req, res, next) => {
  project
    .unlikeProject(req.params.id, req.user.id)
    .then(r => {
      if (r) res.send({ success: true });
      else {
        res.send({ success: false });
      }
    })
    .catch(err => next(err));
};

// ------------------ INVITATION ------------------

exports.inviteTeam = (req, res, next) => {
  project
    .inviteTeam(req.user.id, req.params.id, req.body.id)
    .then(r => {
      res.send({ success: true });
      // mailer.invite_user //toset
    })
    .catch(err => next([err, 'Bad id']));
};

exports.getInvite = (req, res, next) => {
  project
    .getInvite(req.params.id)
    .then(r => {
      res.send({ invitations: r });
    })
    .catch(err => next(err));
};

exports.deleteInvite = (req, res, next) => {
  project
    .deleteInvite(req.user.id, req.params.id)
    .then(r => {
      res.send({ success: true });
    })
    .catch(err => next([err, 'Bad id']));
};
