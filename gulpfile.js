'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const es2015 = require('babel-preset-es2015')
const stage2 = require('babel-preset-stage-2')
const watchdir = require("gulp-watch-dir")
const browserSync = require('browser-sync').create()
const rename = require('gulp-rename')
const svgSprite = require("gulp-svg-sprites");
gulp.task('es6', () => {
 return gulp.src('./dev/js/**/*.js')
   .pipe(sourcemaps.init()) 
   .pipe(babel({
     presets: ['es2015','stage-2']
   }))
   .pipe(sourcemaps.write('./maps'))
   .pipe(gulp.dest('./dist/assets/js'))
})

gulp.task('pug', () => {
 return gulp.src('./dev/views/*.pug')
   .pipe(sourcemaps.init())
   .pipe(pug({
     pretty: true
   }))
   .pipe(sourcemaps.write('./maps'))
   .pipe(gulp.dest('./dist'))
})


gulp.task('sprites', function () {
  return gulp.src('./dev/assets/svg/*.svg')
      .pipe(svgSprite({
        svg: {
            sprite: "svg.svg"
        },
        preview: false
      }))
      .pipe(gulp.dest("./dist/assets/svg"));
});

gulp.task('sass', () => {
 return gulp.src('./dev/sass/style.scss')
   .pipe(sourcemaps.init())
   .pipe(sass({
               outputStyle: 'expanded'//compressed
              }).on('error', sass.logError))
   .pipe(autoprefixer({
     browsers: ['last 2 versions'],
     cascade: false
   }))
  
   .pipe(rename('style.min.css'))
   .pipe(sourcemaps.write('./maps'))
   .pipe(gulp.dest('./dist/assets/css'))
})
 gulp.task('sassotx', () => {
  return gulp.src('./dev/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
                outputStyle: 'expanded'
              }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/assets/css'))
 })
gulp.task('serve', ['sass', 'es6', 'pug', 'sprites'], function() {
  browserSync.init({
      server: "./dist"
  })
  gulp.watch("./dev/sass/**/*.scss", ['sass'])
  gulp.watch("./dev/assets/svg/**/*.svg", ['sprites'])

  gulp.watch('./dev/js/**/*.js', ['es6'])
  gulp.watch('./dev/views/**/*.pug', ['pug'])
  
  gulp.watch('./dist/**/*.*').on('change', browserSync.reload)
})
gulp.task('default', ['serve'])
