// // `CheckerPlugin` is optional. Use it if you want async error reporting.
// // We need this plugin to detect a `--watch` mode. It may be removed later
// // after https://github.com/webpack/webpack/issues/3460 will be resolved.

// const path = require('path');
// function srcPath(subdir) {
//     return path.join(__dirname, "src", subdir);
// }

// module.exports = {
// };


import path from "path";
import { Configuration } from "webpack";

function sourcePath(): string {
    return path.join(__dirname, "src");
};

const config: Configuration = {
    target: 'node8.9',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
        path: path.resolve('dist'), //`path.resolve(__dirname, 'webpack')`,
    },
    optimization: {
        minimize: false,
    },
    resolve: {
        alias: {
            "~": sourcePath(), // was originally @, not sure why, should be checked
            // actions: srcPath('app/actions'),
            // selectors: srcPath('app/selectors'),
            // ui: srcPath('app/ui'),
            // logger: srcPath('util/logger'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        // ...
    },
};


export default config;