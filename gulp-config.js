var env   = 'public/',
  siteCfg = require('./site_config'),
  pkg     = require('./package.json');
module.exports = {
  pkg: {
    name: pkg.name
  },
  pluginOpts: {
    coffee: {
      bare: true
    },
    rename: {
      suffix: '.min'
    },
    jade: {
      pretty: true,
      data: {
        projects: siteCfg.projects,
        skills  : siteCfg.skills
      }
    },
    gSize: {
      showFiles: true
    },
    browserSync: {
      port   : 1987,
      server : {
        baseDir: env
      }
    },
    prefix: [
      'last 3 versions',
      'Blackberry 10',
      'Android 3',
      'Android 4'
    ],
    load: {
      rename: {
        'gulp-gh-pages'    : 'deploy',
        'gulp-util'        : 'gUtil',
        'gulp-minify-css'  : 'minify',
        'gulp-autoprefixer': 'prefix'
      }
    }
  },
  paths: {
    base: env,
    sources: {
      js: 'src/js/**/*.js',
      docs: 'src/jade/*.jade',
      jade: 'src/jade/**/*.jade',
      stylus: 'src/stylus/**/*.stylus',
      img: 'src/img/**/*.{jpg,png}',
      overwatch: env + '**/*.{html,js,css}',
      assets: 'src/assets/**/*.*',
      vendor: {
        scripts: [
          'src/vendor/jquery/dist/jquery.js',
          'src/vendor/shooting-stars/dist/shooting-stars.js'
        ],
        styles: [
          'src/vendor/normalize.css/normalize.css',
          'src/vendor/bootstrap/dist/css/bootstrap.css',
          'src/vendor/fontawesome/css/font-awesome.css'
        ],
        fonts: [
          'src/vendor/fontawesome/fonts/**/*.*'
        ]
      }
    },
    destinations: {
      dist: './dist',
      js: env + 'js/',
      html: env,
      css: env + 'css/',
      img: env + 'img/',
      fonts: env + 'fonts/',
      assets: env,
      overwatch: env + '**/*.*'
    }
  }
};
