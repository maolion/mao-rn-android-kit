var Path = require("path");
var Promise = require("thenfail").Promise;

var Utils = require("./utils.js");
var Constants = require("./constants");

module.exports = function tsc(targetDir, options) {
    var options = options || {};
    return new Promise((resolve, reject) => {
        var cache = '';
        Utils.exec(
            `node ${Path.join(Constants.NODE_MODULES_DIR, 'typescript/bin/tsc')}`, 
            { 
                args: [
                    options.watch ? '-w' : '',
                    options.declaration ? '-d' : '',
                    options.outDir ? `--outDir ${options.outDir}` : ''
                ],
                cwd: targetDir, 
                log: function(data) {
                    if (cache != null) {
                        cache += data.toString('utf8');
                        if (/compilation complete/i.test(cache)) {
                            cache = null;
                            resolve();
                        }
                    }
                    process.stdout.write(data.replace(/^\S+\.ts\(\d+(?:,\d+)+\)/mgi, Constants.CWD + '/$&'));
                }
            }
        ).then(resolve, reject);
    });
}