/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    path = require('path');

let app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});

const users = require('./app/models/users');

const router = express.Router();


router.get('/users', (req, res, next) => {
    users.findAll((err, results) => {
        if (err)
            throw err;
        else
            res.send(results);
    }, ['email', 'username']);
});


router.param('id', (req, res, next, id) => {
    users.findById((err, results) => {
        if (err)
            throw err;
        else {
            req.user = results;
            next();
        }
    }, id)
});

router.get('/users/:id', (req, res, next) => {
    if (req.user)
        res.send(req.user);
    else
        throw 'tg';
});

app.use(router);
