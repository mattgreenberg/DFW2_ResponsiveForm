// Package Declerations
var gulp           = require('gulp'),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync').create(),
	postcss        = require('gulp-postcss'),
	autoprefixer   = require('autoprefixer');

// Default Task
gulp.task('default', ()=>{

});

// Process SCSS
gulp.task('scss', ()=>{

	// Auto Prefixer browser list
	var processors = [
		autoprefixer({ browsers: ['last 2 versions'] })
	];
	// Process SCSS files 
	return gulp.src('./scss/*.scss')
	.pipe(sass())
	.pipe(postcss(processors))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.reload({
		stream: true
	}));

});

// Browser Sync
gulp.task('browser-sync', ()=>{
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

// Watch Task
gulp.task('watch', ['browser-sync', 'scss'], ()=>{
	gulp.watch('./scss/**/*.scss', ['scss']);
});