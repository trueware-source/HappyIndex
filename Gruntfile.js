module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        jshint: {
            files: [
                './**/HappyIndex/**/*.js'
            ],
            options: {
                asi: false,
                bitwise: true,
                boss: false,
                browser: true,
                camelcase: true,
                couch: true,
                curly: true,
                debug: false,
                devel: true,
                eqeqeq: true,
                eqnull: true,
                es5: false,
                evil: true,
                expr: false,
                forin: false,
                globalstrict: true,
                immed: true,
                indent: true,
                jquery: true,
                latedef: true,
                laxbreak: false,
                loopfunc: false,
                mootools: true,
                newcap: true,
                noarg: true,
                node: true,
                noempty: false,
                nonew: true,
                nomen: false,
                onevar: false,
                passfail: false,
                plusplus: true,
                prototypejs: true,
                regexdash: true,
                regexp: true,
                rhino: false,
                undef: true,
                //  safe"         : false,
                shadow: true,
                strict: false,
                sub: true,
                supernew: false,
                trailing: true,
                white: false,
                wsh: false,
                predef: [
                    "jasmine",
                    "describe",
                    "xdescribe",
                    "it",
                    "xit",
                    "beforeEach",
                    "afterEach",
                    "expect",
                    "spyOn",
                    "runs",
                    "waits",
                    "waitsFor",
                    "angular",
                    "google"
                ],
                ignores: [
                    './**/Vendor/**/*'
                ]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'karma']);
};

