module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
 // Compass settings
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass',
          cssDir: 'css',
	        fontsDir: 'fonts',
	        javascriptDir: 'js',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },
    watch: {
      options: {
        livereload: true, // or set livereload: 1337  - recommended 35729
        spawn: false
      },
      html: {
        files: ['./**/*.{phtml,xml,html}','./**/*.css','!node_modules/**/*.*'],
      },
      sass: {
        files: ['sass/*.{scss,sass}'],
        tasks: ['compass:dist'],
      },

    },
// image minification settings
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
	      },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'hello',
          src: '*.{png,jpg}',
          dest: 'images'//'<%= cwd %>'
        }]
          // {src: 'hello/*.png'}
          // 'dest/fe/': ['hello/*.{png,jpg,jpeg}'],
          // dest: ['*.min.{png,jpg,jpeg}']
          // 'dest/img.png':['src/img.png'],
          // 'dest/img.jpg':['src/img.jpg'],       
      },
      dev: {
        options: {
	        optimizationLevel: 0
	      },
        files: {
          'dev/img.png': 'src/img.png',
          'dev/img.jpg': 'src/img.jpg'
        }
      }
    },
    rsync: {
      dist: {
          src: "./",
          dest: "public_html",
          host: "kiwikrea@kamilkielan.com",
          port: "3784",
          recursive: true,
          exclude: [".git*","*.scss"]
	       // syncDest: true
      },
      "staging": {
          src: "./",
	        dest: "public_html",
          host: "kiwikrea@kamilkielan.com",
          port: "3784", // Use the rsyncwrapper port option to set a non-standard ssh port if required.
          recursive: true,
          syncDest: false
      },
      "deploy-live": {
          src: "../dist/",
          dest: "/var/www/site/blog",
          host: "kiwikrea@kamilkielan.com",
          port: "3784",
          recursive: true,
          syncDest: true
      }
  }
  });

  grunt.file.setBase('./');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-rsync');


  grunt.registerTask('deploy', ['rsync:dist']);
//  grunt.registerTask('images', ['imagemin:dist']);
  grunt.registerTask('default', ['compass:dist','watch']);
};
