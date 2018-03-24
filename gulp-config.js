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
      deploy: env + '**/*.{min.js,min.css,html,png,xml,ico,txt,jpg,otf,woff,woff2,ttf,svg,eot}',
      assets: 'src/assets/**/*.*',
      vendor: {
        scripts: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/shooting-stars/dist/shooting-stars.js'
        ],
        styles: [
          'node_modules/normalize.css/normalize.css',
          'node_modules/bootstrap/dist/css/bootstrap.css',
          'node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css',
          'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
          'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-brands.css'
        ],
        fonts: [
          'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/**/*.*'
        ]
      }
    },
    destinations: {
      dist: './dist',
      js: env + 'js/',
      html: env,
      css: env + 'css/',
      img: env + 'img/',
      fonts: env + 'webfonts/',
      assets: env,
      overwatch: env + '**/*.*'
    }
  }
};
