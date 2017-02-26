var FS = require('fs-extra');
var Path = require('path');
var Promise = require("thenfail").Promise
var dtsGenerator = require('x-dts-generator').default;
var tsc = require('./tsc');
var Constants = require('./constants');

console.log("build starting...")

FS.emptyDir(Constants.OUTPUT_DIR); 

tsc(Constants.SOURCE_DIR, {
    outDir: Constants.OUTPUT_DIR,
    declaration: true,
    declarationDir: `${Constants.OUTPUT_DIR}/typings`
})
    .then(() => {
        process.exit(0);
    })
    .fail(reason => {
        var message = reason && (reason.stack || reason.message) || reason || 'unknown error';
        console.error((`✘ got error:\n${message}`));
        process.exit(-1);
    });
