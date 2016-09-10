var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var pump = require("pump");
var del = require("del");
var exec = require("child_process").exec;
var babelify = require("babelify");
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var Server = require("karma").Server;
var glob = require("glob");
var concatCss = require("gulp-concat-css");
var mainBowerFiles = require('gulp-main-bower-files');

//deletes the public directory, so we don't reuse artefacts of previous gulps
gulp.task("clear-public", function () {
    return del(["public"]);
});

gulp.task("combine-vendor", ["clear-public"], function() {
    return gulp.src("./bower.json")
        .pipe(mainBowerFiles())
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("./public/js/"));
});

var dependencies = [
    //angular module must be initialized first
    "./src/js/app.js",
    //all configurations next
    "./src/js/config/**/*.js",
    //all services next
    "./src/**/*Service.js",
    //all filters after that
    "./src/**/*Filter.js",
    //finally controllers
    "./src/**/*Controller.js"
];
//combines, transpiles and browserifies all js referenced by app.js into a single ./public/js/combined.js
gulp.task("combine-js", ["clear-public", "combine-vendor"], function () {
    return gulp.src(dependencies)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat("combined.js"))
        .pipe(gulp.dest("./public/js/"));
});

//combines all CSS files in the ./src/**/ tree into one file at ./public/styles/bundle.css
gulp.task("combine-css", ["clear-public"], function () {
    return gulp.src("./src/**/*.css")
        .pipe(concatCss("styles/bundle.css"))
        .pipe(gulp.dest("./public/"));
});

//moves all static html content out to ./public/
gulp.task("move-static", ["clear-public"], function () {
    return gulp.src([
        "./src/views/**/*.html"
    ])
        .pipe(gulp.dest("./public/"));
});

//runs the *Spec.js tests in /tests/unit-tests/**/*Spec.js through Karma with the Chrome launcher
gulp.task("test", ["clear-public", "combine-js", "combine-css", "move-static"], function (done) {
    new Server({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }, done).start();
});

// Default task(s).
gulp.task("default",
    [
        "clear-public",
        "combine-vendor",
        "combine-js",
        "combine-css",
        "move-static"
    ]);