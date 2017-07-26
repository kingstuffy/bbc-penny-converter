module.exports = function (grunt) {

    //project configurations
    grunt.initConfig({
        cssmin: {
            target: {
                src: ['css/app.css'],
                dest: 'dist/app.min.css'
            }
        },
        uglify : {
            options : {
                banner : '/*! app.min.js file */\n'
            },
            build : {
                src : ['js/app.js', 'js/jquery.min.js'],
                dest : 'dist/app.min.js'
            }

        }

    });

    //load cssmin plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //load uglify plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //create default task
    grunt.registerTask('default', ['cssmin', 'uglify']);

};