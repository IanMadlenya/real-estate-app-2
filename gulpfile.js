'use strict';

const gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    newer = require('gulp-newer'),
    connect = require('gulp-connect'),
    merge = require('merge2'),
    debug = require('gulp-debug'),
    del = require('del');

const tsProject = tsc.createProject('tsconfig.json'),
    tsFiles = './client/src/**/*.ts',
    scssFile = './client/src/styles/main.scss',
    scssFiles = './client/src/**/*.scss',
    src = './client/src/',
    dist = './client/dist';

/* ------ main tasks ------ */

gulp.task('html', function () {
    gulp.src('./client/src/**/*.html')
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});

// task for compiling scss
gulp.task('scss', function () {
    return gulp.src(scssFile)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(dist + '/styles'))
        .pipe(connect.reload());
});

// task for compiling typescript
gulp.task('ts', function () {
    let result = tsProject.src(tsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    let jsStream = result.js
        .pipe(sourcemaps.write('.', {sourceRoot: '/', includeContent: false, debug: true}))
        .pipe(gulp.dest(dist));

    let tsStream = gulp.src(tsFiles)
        .pipe(gulp.dest(dist));

    let dtsStream = result.dts.pipe(gulp.dest(dist));

    return merge(tsStream, jsStream, dtsStream);
});

gulp.task('clean', function (cb) {
    // delete files
    del(dist + '/**/*', cb);
});

// task for synchronizing folders
gulp.task('sync', function (done) {
    gulp.src([src + '**/*', '!' + scssFiles, '!' + tsFiles])
        .pipe(newer(dist))
        .pipe(gulp.dest(dist));
});

// copy dependencies
gulp.task('copy:libs', function () {
    return merge(
        gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ]).pipe(gulp.dest(dist + '/lib')),
        gulp.src([
            'node_modules/font-awesome/fonts/**/*',
            'node_modules/bootstrap/dist/fonts/**/*'
        ]).pipe(gulp.dest(dist + '/fonts')),
        gulp.src([
            'node_modules/angular2-in-memory-web-api/**/*.js',
            '!node_modules/angular2-in-memory-web-api/src/**/*'
        ]).pipe(gulp.dest(dist + '/lib/angular2-in-memory-web-api')),
        gulp.src([
            'node_modules/@angular/**/*.js'
        ]).pipe(gulp.dest(dist + '/lib/@angular')),
        gulp.src([
            'node_modules/rxjs/**/*'
        ]).pipe(gulp.dest(dist + '/lib/rxjs')),
        gulp.src([
            src + 'preloader/350.gif'
        ]).pipe(gulp.dest(dist))
    );
});

// watching for file changes
gulp.task('watch', function () {
    gulp.watch(src + '**/*', ['scss', 'ts', 'html', 'sync']);
});

gulp.task('build', ['scss', 'ts', 'copy:libs', 'sync'], function (cb) {
    cb(err);
});

/*gulp.task('cleanBuild', [/!*'clean', *!/'build']);*/

// default task
gulp.task('default', ['build', 'watch']);