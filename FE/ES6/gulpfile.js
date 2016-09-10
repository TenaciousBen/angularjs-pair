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

//deletes the public directory, so we don't reuse artefacts of previous gulps
gulp.task("clear-public", function () {
    return del(["public"]);
});

//Transpiles a given set of ES6 javascript files into a single ES5 file
function transpile(entries, destination, name, minify = true) {
    var bundler = browserify({
        entries: entries,
        debug: true
    });
    bundler.transform(babelify);

    var piped = bundler.bundle()
        .on('error', function (err) {
            console.error(err);
        })
        .pipe(source(name))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}));

    if (minify) {
        piped = piped.pipe(uglify({
            mangle: false
        }));
    }

    piped
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destination));
}

//combines, transpiles and browserifies all js referenced by app.js into a single ./public/js/combined.js
gulp.task("combine-js", ["clear-public"], function () {
    transpile("./src/js/app.js", "./public/js/", "combined.js");
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
        "combine-js",
        "combine-css",
        "move-static"
    ]);