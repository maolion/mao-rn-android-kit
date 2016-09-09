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
            console.log('generator mao-rn-android-kit typings file');
            dtsGenerator({
                name: 'mao-rn-android-kit',
                baseDir: Constants.CWD,
                files: [
                    Path.join(Constants.SOURCE_DIR, 'index.ts'),
                    Path.join(Constants.CWD, 'typings/index.d.ts'),
                    Path.join(Constants.CWD, 'typings/interfaces.d.ts')
                ],
                main: 'mao-rn-android-kit/src/index',
                exclude: [
                    'node_modules/**/*.d.ts',
                    'typings/globals/**/*.d.ts',
                    'typings/index.d.ts'
                ],
                out: Path.join(Constants.OUTPUT_DIR, 'index.d.ts') 
            })
                .then(resolve)
        });
    })
    .then(() => {
        var content = FS.readFileSync(Path.join(Constants.OUTPUT_DIR, 'index.d.ts'), 'utf8');
        content = content.replace(/mao-rn-android-kit\/src/g, 'mao-rn-android-kit');
        FS.writeFileSync(Path.join(Constants.OUTPUT_DIR, 'index.d.ts'), content);
        process.exit(0);
    })
    .fail(reason => {
        var message = reason && (reason.stack || reason.message) || reason || 'unknown error';
        console.error((`✘ got error:\n${message}`));
        process.exit(-1);
    });
