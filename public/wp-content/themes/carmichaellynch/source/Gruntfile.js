module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                browser: true,
                laxcomma: true,
                shadow:true,
                globals: {
                    jQuery: true
                }
            },
            all: {
                files: {
                    src: ['js/**/*.js']
                }
            }
        },

        concat: {
            options: {},
            dist: {
                src: [
                    //load libraries
                    'bower_components/jquery/dist/jquery.min.js',
                    'static_dependencies/jquery.ajax-progress.js',
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/html5shiv/dist/html5shiv.min.js',
                    'bower_components/packery/dist/packery.pkgd.min.js',
                    'bower_components/gsap/src/minified/TweenMax.min.js',
                    'bower_components/gsap/src/minified/plugins/ScrollToPlugin.min.js',
                    'bower_components/swiper/dist/idangerous.swiper.min.js',
                    'bower_components/video.js/dist/video-js/video.dev.js',
                    'bower_components/hammerjs/hammer.min.js',
                    'bower_components/page/page.js',
                    'bower_components/URIjs/src/URI.min.js',
                    'static_dependencies/vimeo/froogaloop2.min.js',
                    'static_dependencies/ios-orientationchange-fix.js',
                    //'bower_components/froogaloop/froogaloop.js'

                ],
                dest: '../vendor.js'
            }
        },

        browserify: {
            dev: {
                files: {
                    "../app.js": ["js/index.js"]
                },
                browserifyOptions: {
                    debug: true
                }
            },
            dist: {
                files: {
                    "../app.js": ["js/index.js"]
                },
                browserifyOptions: {
                    debug: false
                }
            }

        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    beautify: true
                },
                files: {
                    '../app.min.js': [
                        '../app.js'
                    ]
                }
            }
        },

        copy: {
            staticAssets : {
                files: [
                    {
                        expand: true,
                        cwd: '../',
                        src: ['images/**/*.*' , 'fonts/**/*.*', 'videos/**/*.*'],
                        dest: '.static'
                    },
                    {
                        expand: true,
                        cwd: '../',
                        src: ['style.css'],
                        dest: '.static',
                        filter:'isFile',
                        ext:'.css'
                    },
                    {
                        expand: true,
                        cwd: '../',
                        src: ['style.css.map'],
                        dest: '.static',
                        filter:'isFile',
                        ext:'.css.map'
                    },
                    {
                        expand: true,
                        cwd: '../',
                        src: ['app.js','vendor.js'],
                        dest: '.static',
                        filter:'isFile' ,
                        ext: '.js'
                    }

                ]
            },
            cssAsScss: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: ['**/*.css', '!**/*.min.css'],
                        dest: 'bower_components',
                        filter: 'isFile',
                        ext: ".scss"
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap',
                        src: ['**/*.(eot|svg|ttf|woff|woff2)'],
                        dest: '../fonts/bootstrap'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/fonts',
                        src: ['**/*.(eot|svg|ttf|woff|woff2)'],
                        dest: '../fonts/font-awesome'
                    }
                ]
            }
        },

        phpcs: {
            application: {
                dir: ['../*.php']
            },
            options: {
                bin: '../../../../../vendor/bin/phpcs',
                standard: 'ruleset.xml'
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    cwd: ".jade/",
                    src: ["**/*.jade",  "!_*.jade"],
                    dest : ".static/",
                    expand:true,
                    ext:".html"

                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: ['.static']

                }
            }
        },

        watch: {

            scripts: {
                files: [ 'js/*.js', 'js/**/*.js'],
                tasks: ['jshint','browserify:dev']
            },
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['compass']
            },
            grunt : {
                files: ['Gruntfile.js'],
                tasks : ['dev']
            }
        },
        watchStatic: {
            statics : {
                files: [ 'images*//***/*//*.*' , 'videos*//***/*//*.*',  '../style.css' , '../app.js'],
                tasks: ['copy:staticAssets']
            },
            jade :{
                files : ['.jade/**/*.jade'],
                tasks : ['jade']
            }

        }


    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-phpcs');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('dev', ['copy:cssAsScss' , 'copy:fonts', 'jshint', 'browserify:dev', 'concat', 'compass']);
    grunt.registerTask('server' , [ 'copy:staticAssets', 'connect' ]);
    grunt.registerTask('build', ['dev','uglify']);
    grunt.registerTask('default', ['dev', 'watch']);

};