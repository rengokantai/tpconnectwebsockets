/**
 * Created by Hernan Y.Ke on 2015/9/11.
 */
var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task('move',function(){
    return gulp.src("app/src/*.js")
        .pipe(gulp.dest("app/dest"));
});

gulp.task("default", function () {
    return gulp.src("app/src/main.js")
        .pipe(babel())
        .pipe(gulp.dest("app/dest"));
});