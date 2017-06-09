'use strict';
const gulp = require('gulp'),
    gulpBabel = require('gulp-babel'),
    gulpSass = require('gulp-sass'),
    gulpPlumber = require('gulp-plumber'),
    gulpAutoprefixer = require('gulp-autoprefixer'),
    gulpLivereload = require('gulp-livereload'),
    gulpUglify = require('gulp-uglify'),
    gulpConcat = require('gulp-concat'),
    gulpRimraf = require('gulp-rimraf');

gulp.task('clean-css', function() {
    return gulp.src('app/css/**/*.*', {
        read: false
    }).pipe(gulpRimraf());
});

gulp.task('scss', ['clean-css'], function () {
    return gulp.src('source/scss/[^_]*.scss')
        .pipe(gulpPlumber())
        .pipe(gulpSass({
            outputStyle : 'compressed'
        }).on('error', gulpSass.logError))
        .pipe(gulpAutoprefixer({
            browsers : ['last 2 versions']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(gulpLivereload());
});

gulp.task('clean-javascript', function() {
    return gulp.src('target/js/**/*.*', {
        read: false
    }).pipe(gulpRimraf());
});

gulp.task('javascript', ['clean-javascript'], function () {
    gulp.src([
            'node_modules/knockout/build/output/knockout-latest.js',
            'node_modules/knockout-mapping/dist/knockout.mapping.min.js',
            'source/js/*.js'
        ])
        .pipe(gulpBabel({
            presets: ['es2015']
        }))
        // .pipe(gulpUglify())
        .pipe(gulpConcat('main.js'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', function () {
    gulpLivereload.listen();
    gulp.watch('source/scss/**/*.scss', ['scss']).on('change',
        function(event) {
            console.log('SCSS file ' + event.path + ' was ' + event.type);
        }
    );
    gulp.watch('source/js/**/*.js', ['javascript']).on('change',
        function(event) {
            console.log('JS file ' + event.path + ' was ' + event.type);
        }
    );
});

gulp.task('generate-service-worker', function(callback) {
    var swPrecache = require('sw-precache');
    var rootDir = 'app';

    swPrecache.write(`${rootDir}/service-worker.js`, {
        staticFileGlobs: [rootDir + '/**/*.{php,js,html,css,png,jpg,gif,svg,eot,ttf,woff,json}'],
        stripPrefix: rootDir,
        maximumFileSizeToCacheInBytes: 10097152,
        runtimeCaching: [{
            urlPattern: /^https:\/\/scontent\.cdninstagram\.com/,
            handler: 'networkFirst',
            options: {
                cache: {
                    maxEntries: 50,
                    name: 'instagram-images-cache'
                }
            }
        }]
    }, callback);
});

gulp.task('build', ['scss', 'javascript']);

gulp.task('default', function() {
    console.log('No default gulp task defined, use \'gulp --tasks\' to list all tasks.');
});
