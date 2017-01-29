/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const http = require('http'),
    express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    passport = require('passport'),
    middlewares = require('./app/middlewares/debug');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));

/**
 * Error middleware
 */
app.use(middlewares.errorLogger);

/**
 * Debug middleware
 */
app.use(middlewares.resDebugger);


require('./app/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public/app/'));
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/app/styles/css'));
app.use(require('./app/config/custom_validator'));

router.use(require('./app/routes/index'));
app.use(router);

let server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});
