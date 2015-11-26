module.exports = {
  sources: {
    jade: 'src/jade/**/*.jade',
    jadeCompile: 'src/jade/*.jade',
    stylus: 'src/stylus/**/*.stylus',
    img: 'src/img/**/*.{jpg,png}',
    js: 'src/javascript/**/*.js',
    assets: 'src/assets/**/*.*',
    overwatch: 'out/**/*.*',
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
    out: 'out/',
    css: 'out/css/',
    js: 'out/js/',
    img: 'out/img/',
    fonts: 'out/fonts/',
    assets: 'out/',
    overwatch: 'out/**/*.*'
  }
};
