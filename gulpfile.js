var gulp       = require('gulp'),
  gConfig      = require('./gulp-config'),
  browserSync  = require('browser-sync'),
  pluginOpts   = gConfig.pluginOpts,
  parsedArgs   = require('minimist')(process.argv.slice(2))
  plugins      = require('gulp-load-plugins')(pluginOpts.load),
  isDist       = parsedArgs.dist,
  isDev        = parsedArgs.dev,
  isDeploy     = parsedArgs.deploy,
  isMapped     = parsedArgs.map,
  isStat       = parsedArgs.stat,
  sources      = gConfig.paths.sources,
  destinations = gConfig.paths.destinations;

gulp.task('serve', ['complete:build'], function(event) {
  browserSync(pluginOpts.browserSync);
  return gulp.watch(sources.overwatch).on('change', browserSync.reload);
});

gulp.task('stylus:compile', function(event) {
  return gulp.src(sources.stylus)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(gConfig.pkg.name + '.stylus'))
    .pipe(plugins.stylus())
    .pipe(plugins.prefix(pluginOpts.prefix))
    .pipe(gulp.dest(destinations.css))
    .pipe(plugins.minify())
    .pipe(plugins.rename(pluginOpts.rename))
    .pipe(gulp.dest(destinations.css));
});
gulp.task('stylus:watch', function(event) {
  gulp.watch(sources.stylus, ['stylus:compile']);
});


gulp.task('js:publish', function(event) {
  return gulp.src(sources.js)
    .pipe(plugins.concat(gConfig.pkg.name + '.js'))
    .pipe(gulp.dest(destinations.js))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(pluginOpts.rename))
    .pipe(gulp.dest(destinations.js));
});
gulp.task('js:watch', function(event) {
  gulp.watch(sources.js, ['js:publish']);
});

gulp.task('jade:compile', function(event) {
  return gulp.src(sources.docs)
    .pipe(plugins.plumber())
    .pipe(plugins.jade(pluginOpts.jade))
    .pipe(gulp.dest(destinations.html));
});
gulp.task('jade:watch', function(event) {
  gulp.watch(sources.jade, ['jade:compile']);
});

gulp.task('assets:images', function(event) {
  return gulp.src(sources.img)
    .pipe(gulp.dest(destinations.img));
});
gulp.task('assets:general', function(event) {
  return gulp.src(sources.assets)
    .pipe(gulp.dest(destinations.assets));
});
gulp.task('assets:publish', ['assets:images', 'assets:general']);


gulp.task('vendor:scripts', function(event) {
  return gulp.src(sources.vendor.scripts)
    .pipe(plugins.concat('vendor.js'))
    .pipe(gulp.dest(destinations.js))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(pluginOpts.rename))
    .pipe(gulp.dest(destinations.js));
});
gulp.task('vendor:styles', function(event) {
  return gulp.src(sources.vendor.styles)
    .pipe(plugins.concat('vendor.css'))
    .pipe(gulp.dest(destinations.css))
    .pipe(plugins.minify())
    .pipe(plugins.rename(pluginOpts.rename))
    .pipe(gulp.dest(destinations.css));
});
gulp.task('vendor:fonts', function(event) {
  return gulp.src(sources.vendor.fonts)
    .pipe(gulp.dest(destinations.fonts));
});
gulp.task('vendor:publish', ['vendor:scripts', 'vendor:styles', 'vendor:fonts']);

gulp.task('deploy', ['complete:build'], function () {
  return gulp.src(destinations.overwatch)
    .pipe(plugins.deploy({
      remoteUrl: 'https://github.com/jh3y/jh3y.github.io.git',
      branch: 'master'
    }));
});

gulp.task('deploy:package', ['complete:build'], function() {
  return gulp.src(sources.deploy)
    .pipe(gulp.dest('./.deploy'))
})

gulp.task('deploy:prerelease', ['complete:build'], function () {
  return gulp.src(destinations.overwatch)
    .pipe(plugins.deploy());
});

gulp.task('complete:build', [
  'jade:compile',
  'assets:publish',
  'vendor:publish',
  'stylus:compile',
  'js:publish'
]);

gulp.task('default', [
  'complete:build',
  'serve',
  'jade:watch',
  'stylus:watch',
  'js:watch'
]);
