const gulp = require('gulp');
const ts = require('gulp-typescript');
const beautify = require('gulp-beautify');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function () {
	var tsResult = tsProject.src()
		.pipe(tsProject());

	return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('js', function () {
	gulp.src('src/*.js')
		.pipe(beautify({
			indent_with_tabs: true
		}))
		.pipe(gulp.dest('./build'));
});

gulp.task('watch', ['ts', 'js'], function () {
	gulp.watch(tsProject.config.include, ['ts']);
	gulp.watch('src/**/*.js', ['js']);
});

gulp.task('build', ['ts', 'js']);