var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    ejs = require("gulp-ejs"),
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
gulp.task('js',function(){
    return gulp.src([
        'src/js/a.js',
        'src/js/b.js'
    ])
    .pipe(concat('common.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'js task complete' }));
});
gulp.task('uglify', ['js'], function() {
  return gulp.src(['dist/js/*.js', '!dist/js/*.min.js'])
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({}))
    .pipe(gulp.dest('dist/js'));
});
gulp.task('ejs', function () {
  return gulp.src(["src/view/*.html", "!src/view/_*.html"])
    .pipe(ejs({}))
    .pipe(gulp.dest("dist/view"));
});
gulp.task('clean', function() {
    del(['dist/css','dist/js'])
});
gulp.task('serve', ['styles'], function() {
    browserSync.init({
        server: "./dist/view"
    });
    gulp.watch('src/css/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['uglify']);
    gulp.watch("src/view/*.html",['ejs']).on('change', browserSync.reload);
});
gulp.task('default', ['clean','ejs','uglify','serve']);
