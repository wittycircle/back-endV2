const network = require('../models/network'),
  crypto = require('crypto'),
  mailer = require('../services/mailer'),
  _ = require('lodash');

const allowed =
  'Allowed: [networks, profile, profile_network, project, university]';

exports.getNetwork = (req, res, next) => {
  network
    .getNetwork(req.params.from)
    .then(r => {
      let o = {};
      if (req.params.from == 'university') {
        o[req.params.from] = r.map(e => {
          return {
            network: e.network,
            launched: e.launched,
            website: e.url
          };
        });
      } else o[req.params.from] = r.map(e => e.network);
      res.send(o);
    })
    .catch(err => next([err, allowed]));
};

exports.getNetworkInfo = (req, res, next) => {
  if (req.params.flag != 'complete')
    return next(['Bad flag', 'allowed: [complete]']);
  network
    .getNetworkInfo(req.user.id, req.params.from)
    .then(r => {
      let o = {};
      o[req.params.from] = r;
      res.send(o);
    })
    .catch(err => next([err, allowed]));
};

exports.createNetwork = (req, res, next) => {
  network
    .createNetwork(req.user.id, req.params.from, req.body)
    .then(r => {
      res.send({ success: true });
    })
    .catch(err => next([err, allowed]));
};

exports.updateNetwork = (req, res, next) => {
  network
    .updateNetwork(req.user.id, req.params.from, req.params.id, req.body)
    .then(r => res.send({ success: true }))
    .catch(err => next([err, allowed]));
};

exports.removeNetwork = (req, res, next) => {
  network
    .removeNetwork(req.user.id, req.params.from, req.params.id)
    .then(r => {
      res.send({ success: true });
    })
    .catch(err => next([err, allowed]));
};

// ------------------ TOKEN / invite ------------------

exports.getFromToken = (req, res, next) => {
  network
    .getFromToken(req.params.token)
    .then(r => {
      res.send({ informations: r });
    })
    .catch(err => next(err));
};

exports.createNewNetwork = (req, res, next) => {
  const token = crypto.randomBytes(40).toString('hex');
  req.body.token = token;
  network
    .createNewNetwork(req.user.id, req.body)
    .then(r => res.send({ token: token }))
    .catch(err => next([err, allowed]));
};

exports.sendVerifyNetwork = (req, res, next) => {
  console.log('sendverifynetwork called');
  let data = {
    token: crypto.randomBytes(40).toString('hex'),
    email: req.body.email,
    network: req.body.network,
    user_id: req.user.id
  };
  network
    .sendVerifyNetwork(data)
    .then(r => {
      mailer.verification_network(data);
      res.send({ success: true });
    })
    .catch(err => next([err, err]));
};

exports.validateNetwork = (req, res, next) => {
  network
    .validateNetwork(req.params.token.trim())
    .then(r => {
      res.send({ success: true });
    })
    .catch(err => next([err, 'Invalid request']));
};
