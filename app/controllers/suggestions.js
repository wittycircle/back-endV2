const suggestions = require('../models/suggestions');

exports.matchProfilesToProject = (req, res, next) => {
  suggestions
    .matchProfilesToProject(req.body.projectId)
    .then(r => res.send(r))
    .catch(err => next([err, 'matchProfilesToProject']));
};

exports.matchProjectsToProfile = (req, res, next) => {
  suggestions
    .matchProjectsToProfile(5526)
    .then(r => {
      res.send(r);
    })
    .catch(err => next([err, 'matchProjectsToProfile']));
};

exports.suggestProfiles = (req, res, next) => {
  suggestions
    .suggestProfiles(req.body.projectId, req.body.profiles)
    .then(r => res.send(r))
    .catch(err => next([err, 'SuggestProfiles']));
};

exports.suggestProjects = (req, res, next) => {
  suggestions
    .suggestProjects(req.body.userId, req.body.projects)
    .then(r => res.send(r))
    .catch(err => next([err, 'SuggestProfiles']));
};
