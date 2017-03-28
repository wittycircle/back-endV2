'use strict';

const express = require('express'),
    router = express.Router(),
    network = require('../controllers/network'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');

router.route('/networks/:from')
    .get(network.getNetwork)
    .post(network.createNetwork);

router.route('/networks/:from/:flag')
    .get(network.getNetworkInfo)


// ------------------ Params ------------------
router.param('network_id', validateParam(schemas.params.id));
// ------------------ Params ------------------

router.route('/networks/:from/:id')
    .put(network.updateNetwork)
    .delete(network.removeNetwork);


module.exports = router;