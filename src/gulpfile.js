var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var nib = require('nib');
var uglify = require('gulp-uglify');
var markdown = require('gulp-markdown');
var fileinclude = require('gulp-file-include');

gulp.task('stylus', function() {
  gulp.src('content/stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus({
    	compress: true,
    	use: nib()
    }))
    .pipe(gulp.dest('../css'));
});

gulp.task('compress', function() {
  return gulp.src('content/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../js'));
});

// gulp.task('markdown', function () {
//     return gulp.src('content/md/*.md')
//         .pipe(markdown())
//         .pipe(gulp.dest('../'));
// });

gulp.task('fileinclude', function() {
  gulp.src(['content/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      filters: {
        markdown: markdown.marked.parse
      }
    }))
    .pipe(gulp.dest('../'));
});

gulp.task('watch', function() {
  gulp.watch('content/stylus/*.styl', ['stylus']);
  gulp.watch('content/js/*.js', ['compress']);
  // gulp.watch('md/*.md', ['markdown']);
  gulp.watch('content/md/*', ['fileinclude']);
});

gulp.task('default', ['stylus', 'compress', 'fileinclude', 'watch']);
