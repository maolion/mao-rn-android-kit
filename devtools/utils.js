var ChildProcess = require('child_process');
var Promise = require("thenfail").Promise;

module.exports.resolveAbsolutePath = function resolveAbsolutePath(parentPath, subPath) {
    if (parentPath == subPath) {
        return './';
    }
    
    return (subPath.replace(parentPath, '') + '/').replace(/\/+|\\+/g, '/').replace(/^\//g, '').replace(/[^\/]+/g, '..');
}

module.exports.removeArrayItem = function removeArrayItem(list, item) {
    var n = 0;
    
    for (var i = 0, l = list.length; i < l; i++) {
        if (list[i] !== item) {
            list[n++] = list[i];
        }
    }
    
    list.length = n;
}

module.exports.uniqueArrayItems = function uniqueArrayItems(list) {
    var map = {};
    var n = 0;
    
    for (var i = 0, l = list.length; i < l; i++) {
        var item = list[i];
        if (!map[item]) {
            map[item] = true;
            list[n++] = item;
        }
    }
    
    list.length = n;
    
    return list;
}

module.exports.exec = function(execute, options) {
    var options = options || {};
    var log = options.log || process.stdout.write.bind(process.stdout);
    var errLog = options.errLog || process.stderr.write.bind(process.stderr);
    var cache = '';
    return new Promise((resolve, reject) => {
        var instance = ChildProcess.exec(
            execute + (options.args ?  ' ' + options.args.join(" ") : ""), 
            {
                cwd: options.cwd || process.cwd()
            },
            function(err) {
                
            }
        );
        instance.stdout.on('data', function(data) {
            data = data.toString("utf8");
            if (options.catchOutput) {
                cache += data; 
            }
            log(data);
        });

        instance.stderr.on('data', function(data) {
            errLog(data.toString("utf8"));
        });

        instance.on('exit', function(code, signal) {
            if (code !=0) {
                reject(code);
                return;
            }
            
            resolve({ code, output: cache });
        });
    });
}