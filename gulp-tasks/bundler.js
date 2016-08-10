var gulp = require("gulp");
var gutil = require("gulp-util");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var watchify = require("watchify");
gulp.task("bundler", function () {
    var bundler = watchify(browserify({
        entries: ['./Scripts/app/app.js'],
        extensions: ['.js'],
        debug: true,
        packageCache: {},
        fullPaths: true
    }));


    function build(file) {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, "browserify error"))
            .pipe(source('main.js'))
            .pipe(gulp.dest('./Scripts/app/'));
    };

    build();
    bundler.on('update', build);
});