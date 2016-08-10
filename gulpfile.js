(function () {
    var gulp = require("gulp");
    var nodemon = require("gulp-nodemon");
    var task = require('require-dir')('./gulp-tasks');

    gulp.task('nodemon', function (cb) {
	
		var started = false;
		
		return nodemon({
			script: 'app.js'
		}).on('start', function () {
			if (!started) {
				cb();
				started = true; 
			} 
		});
	});

    gulp.task('start',['bundler', 'bsync']);
}());