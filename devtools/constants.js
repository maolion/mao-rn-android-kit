var Path = require('path');

exports.CWD              = process.cwd(); 
exports.NODE_MODULES_DIR = Path.join(exports.CWD, 'node_modules');

exports.DEVTOOLS_DIR     = Path.join(exports.CWD, 'devtools');

exports.SOURCE_DIR       = Path.join(exports.CWD, 'src');
exports.OUTPUT_DIR       = Path.join(exports.CWD, 'dist');
