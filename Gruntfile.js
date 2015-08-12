'use strict';

module.exports = function (grunt) {
    require('jit-grunt')(grunt, {
        watch: 'grunt-contrib-watch',
        injector: 'grunt-injector',
        express: 'grunt-express-server',
        wiredep: 'grunt-wiredep',
        open: 'grunt-open'
    });

    grunt.initConfig({
        appconf: {
            // configurable paths
            client: require('./bower.json').appPath || 'client',
            dist: 'dist'
        },
        watch: {
            injectJS: {
                files: [
                    '<%= appconf.client %>/{app,components}/**/*.js',
                    '!<%= appconf.client %>/{app,components}/**/*.spec.js',
                    '!<%= appconf.client %>/{app,components}/**/*.mock.js',
                    '!<%= appconf.client %>/app/app.js'],
                tasks: ['injector:scripts']
            },
            injectCss: {
                files: [
                    '<%= appconf.client %>/{app,components}/**/*.css'
                ],
                tasks: ['injector:css']
            },
            livereload: {
                files: [
                    '{.tmp,<%= appconf.client %>}/{app,components}/**/*.css',
                    '{.tmp,<%= appconf.client %>}/{app,components}/**/*.html',
                    '{.tmp,<%= appconf.client %>}/{app,components}/**/*.js',
                    '!{.tmp,<%= appconf.client %>}{app,components}/**/*.spec.js',
                    '!{.tmp,<%= appconf.client %>}/{app,components}/**/*.mock.js',
                    '<%= appconf.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            }
        },
        injector: {
            options: {},
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= appconf.client %>/index.html': [
                        [

                            '{.tmp,<%= appconf.client %>}/{app,components}/**/*.js',

                            '!{.tmp,<%= appconf.client %>}/app/app.js',
                            '!{.tmp,<%= appconf.client %>}/{app,components}/**/*.spec.js',
                            '!{.tmp,<%= appconf.client %>}/{app,components}/**/*.mock.js'
                        ]
                    ]
                }
            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= appconf.client %>/index.html': [
                        '<%= appconf.client %>/{app,components}/**/*.css'
                    ]
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            target: {
                src: '<%= appconf.client %>/index.html',
                ignorePath: '<%= appconf.client %>/',
                exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/']
            }
        },
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'server/app.js',
                    debug: true
                }
            }
        }
    });

    grunt.registerTask('default', ['injector', 'express:dev','open', 'watch' ]);
};