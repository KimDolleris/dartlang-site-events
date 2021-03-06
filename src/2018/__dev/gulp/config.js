'use strict';

var notifier = require('node-notifier');
var argv = require('yargs').argv;
var path = require('path');

module.exports = (function () {
    var projectPath = "./"; // path for the source files
    var webPath = projectPath + ""; // path for the website - usually path to livereload views, and used for distPath
    var vendorPath = projectPath + "node_modules/"; // path for vendor scripts
    var distPath = webPath + "../dist/"; // path for production files
    var cleanPaths = [distPath]; // files/folders to be removed with "clean"-task

    return {
        // ------------- Bundles -------------
        bundles: [
            {
                name: 'vendor',
                ignorePlugins: ['jscs', 'jshint', 'watch'], // add 'minify', to ignore minifaction on a bundle
                scripts: [
                    // vendorPath + "svg4everybody/dist/svg4everybody.js",
                    // vendorPath + "jquery/dist/jquery.js"
                ]
            },
            {
                name: 'master',
                scripts: [
                    projectPath + "scripts/libs/jquery-3.2.1.min.js",
                    projectPath + "scripts/libs/svg4everybody.min.js",
                    projectPath + "scripts/libs/fastclick.js",
                    projectPath + "scripts/libs/jquery.scrollLock.min.js",
                    projectPath + "scripts/libs/owl.carousel.js",
                    // projectPath + "scripts/components/novicell.debounce.js",
                    projectPath + "scripts/components/novicell.visible.js",
                    // projectPath + "scripts/components/novicell.embed.js",
                    projectPath + "scripts/components/novicell.overlay.js",
                    projectPath + "scripts/components/component.speakers.js",
                    projectPath + "scripts/components/component.site-head.js",
                    projectPath + "scripts/components/component.show-additional-speakers.js",
                    projectPath + "scripts/components/component.speaker-details.js",
                    projectPath + "scripts/components/component.live-stream.js",
                    projectPath + "scripts/components/component.show-gallery.js",
                    projectPath + "scripts/components/component.schedule.js",
                    projectPath + "scripts/components/component.show-gallery.js",
                    projectPath + "scripts/components/dartconf.animations.js",
                    projectPath + "scripts/master.js"
                ],
                styles: [ projectPath + "less/master.less" ],
                images: [ projectPath + "images/**/*.{jpg,png,svg,gif}"],
                html: [ projectPath + "html/*.html" ]
            },
            {
                name: "icons",
                icons: [ projectPath + "icons/**/*.svg" ]
            }
        ],


        // ------------- Styles -------------
        stylesDist: distPath + "css",

        // ------------- Scripts -------------
        scriptsDist: distPath + "scripts",

        // ------------- Icons ---------------
        iconsDist: distPath + "icons/",

        // ------------- Fonts -------------
        fontsDist: distPath + "fonts",

        // ------------- Images -------------
        imagesDist: distPath + "images",
        imagesOptimizationLevel: 5,
        imagesProgressive: true,
        imagesInterlaced: true,

        // -------------- HTML --------------
        htmlFileIncludeConfig: {
            prefix: '@@',
            basepath: '@file'
        },

        // ------------- Livereload ---------
        livereloadPort: 35729,
        livereloadPaths: [
            distPath + "**/*.*",
            webPath + "Views/**/*.cshtml",
            webPath + "html/**/*.html",
            webPath + "**/*.php"
        ],

        // ------------- Watch -------------
        watchImages: [ projectPath + 'images/**/*' ],
        watchIcons: [ projectPath + 'icons/*' ],
        watchFonts: [ projectPath + 'fonts/*' ],
        watchHtml: [ projectPath + 'html/**/*' ],
        watchScripts: [
            projectPath + 'scripts/**/*.js'
        ],
        watchStyles: [
            projectPath + 'less/**/*.less'
        ],

        // ------------- Deploy task --------
        deployHost: "",
        deployUser: "",
        deployPass: "",
        deployDest: "/public_html/",
        deployGlobs: [ distPath + '**' ],

        // ------------- Copy on build --------
        buildCopy: [{
            from: projectPath + "fonts/**/*",
            to: distPath  + "fonts"
        }],


        // ------------- Tasks -------------
        loadTasks: [
            "styles", "scripts", "images", "icons", "copy", "watch", "build", "html", "deploy"
        ],
        buildTasks: [
            "styles", "scripts", "images", "icons", "copy"
        ],

        // ------------- Return Paths -------------
        projectPath: projectPath,
        vendorPath: vendorPath,
        cleanPaths: cleanPaths,
        distPath: distPath,

        // ---------- Errorhandler ------
        errorHandler: function(taskName)
        {
            return function (e) {
                notifier.notify({
                    'title': taskName,
                    'message': 'An error occured in the ' + e.plugin + ' plugin.'
                });
                console.log(e.message);
                this.emit('end');
            };
        }
    }
})();
