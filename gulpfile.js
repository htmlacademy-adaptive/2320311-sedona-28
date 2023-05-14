import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
export const html = () => {
  return gulp.src("soruce/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

// Scripts
const script = () => {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(gulp.dest("build/js"))
}

// Images
export const optimizeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"))
}

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(gulp.dest("build/img"))
}

// WebP
export const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(squoosh(encodeOptions{
      webp: {}
    }))
    .pipe(gulp.dest("build/img"))
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  html, styles, server, watcher
);
