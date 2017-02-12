var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var del = require('del');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('styles', function () {
    var injectAppFiles = gulp.src('src/styles/*.scss', { read: false });
    var injectGlobalFiles = gulp.src('src/global/*.scss', { read: false });

    function transformFilepath(filepath) {
        return '@import "' + filepath + '";';
    }

    var injectAppOptions = {
        transform: transformFilepath,
        starttag: '// inject:app',
        endtag: '// endinject',
        addRootSlash: false
    };

    var injectGlobalOptions = {
        transform: transformFilepath,
        starttag: '// inject:global',
        endtag: '// endinject',
        addRootSlash: false
    };

    return gulp.src('src/main.scss')
      .pipe(wiredep())
      .pipe(inject(injectGlobalFiles, injectGlobalOptions))
      .pipe(inject(injectAppFiles, injectAppOptions))
      .pipe(sass())
      .pipe(gulp.dest('dist/styles'));
});

gulp.task('fonts', function () {
    return gulp.src('bower_components/font-awesome/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('build', ['styles', 'images', 'fonts'], function () {
    var injectFiles = gulp.src(['dist/styles/main.css']);

    var injectOptions = {
        addRootSlash: false,
        ignorePath: ['src', 'dist']
    };

    return gulp.src('src/*.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      .pipe(inject(injectFiles, injectOptions))
      .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
      // Caching images that ran through imagemin
      /*.pipe(cache(imagemin({
        interlaced: true,
      })))*/
      .pipe(gulp.dest('dist/images'))
});

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    })
})