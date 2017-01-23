/**
 * Created by rdantzer on 23/01/17.
 */

'use strict';

const loglevel = process.env.RS_LOGLEVEL || 'dev',
    Redis = require('redis-sessions'),
    rs = new Redis(require('../private').redis),
    _ = require('lodash'),
    express = require('express'),
    app = express(),
    router = express.Router();

if (loglevel !== 'none') {
    app.use(require('morgan')(loglevel));
}

const _respond = (res, err, resp) => {
    if (err) {
        res.status(400).send(err);
        return;
    }
    res.json(resp);
};

router.route('/:app/activity')
    .get((req, res) => {
        rs.activity({
            app: req.params.app,
            dt: req.query.dt
        }, _.partial(_respond, res))
    });

router.route('/:app/create/:id')
    .post((req, res) => {
        let params = {
            app: req.params.app,
            id: req.params.id,
            ttl: req.body.ttl,
            ip: req.body.ip
        };
        if (_.keys(req.body).length) {
            params = _.extend(params, {
                d: req.body
            })
        }
        rs.create(params, _.partial(_respond, res));
    });

router.route('/:app/get/:token')
    .get((req, res) => {
        rs.set({
            app: req.params.app,
            token: req.params.token
        }, _.partial(_respond, res))
    });

router.route('/:app/set/:token')
    .post((req, res) => {
        rs.set({
            app: req.params.app,
            token: req.params.token,
            d: req.body
        }, _.partial(_respond, res))
    });

router.route('/:app/soapp')
    .get((req, res) => {
        rs.soapp({
            app: req.params.app,
            dt: req.query.dt
        }, _.partial(_respond, res))
    });

router.route('/:app/soid/:id')
    .get((req, res) => {
        rs.soid({
            app: req.params.app,
            id: req.params.id
        }, _.partial(_respond, res))
    });

router.route('/:app/kill/:token')
    .delete((req, res) => {
        rs.kill({
            app: req.params.app,
            token: req.params.token
        }, _.partial(_respond, res))
    });

router.route('/:app/killsoid/:id')
    .delete((req, res) => {
        rs.killsoid({
            app: req.params.app,
            id: req.params.id
        }, _.partial(_respond, res))
    });

router.route('/:app/killall')
    .delete((req, res) => {
        rs.killall({
            app: req.params.app
        }, _.partial(_respond, res))
    });

router.route('/ping')
    .get((req, res) => rs.ping(_.partial(_respond, res)));

module.exports = router;