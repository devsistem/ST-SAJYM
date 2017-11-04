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
gulp.task('es6', () => {
 return gulp.src('./dev/js/**/*.js')
   .pipe(sourcemaps.init()) 
   .pipe(babel({
     presets: ['es2015','stage-2']
   }))
   .pipe(sourcemaps.write('./maps'))
   .pipe(gulp.dest('./dist/js'))
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
gulp.task('sass', () => {
 return gulp.src('./dev/sass/**/*.scss')
   .pipe(sourcemaps.init())
   .pipe(sass().on('error', sass.logError))
   .pipe(autoprefixer({
     browsers: ['last 2 versions'],
     cascade: false
   }))
   .pipe(sourcemaps.write('./maps'))
   .pipe(gulp.dest('./dist/css'))
})
gulp.task('serve', ['sass', 'es6', 'pug'], function() {
 browserSync.init({
     server: "./dist"
 })
 gulp.watch("./dev/sass/**/*.scss", ['sass'])
 gulp.watch('./dev/js/**/*.js', ['es6'])
 gulp.watch('./dev/views/*.pug', ['pug'])
 
 gulp.watch('./dist/**/*.*').on('change', browserSync.reload)
})
gulp.task('default', ['serve'])
