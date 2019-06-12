const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
// const browserslist = require('gulp-br');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('../scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('../build/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('../build'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function () {

    browserSync.init({
        server: "../build"
    });
    gulp.watch('*.scss', gulp.parallel('sass'));
    gulp.watch('*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.series('html', 'sass', 'serve'));