var FS = require('fs-extra');
var Path = require('path');
var Promise = require("thenfail").Promise
var dtsGenerator = require('x-dts-generator').default;
var tsc = require('./tsc');
var Constants = require('./constants');

console.log("build starting...")

FS.emptyDir(Constants.OUTPUT_DIR); 

tsc(Constants.SOURCE_DIR, {
    outDir: Constants.OUTPUT_DIR
})
    .then(() => {
        return new Promise((resolve, reject) => {
            console.log('generator mao-rn-android-kit.d.ts');
            dtsGenerator({
                name: 'mao-rn-android-kit',
                baseDir: Constants.SOURCE_DIR,

                main: 'mao-rn-android-kit/index',
                externs: [
                    '../typings/interfaces.d.ts', 
                    '../typings/index.d.ts', 
                ],
                out: Path.join(Constants.OUTPUT_DIR, 'mao-rn-android-kit.d.ts') 
            })
                .then(resolve)
        });
    })
    .then(() => {
        process.exit(0);
    })
    .fail(reason => {
        var message = reason && (reason.stack || reason.message) || reason || 'unknown error';
        console.error((`✘ got error:\n${message}`));
        process.exit(-1);
    });
