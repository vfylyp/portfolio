var	gulp           	= require('gulp'),
    sass           	= require('gulp-sass')(require('sass')),
    rename         	= require('gulp-rename'),
    autoprefixer   	= require('gulp-autoprefixer'),
    notify         	= require("gulp-notify"),
    uglify          = require('gulp-uglify-es').default,
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache'),
    concat          = require('gulp-concat');
    del             = require('del');

gulp.task('sass', function() {
    return gulp.src('assets/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions']}))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('fonts', function() {
    return gulp.src('assets/fonts/**/*')
        .pipe(cache())
        .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('html', function() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('dist/'))
});

gulp.task('image', function() {
    return gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('favicon', function() {
    return gulp.src('favicon.ico')
        .pipe(gulp.dest('dist/'))
});

gulp.task('js', function() {
	return gulp.src([
            'assets/libs/parallax/parallax.min.js',
            'assets/libs/wow/wow.js',
            'assets/js/common.js'
        ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('watch', function() {
    gulp.watch( 'assets/sass/**/*.sass', gulp.parallel('sass') );
    gulp.watch( 'assets/js/common.js', gulp.parallel('js') );
    gulp.watch( './index.html', gulp.parallel('html') );
    gulp.watch( 'assets/images/**/*', gulp.parallel('image') );
});

gulp.task('removedist', function() {
    return del(['dist'], { force: true })
});

gulp.task('default', gulp.parallel('watch'));

gulp.task('build', gulp.parallel( 'sass', 'js', 'html', 'image', 'favicon'));
