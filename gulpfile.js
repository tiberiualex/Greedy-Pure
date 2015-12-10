var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sync = require('browser-sync');

gulp.task('sass', function() {
  return gulp.src('styles/greedy.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('styles'))
    .pipe(sync.reload({
      stream: true
    }));
});

gulp.task('sync', function() {
  sync({
    server: {
      baseDir: ''
    },
  });
});

gulp.task('watch', ['sync', 'sass'], function() {
  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch('index.html', sync.reload);
  gulp.watch('js/*.js', sync.reload);
});