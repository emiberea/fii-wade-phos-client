"use strict";

var gulp     = require("gulp"),
    gutil    = require("gulp-util"),
    path     = require("path"),
    rimraf   = require("gulp-rimraf"),
    concat   = require("gulp-concat"),
    uglify   = require("gulp-uglify"),
    minifyCSS = require("gulp-minify-css"),
    prefix   = require("gulp-autoprefixer"),
    changed  = require("gulp-changed"),
    es         = require("event-stream"),
	plumber = require("gulp-plumber"),
	ngAnnotate = require("gulp-ng-annotate"),
    runSequence = require("run-sequence")
    ;

var NODE_ENV = "development";

var build = './build';
/*
 |----------------------------------------------------------------------------------------------------------------------
 | Clean
 |----------------------------------------------------------------------------------------------------------------------
 |
 */
gulp.task('clean-prod', function () {
  return gulp.src(build, {read: false})
    .pipe(rimraf({ force: true }));
});


/*
|--------------------------------------------------------------------------
| MIN CSS
|--------------------------------------------------------------------------
|
*/
 gulp.task('mincss', function () {

   
  // MAIN
   var mainStyles = [
     './resources/bootstrap/css/bootstrap.min.css',
     './resources/css/style.css'
   ];
   gulp.src(mainStyles)
   .pipe(plumber())
   .pipe(concat('/resources/css/style.min.css'))
   .pipe(minifyCSS())
   .pipe(plumber.stop())
   .pipe(gulp.dest(build))
   .on('error', gutil.log);



});



/*
|--------------------------------------------------------------------------
| VENDOR scripts
|--------------------------------------------------------------------------
|
*/
 gulp.task('vendors-prod', function () {


   // MAIN
   var mainVendors = [
     './scripts/angular.js',
     './scripts/angular-route.js',
     './scripts/angular-ui-router.min.js',
	 './controllers/*.js',
	 './services/dalService.js',
	 './resources/bootstrap/js/bootstrap.js',
	 './scripts/ui-bootstrap-tpls-0.11.2.min.js'
   ];
   gulp.src(mainVendors)
     .pipe(concat('js/main.min.js'))
	 .pipe(ngAnnotate())
	 .pipe(uglify())
     .pipe(gulp.dest(build));


 });

 /*
|--------------------------------------------------------------------------
| Custom Scripts
|--------------------------------------------------------------------------
|
*/
// gulp.task('scripts-prod', function () {


//   // MAIN
//   var mainScripts = [
//     './public/app/main/*.js'
//   ];
//   gulp.src(mainScripts)
//     .pipe(concat('main.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('./public/prod/js'));


//   // PROFILE
//   var profileScripts = [
//     './public/app/profile/App.js',
//     './public/app/profile/Config.js',
//     './public/app/profile/AppCtrl.js',
//     './public/app/profile/resources/*.js',
//     './public/app/profile/directives/*.js',
//     './public/app/profile/modules/**/*.js'
//   ];
//   gulp.src(profileScripts)
//     .pipe(concat('profile.min.js'))
//     .pipe(ngAnnotate())
//     .pipe(uglify())
//     .pipe(gulp.dest('./public/prod/js'));




// });




/*
|--------------------------------------------------------------------------
| ASSETS: fonts, images
|--------------------------------------------------------------------------
|
*/
 gulp.task('views-prod', function () {

   var fonts = gulp.src([
     './views/**/*'
   ])
   .pipe(gulp.dest(build+ '/views'));

   var slick = gulp.src([
     './resources/img/*',
   ])
   .pipe(gulp.dest(build + '/resources/img'));
   
   
   var kendo = gulp.src([
    './index_prod.html'
   ])
   .pipe(concat('index.html'))
   .pipe(gulp.dest(build));
   
   var kendoTheme = gulp.src([
     './resources/bootstrap/fonts/*'
   ])
   .pipe(gulp.dest(build+'/resources/fonts'));
  // return es.concat(fonts, slick, kendo, kendoTheme);

 });



/*
 |----------------------------------------------------------------------------------------------------------------------
 | Default
 |----------------------------------------------------------------------------------------------------------------------
 |
 */
gulp.task('default', ['clean-prod'], function () {
  gulp.start('mincss', 'vendors-prod', 'views-prod');//, 'scripts-prod');
});
