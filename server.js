/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const http = require('http'),
    https = require('https'),
    express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    passport = require('passport'),
    path = require('path'),
    compression = require('compression'),
    // cors = require('cors'),
    cloudinary = require('cloudinary'),
    cookieParser = require('cookie-parser');

let app = express();
app.use(require('prerender-node').set('prerenderToken', 'BzYfju05gGdTtLeibr1B'));

// app.use(cors());

const config = require('./app/private');

cloudinary.config(config.cloudinary);

/**
 * watch() initialize event system
 * mount() provides req.event(event, message)
 */
const events = require('./app/services/events');
app.use(events.mount);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use(compression());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * TODO remove
 */
if (process.env.NODE_ENV === 'development')
    app.disable('etag');

app.use(logger('dev'));

require('./app/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);

require('./app/services/algolia')();
router.use(require('./app/routes/index'));
app.use(router);

// let server = http.createServer(app);
let server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});

