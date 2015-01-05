// npm i --save-dev gulp browser-sync gulp-sass gulp-autoprefixer gulp-plumber gulp-csso gulp-rename gulp-sourcemaps gulp-size vinyl-source-stream vinyl-buffer gulp-util watchify browserify gulp-jshint jshint-stylish gulp-uglify del gulp-shell gulp-watch
var gulp          = require('gulp')
var browserSync   = require('browser-sync')
var reload        = require('browser-sync').reload
var sass          = require('gulp-sass')
var autoprefixer  = require('gulp-autoprefixer')
var csso          = require('gulp-csso')
var rename        = require('gulp-rename')
var sourcemaps    = require('gulp-sourcemaps')
var plumber       = require('gulp-plumber')
var size          = require('gulp-size')
var source        = require('vinyl-source-stream')
var buffer        = require('vinyl-buffer')
var gutil         = require('gulp-util')
var watchify      = require('watchify')
var browserify    = require('browserify')
var jshint        = require('gulp-jshint')
var uglify        = require('gulp-uglify')
var del           = require('del')
var shell         = require('gulp-shell')
var watchG        = require('gulp-watch')

// ------------------------------------------
// Notes:
// - Two builds: 
//   1) For development (tmp)
//     - unminified 
//     - source mapped
//     - linted
//     - root located in current
//       directory to mirror deployment
//   2) for deployment (ship)
//     - minified
//     - located anywhere, such as in 
//       platform-specific theme locations
// - Easy to extend existing tasks.
//
// Usage:
// For Development: 2 gulp commands, 2 terminals, same directory
// gulp hugo-watch
// gulp watch
// For Production:
// Done. This approach constantly builds your production/shippable 
// ready theme in the base "themes" directory. By default, this is 
// named "Awesome-New-Theme"... customize below.

// --- Configuration below ---

// Destination for shippable theme
// Needs to go to root of 'themes' directory
// Rename for your theme
var dest_root = "./../Awesome-New-Theme/"

// All other config here: 
var config = { 

  // sources
  copy_src:     ['**/*.{html,md,txt,yaml,json,toml}', '!./node_modules/**', '!./package.json'],
  sass_src:     "static-src/sass/**/*.{sass,scss}",
  js_src:       "static-src/js/**/*.js",
  js_src_entry: "./static-src/js/index.js",
  
  // tmp locations for development
  tmp_js:   "./static/js",
  tmp_css:  "static/css",

  // name for single browserified bundle
  bundle_js: "bundle.js",

  // specific destination paths
  dest_js:   dest_root + "static/js",
  dest_css:  dest_root + "static/css"
}


// -- No Config Needed Below --
// -- only additions/customizations

// -----------------------
// Convenience task to run 
// hugo watch for the development
// theme from its root directory

gulp.task('hugo-watch', function() {
  return gulp.src('', {read: false})
    .pipe(shell('hugo server --theme=ss-hugo --buildDrafts --watch', {
      cwd: "./../../"
    }))
})


// -----------------------
// Core Tasks

gulp.task('watch', ['copy-ship', 'sass-dev', 'sass-ship', 'jshint', 'browserify', 'js_ship'], function() {
  watchG( config.sass_src, function() {
    gulp.start('sass-dev')
    gulp.start('sass-ship')
  })
  watchG( config.js_src, function() {
    gulp.start('jshint')
  })
  watchG( config.copy_src, function() {
    gulp.start('copy-ship')
  })
})
  
gulp.task('clean', function(cb) {
  del([
    dest_root,
    config.tmp_js,
    config.tmp_css
  ], {force: true}, cb)
})


// -----------------------
// SASS --> CSS

gulp.task('sass-dev', function() {
  gulp.src( config.sass_src )
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: true
      }))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 9", { cascade: false }))
    .pipe(gulp.dest( config.tmp_css ))
})
gulp.task('sass-ship', function() {
  gulp.src( config.sass_src )
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 9", { cascade: false }))
    .pipe(csso())
    .pipe(size({
      showFiles: true,
      title: "Size css-min:"
    }))
    .pipe(gulp.dest( config.dest_css ))
})


// -----------------------
// Copy
// (eg: .html, .template, .md, .txt, etc)

gulp.task('copy-ship', function() {
  return gulp.src(config.copy_src)
    .pipe(gulp.dest( dest_root ))
})
gulp.task('clean-ship', function(cb) {
  del([
    "./../**/*.{html,md,txt,yaml,json,toml}",
  ], {force: true}, cb)
})


// -----------------------
// Js --> single bundle

var bundler = watchify(browserify(config.js_src_entry, {
  cache: {},
  packageCache: {},
  fullPaths: true,
  debug: true
}))

// wait for JsHint, then Browserify
gulp.task('browserify', ['jshint'], bundle)

bundler.on('update', bundle)

function bundle() {
  return bundler.bundle() 
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source( 'bundle.js' ))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest( config.tmp_js ))
}

gulp.task('js_ship', ['browserify'], function() {
  return gulp.src( config.tmp_js + "/**/*.js")
    .pipe(uglify())
    .pipe(size({
      showFiles: true,
      title: "Size js-min:",
    }))
    .pipe(gulp.dest( config.dest_js ))
})

gulp.task('jshint', function() {
  return gulp.src( config.js_src )
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
})