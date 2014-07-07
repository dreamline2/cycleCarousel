module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    sassDir: 'static/sass',
                    cssDir: 'static/css',
                    banner: '/* Copyright © 2014 wilson Distributed under terms of the MIT license. */',
                    specify: ['static/sass/*.scss'],
                    environment: 'development',
                    // outputStyle: 'compressed'
                    noLineComments: true
                }
            }
        },

        watch: {
            css: {
                files: 'static/sass/*.scss',
                tasks: ['compass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['watch']);

};
