var gulp = require("gulp");
var minifyJs = require("gulp-minify");

gulp.task('minify-js', function(){
    return gulp.src('dist/default-passive-events.js')
        .pipe(minifyJs())
        .pipe(gulp.dest('dist'));
});