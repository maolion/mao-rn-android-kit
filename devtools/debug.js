var FS = require('fs-extra');
var tsc = require('./tsc');
var Constants = require('./constants');

console.log('debug starting...');

tsc(Constants.CWD, {
    watch: true,
    outDir: Constants.DEBUG_OUTPUT_DIR
})
    .fail(reason => {
        var message = reason && (reason.stack || reason.message) || reason || 'unknown error';
        console.error((`✘ got error:\n${message}`));
        process.exit(-1);
    });