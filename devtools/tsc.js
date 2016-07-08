var Path = require("path");
var Promise = require("thenfail").Promise;

var TSConfigSynchronizer = require("./tsconfig-synchronizer.js");
var Utils = require("./utils.js");
var Constants = require("./constants");

module.exports = function tsc(targetDir, options) {
    var options = options || {};
    var tsconfigSynchronizer = null;
    var tsconfig = Path.join(targetDir, 'tsconfig.json');
    return new Promise((resolve, reject) => {
        console.log('synchronizer tsconfig.json');
        tsconfigSynchronizer = new TSConfigSynchronizer(
            tsconfig,
            null,
            targetDir
        ); 
        tsconfigSynchronizer.once("sync", resolve);
    })
        .then(() => {
            if (!options.watch) {
                tsconfigSynchronizer.destroy();
            }

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
        });
}