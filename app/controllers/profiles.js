/**
 * Created by rdantzer on 18/01/17.
 */
'use strict';
const profiles = require('../models/profiles'),
  user = require('../models/users'),
  mailer = require('../services/mailer'),
  _ = require('lodash');

const has_liked = (foli, id) => {
  let hasLiked = false;
  let infollo = _.split(foli, ',');
  infollo.forEach(e => {
    if (e == id) hasLiked = true;
  });
  return hasLiked;
};

exports.getProfiles = (req, res, next) => {
  profiles
    .getProfiles()
    .then(profiles => {
      if (_.isEmpty(profiles)) next({ code: 404 });
      else res.send({ profiles: profiles });
    })
    .catch(err => next(err));
};

exports.getProfile = (req, res, next) => {
  profiles
    .getProfileBy({ 'p.id': req.params.id })
    .then(profile => {
      if (req.user && req.user.id) {
        profile.hasLiked = has_liked(profile.foli, req.user.id);
        req.broadcastEvent('add_points', { id: req.user.id, points: 1 });
        req.broadcastEvent('profile_view', {
          from: req.user.id,
          id: req.params.id
        });
      }
      delete profile.foli;
      res.send({ profile: profile });
    })
    .catch(err => next([err, 'Invalid']));
};

exports.updateProfile = (req, res, next) => {
  const location = req.body.location;
  delete req.body.location;
  profiles
    .updateProfile(req.body, location, { id: req.params.id })
    .then(r => {
      if (r) {
        req.broadcastEvent('profile_update', { id: req.params.id });
        res.send({ success: true });
      } else res.status(400).send({ success: false });
    })
    .catch(err => next(err));
};
// ------------------ Follow ------------------

exports.getProfileFollowers = (req, res, next) => {
  Promise.all([
    profiles.getProfileFollowers('l.user_id', 'l.followed', req.params.id),
    profiles.getProfileFollowers('l.followed', 'l.user_id', req.params.id),
    user.getProjectFollow(req.params.id)
  ])
    .then(([r, r1, r2]) => {
      let o = {
        project_upvoted: r2.length,
        following_count: r.length,
        followers_count: r1.length
      };
      res.send({ Count: o, upvoted: r2, following: r, followers: r1 });
    })
    .catch(err => next([err, 'Invalid id']));
};

exports.followProfile = (req, res, next) => {
  profiles
    .followProfile(req.params.id, req.user.id)
    .then(r => {
      if (_.isEmpty(r)) {
        req.broadcastEvent('user_follow', {
          from: req.user.id,
          id: req.params.id,
          value: -1
        });
        req.broadcastEvent('add_points', { user_id: req.params.id, points: -2 });
        req.broadcastEvent('add_points', { user_id: req.user.id, points: -1 });
        res.send({ success: true, type: 'Unlike' });
      } else {
        req.broadcastEvent('mailer_follow_profile', {
          follower: req.user.id,
          following: req.params.id
        });
        req.broadcastEvent('user_follow', {
          from: req.user.id,
          id: req.params.id,
          value: 1
        });
        req.broadcastEvent('add_points', { user_id: req.params.id, points: 2 });
        req.broadcastEvent('add_points', { user_id: req.user.id, points: 1 });
        res.send({ success: true, type: 'Like' });
      }
    })
    .catch(error => next([error, 'Bad id']));
};

// ------------------ Location ------------------
exports.getLocation = (req, res, next) => {
  profiles
    .getLocation(req.params.id)
    .then(([r]) => res.send({ location: r }))
    .catch(err => next(err));
};

exports.updateLocation = function(req, res, next) {
  profiles
    .updateLocation(req.body.location, { id: req.params.id })
    .then(r => {
      if (r) res.send({ success: true });
      else res.send({ success: false });
    })
    .catch(err => next(err));
};
