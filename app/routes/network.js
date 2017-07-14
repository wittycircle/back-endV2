'use strict';

const express = require('express'),
  router = express.Router(),
  network = require('../controllers/network'),
  { validate, validateParam, schemas } = require('../middlewares/validation'),
  { auth, AUTH } = require('../services/auth');

router
  .route('/networks/admin')
  .post(auth(AUTH.PRIVATE), network.createNewNetwork);

router
  .route('/networks/join')
  .post(auth(AUTH.PRIVATE), network.sendVerifyNetwork);

router
  .route('/networks/join/:token')
  .post(auth(AUTH.PRIVATE), network.validateNetwork);
//token is validation enough ?

router.route('/networks/admin/:token').get(network.getFromToken);

router
  .route('/networks/:from')
  .get(network.getNetwork)
  .post(auth(AUTH.PRIVATE), network.createNetwork);

router
  .route('/networks/:from/:flag')
  .get(auth(AUTH.PRIVATE), network.getNetworkInfo);

// ------------------ Params ------------------
router.param('network_id', validateParam(schemas.params.id));
router.param('token', validateParam(schemas.params.name));
// ------------------ Params ------------------

router
  .route('/networks/:from/:id')
  .put(auth(AUTH.PRIVATE), network.updateNetwork)
  .delete(auth(AUTH.PRIVATE), network.removeNetwork);

module.exports = router;
