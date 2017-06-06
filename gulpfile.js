/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 13:44
 */

//module.paths.push('/usr/lib/node_modules');		//	Путь к модулям ноды

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	header = require('gulp-header'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	dotify = require('gulp-dotify'),
	watch = require('gulp-watch'),
	pkg = require('./package.json');

var banner = ['/**',
	' * <%= pkg.description %>',
	' * @version v<%= pkg.version %>',
	' * @developer Anton Desin http://desin.name/',
	' * @site http://desin.name/',
	' * @email anton.desin@gmail.com',
	' */',
	''].join('\n');

gulp.task('scripts', function () {
	gulp.src('./src/js/**/*.js')
		.pipe(concat('boreus.js'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('.'));
	gulp.src('./src/js/**\/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('boreus.min.js'))
		.pipe(uglify())
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
	watch('./src/js/**/*.js', function(){
		gulp.run('scripts');
	});
});

gulp.task('default', ['images', 'sprite', 'sprite-retina', 'less', 'scripts', 'templates', 'watch']);
