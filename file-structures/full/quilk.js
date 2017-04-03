module.exports = {
    modules : [
        {
            name: 'Vendor Files babelify',
            module: 'babelify_vendor',
            working_directory: '/src/browser_app',
            npm_modules: "package.json",
            configure: {
                babelrc: '.babelrc'
            },
            target: '/public/build/js/vendor.js'
        },
        {
            name: 'App JS Files babelify',
            working_directory: '/src/browser_app',
            module: 'babelify_app',
            entries: "/js/app.js",
            npm_modules: "package.json",
            configure: {
                babelrc: '.babelrc'
            },
            target: '/public/build/js/app.js'
        },
        {
            name: "App CSS (SASS find)",
            module: "sass_find",
            outputStyle: "expanded",
            sourceComments: true,
            include_first: [
                "/src/browser_app/sass/core/_core_loader.scss"
            ],
            ignorePaths : [
                "/src/browser_app/sass/core/"
            ],
            find_in_path: "/src/browser_app/sass/",
            target: "/public/build/css/app.css"
        }
    ],

    dont_watch: [
        "/public/build/"
    ],

    release_commands_or_modules: {
        prod:{
            post: [     {
                name: "minify the app js",
                module: "node_minify",
                type:"uglifyjs",
                input:  "/public/build/js/vendor.js",
                target: "/public/build/js/vendor.js"
            }, {
                name: "minify the app js",
                module: "node_minify",
                type:"uglifyjs",
                input:  "/public/build/js/app.js",
                target: "/public/build/js/app.js"
            }, {
                name: "minify the css",
                module: "node_minify",
                type:"sqwish",
                input:[ "/public/build/css/app.css" ],
                target: "/public/build/css/app.css"
            }]
        }
    },

    developers : {
        default : {
            platform : "linux",
            notifier : {
                "on_for_level" : 9,
                "style": "NotifySend",
                "time" : 5000
            }
        }
    }
};