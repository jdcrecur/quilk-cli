'use strict';
let webpack     = require('webpack'),
    jsonLoader  = require("json-loader"),
    path        = require("path"),
    fs          = require('fs'),
    nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


let PATHS = {
    app: __dirname + '/src'
};

module.exports = {
    context: PATHS.app,
    entry: {
        app: PATHS.app+'/node_app/server.js'
    },
    target: 'node',
    output: {
        path: PATHS.app,
        filename: '../build/server.js'
    },
    externals: nodeModules,
    module: {
        loaders: [
            { test: /moment\.js$/, loader: 'expose?moment' },
            { test: /\.json$/, loader: 'json-loader'},
            { test: /\.yaml$/, loader: 'yaml-loader'},
            { test: /\.(jpeg|jpg|png|svg|gif)(\?.*$|$)/, loader: 'url-loader?importLoaders=1&limit=100000'},
            { test: /\.html$/, loader: 'html'}
        ],
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    },
    performance: {
        hints: "warning"
    },
    plugins: [
        jsonLoader
    ],
    resolve: {
        modules: [
            './node_modules',
            path.resolve(__dirname),
            path.resolve(__dirname + "/src/node_app"),
            path.resolve('./config')
        ]
    },
    node: {
        fs: "empty"
    }
};