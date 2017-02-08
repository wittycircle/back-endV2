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
    debug = require('./app/middlewares/debug');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));

/**
 * Debug middleware
 */
app.use(debug.resDebugger);


require('./app/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public/app/'));
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/app/styles/css'));

router.use(require('./app/routes/index'));
app.use(router);

let server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});

app.get('/tg', (req, res) => {
    require('./app/middlewares/session').session.killAll((err, done) => {res.send({session: 'killed'})});
});
