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
    debug = require('./app/middlewares/debug'),
    cache = require('./app/services/cache'),
    path = require('path');

cache.init();

let app = express();

/**
 * Todo replace public by release which will contains built js files
 */
router.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

app.use(logger('dev'));

/**
 * Debug middleware
 */
// app.use(debug.resDebugger);


require('./app/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);

router.use(require('./app/routes/index'));
app.use(router);

let server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});
