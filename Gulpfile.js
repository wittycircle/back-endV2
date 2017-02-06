/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    apidoc = require('gulp-apidoc'),
    os = require('os'),
    open = require('gulp-open'),
    help = require('gulp-help')(gulp),
    //https://nodejs.org/api/child_process.html
    spawn = require('child_process').spawn;


const browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
                os.platform() === 'win32' ? 'chrome' : 'firefox'));

gulp.task('run', 'Launch server', ['redis'], function () {
    let server = spawn('nodemon', ['server.js']);

    server.stdout.on('data', (data) => {
        console.log(`NODE: ${data}`)
    });

    server.stderr.on('data', (data) => {
        console.error(`NODERR: ${data}`)
    });

    server.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    });
});

gulp.task('redis', 'Launch redis-server', function () {
    let redis = spawn('redis-server', ['redis.conf']);

    redis.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    });

    redis.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    });

    redis.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    });
});
/**
 *  Launch unit tests in ./tests
 */
gulp.task('test', 'Executes unit tests and open them in mocha reporter', () => {
    gulp.src('tests/index.js')
        .pipe(mocha({
            reporter: 'mochawesome',
        }))
        /**
         * database lingering connection killer
         */
        .once('error', () => process.exit(1))
        .once('end', () => process.exit());
});

/**
 * Parse api definition in /api
 * generate an index.html with generated documentation
 */
gulp.task('apidoc', 'Generates api documentation html', cb => {
    apidoc({
        src: 'api',
        dest: 'api-build',
        debug: true,
        template: './api/template/'
    }, cb);
});

gulp.task('api', 'Open the latest documentation revision', ['apidoc'], () => {
    gulp.src('./api-build/index.html')
        .pipe(open({app: browser}))

});

