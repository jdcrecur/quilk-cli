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
        app: PATHS.app+'/server.js'
    },
    target: 'node',
    output: {
        path: PATHS.app,
        filename: '../build/server.js'
    },
    externals: nodeModules,
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
            path.resolve(__dirname + "/src"),
            path.resolve('./config')
        ]
    },
    node: {
        fs: "empty"
    }
};