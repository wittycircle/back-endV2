const project = require('../models/projects'),
  // format = require('./format'),
  redis = require('ioredis')(require('../private').redis), //<= sale
  mailer = require('../services/mailer');
_ = require('lodash');

// ------------------ Project [main methods] ------------------
const data = req => {
  let r = {
    user_id: req.user.id,
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
        mailer.new_project({ uid: req.user.id, public_id: d.public_id });
        req.broadcastEvent('project_creation', { id: r, from: req.user.id });
        res.send({ id: d.public_id });
      })
      .catch(err => next(['Invalid information', err]));
  });
};

exports.updateProject = (req, res, next) => {
  req.body.category_id = req.body.category;
  delete req.body.category;
  project
    .updateProject(req.params.id, req.body)
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
          let ar = e.hasLiked.split(',');
          let nik = false;
          ar.forEach(el => {
            console.log('el', el);
            if (el === uid) {
              console.log('success', el, uid);
              nik = true;
            }
          });
          e.hasLiked = ar.indexOf(uid) != -1;
          console.log('ar', ar);
          console.log('uid', uid);
          console.log('e.hasLiked', e.hasLiked);
          console.log('nik', nik);
        });
      }
      res.send({ project: r[0] });
    })
    .catch(err => next(err));
};

// ------------------ Discussions ------------------
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
        res.send({ success: true, type: 'Unlike' });
      } else {
        // mailer.upvote_project({user_id: req.user.id, project_id: req.params.id})
        req.broadcastEvent('follow_project', {
          user_id: req.user.id,
          project_id: req.params.id
        });
        req.broadcastEvent('project_up', {
          id: req.params.id,
          value: 1,
          from: req.user.id
        });
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
