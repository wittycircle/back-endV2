/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    apidoc = require('gulp-apidoc'),
    os = require('os'),
    open = require('gulp-open'),
    help = require('gulp-help')(gulp);


const browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
                os.platform() === 'win32' ? 'chrome' : 'firefox'));

/**
 *  Launch unit tests in ./tests
 */
gulp.task('test', 'Executes unit tests and open them in mocha reporter', () => {
    gulp.src('tests/*test.js')
        .pipe(mocha({
            reporter: 'mochawesome'
        }))
        /**
         * database lingering connection killer
         */
        .once('error', () => process.exit(1))
        .once('end', () => process.exit());

        gulp.src('mochawesome-reports/mochawesome.html')
            .pipe(open({app: browser}));
});

/**
 * Parse api definition in /api
 * generate an index.html with generated documentation
 */
gulp.task('apidoc', 'Generates api documentation html', cb => {
    apidoc({
        src: 'api',
        dest: 'api-build',
        debug: true
    }, cb);
});

gulp.task('api', 'Open the latest documentation revision', () => {
    gulp.src('./api-build/index.html')
        .dest(open({app: browser}))
});

