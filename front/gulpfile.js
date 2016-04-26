var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('copy', function() {
    gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/angular2/bundles/angular2-polyfills.min.js'
    ])
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('build', ['copy'], function() {
    browserify('src/bootstrap.js', { debug: true })
        .transform("babelify")
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
