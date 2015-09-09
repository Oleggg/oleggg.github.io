var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Gulp Sass Task 
gulp.task('sass', function() {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
})
// Gulp Jekyll Build Task 
gulp.task('jekyll', function () {
    gulp.src(['./index.html', './_layouts/*.html', './_posts/*.{markdown,md}'])
        .pipe(jekyll({
            source: './',
            destination: './deploy/',
            bundleExec: true
        }))
        .pipe(gulp.dest('./deploy/'));
});

// Create Gulp Default Task
// ------------------------
// Having watch within the task ensures that 'sass' has already ran before watching
// 
// This setup is slightly different from the one on the blog post at
// http://www.zell-weekeat.com/gulp-libsass-with-susy/#comment-1910185635
//gulp.task('default', ['sass'], function () {
gulp.task('default', ['sass', 'jekyll'], function () {
  gulp.watch('./scss/{,*/}*.{scss,sass}', ['sass'])
});

