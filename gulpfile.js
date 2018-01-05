const gulp = require('gulp');
const ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');
 
gulp.task('ts', function () {
	var tsResult = tsProject.src()
		.pipe(tsProject());

	return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('watch', ['ts'], function() {
	gulp.watch(tsProject.config.include, ['ts']);
})