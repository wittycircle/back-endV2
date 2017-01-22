/**
 * Created by rdantzer on 22/01/17.
 */

'use strict';

const gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    apidoc = require('gulp-apidoc');


gulp.task('default', () => console.log('no task default defined'));

/**
 *  Launch unit tests in ./tests
 */
gulp.task('test', () =>
    gulp.src('tests/*test.js')
        .pipe(mocha({
            reporter: 'nyan'
        }))
        /**
         * database lingering connection killer
         */
        .once('error', () => process.exit(1))
        .once('end', () => process.exit())
);

/**
 * Parse api definition in /api
 * generate an index.html with generated documentation
 */
gulp.task('apidoc', cb => {
    apidoc({
        src: 'api',
        dest: 'api-build',
        debug: true
    }, cb);
});