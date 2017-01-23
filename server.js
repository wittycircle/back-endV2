/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const http = require('http'),
    express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    passport = require('passport');


let app = express();

app.use(passport.initialize());
require('./app/config/passport')(passport);

app.set('port', process.env.PORT || 3000);
// app.use(logger('dev'));

app.use(express.static(__dirname + '/public/app/'));
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/app/styles/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('*', (err, req, res, next) => {
    console.log(err);
    next();
});

app.use(require('./app/config/custom_validator'));

router.use(logger('dev'));

app.use(require('./app/middlewares/debug').resDebugger);

router.use(require('./app/routes/index'));
app.use(router);

let server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});
