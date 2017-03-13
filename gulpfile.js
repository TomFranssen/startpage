'use strict';
var gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    gulpPlumber = require('gulp-plumber'),
    gulpAutoprefixer = require('gulp-autoprefixer'),
    gulpLivereload = require('gulp-livereload'),
    gulpUglify = require('gulp-uglify'),
    gulpConcat = require('gulp-concat'),
    gulpRimraf = require('gulp-rimraf');

gulp.task('clean-css', function() {
    return gulp.src('target/css/**/*.*', {
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
        .pipe(gulp.dest('target/css'))
        .pipe(gulpLivereload());
});

gulp.task('clean-javascript', function() {
    return gulp.src('target/js/**/*.*', {
        read: false
    }).pipe(gulpRimraf());
});

gulp.task('javascript', ['clean-javascript'], function () {
    gulp.src(['source/js/*.js'])
        .pipe(gulpUglify())
        .pipe(gulpConcat('main.js'))
        .pipe(gulp.dest('target/js'));
});

gulp.task('watch', function () {
    gulpLivereload.listen();
    gulp.watch(themePath + '/scss/**/*.scss', ['scss']).on('change',
        function(event) {
            console.log('SCSS file ' + event.path + ' was ' + event.type);
        }
    );
});

gulp.task('build', ['scss']);

gulp.task('default', function() {
    console.log('No default gulp task defined, use \'gulp --tasks\' to list all tasks.');
});
