var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var del = require('del');
var exec = require('child_process').exec;
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var Server = require('karma').Server;
var glob = require('glob');

//deletes the public directory, so we don't reuse artefacts of previous gulps
gulp.task("clear-public", function () {
    return del(['public']);
});

//Transpiles a given set of ES6 javascript files into a single
//ES5 file
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

//Combines all js in the application referenced by app.js
gulp.task("combine-js", ["clear-public"], function () {
    transpile('./src/js/app.js', './public/js/', 'combined.js', false);
});

gulp.task('move-static', ["clear-public"], function () {
    return gulp.src([
        './src/views/**/*.html',
        './src/views/**/*.css'
    ])
        .pipe(gulp.dest('./public/'));
});

gulp.task('test', ["clear-public", "combine-js", "move-static"], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});
// Default task(s).
gulp.task("default",
    [
        "clear-public",
        "combine-js",
        "move-static",
        "test",
        // "run-node"
    ]);