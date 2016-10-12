const GULP = require("gulp");
const MINIFY_JS = require("gulp-minify");

GULP.task('minify-js', function(){
    return GULP.src('dist/default-passive-events.js')
        .pipe(MINIFY_JS())
        .pipe(GULP.dest('dist'));
});