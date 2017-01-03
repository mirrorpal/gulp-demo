var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(),
    del = require('del');

gulp.task('styles', function() {
  return gulp.src('src/css/layout.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(browserSync.stream());
});
gulp.task('clean', function() {
    del(['dist/css'])
});
gulp.task('serve', ['styles'], function() {
        browserSync.init({
            server: "./src/view"
        });
        gulp.watch('src/css/*.scss', ['styles']);
        gulp.watch("src/view/*.html").on('change', browserSync.reload);
   });
gulp.task('default', ['clean','serve']);
