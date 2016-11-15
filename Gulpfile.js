const gulp = require("gulp");
const minify_js = require("gulp-minify");

gulp.task('minify-js', function () {
    return gulp.src('dist/default-passive-events.js')
        .pipe(minify_js())
        .pipe(gulp.dest('dist'));
});
