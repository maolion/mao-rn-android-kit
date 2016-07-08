var FS = require("fs-extra");
var Path = require('path');
var Chokidar = require('chokidar');
var Chalk = require('chalk');
var Events = require('events');
var Promise = require('thenfail').Promise;
var PromiseLock = require('thenfail').Lock;
var Utils = require("./utils.js");

var CWD = process.cwd();
var uid = 0;

class TSConfigSynchronizer extends Events {
    /**
     * @param {string} targetFilePath 目标 tsconfig.json 路径
     * @param {string[]} fileGlobs glob表达式
     * @param {string} cwd 工作目录   
     */
    constructor(targetFilePath, fileGlobs, cwd) {
        super();
        
        this._targetFilePath = Path.resolve(targetFilePath);
        this._cwd = cwd || CWD;
        this._extraFileGlobs = fileGlobs || [];
        this._fileGlobs = [];
        this._syncLocker = new PromiseLock();
        this.files = [];
        
        if (!FS.existsSync(this._targetFilePath) && !FS.existsSync(Path.join(Path.dirname(this._targetFilePath), 'x-tsconfig.json'))) {
            throw new Error(`${this._targetFilePath} is not found`);
        }
        
        if (FS.existsSync(Path.join(Path.dirname(this._targetFilePath), 'x-tsconfig.json'))) {
            try{
                FS.unlinkSync(this._targetFilePath);
            } catch (e) {}
        }
        this._watch();
    }
    
    /**
     * 设置tsconfig 中files
     */
    set files(files) {
        if (!this._tsconfig) {
            this._tsconfig = {};
        }
        
        this._tsconfig.files = files;
    }
    
    /**
     * 获取tsconfig 中的files
     */
    get files() {
        return (this._tsconfig||{}).files;
    }
    
    /**
     * 触发同步
     * @param {Function} callback 用于异步更新文件时的回调
     */
    sync(callback, delay) {
        clearTimeout(this._syncDelayTimer);
        if (Object.keys(this._tsconfig).join('') == 'files') {
            return;
        }
        
        if (delay) {
            this._syncDelayTimer = setTimeout(this.sync.bind(this, callback), delay);
        } else {
            this.files = Utils.uniqueArrayItems(this.files);
            this.emit('syncBefore');
            var tsconfig = this._tsconfig;
            this._syncLocker.queue(() => {
                return Promise.invoke(
                    FS.writeFile, 
                    this._targetFilePath, 
                    JSON.stringify(tsconfig, true, '    ')
                )
                    .then(() => {
                        callback && callback();
                        this.emit('sync');
                    })
                    .fail(reason => {
                        this.emit('syncError', reason);
                    });
            });
        }
    }
    
    /**
     * 销毁对象
     */
    destroy() {
        try{
            this.watcher.close();
        } catch(e) { }
        
        this._tsConfig = null;
        this.files = null;
        this.watcher = null;
    }
    
    //以下是私有方法
    
    _watch() {
        try{
            if (this.watcher) {
                this.watcher.close();
            }
        } catch (e) {}
        
        var id = ++uid;
        this.files = [];
        
        this.watcher =  Chokidar.watch(
            Utils.uniqueArrayItems(this._fileGlobs.concat(
                'x-tsconfig.json', 
                'tsconfig.json', 
                this._extraFileGlobs
            )), 
            { cwd: this._cwd }
        );
        
        this.watcher.on("add", (file) => {
            if (id != uid) {
                return;
            }
            
            if (!this._handleChange(file)) {
                this.files.push(file);
                this.sync(null, 100);
            }
            this.emit('action', { type: 'add', file });
        });
        
        this.watcher.on("change", (file) => {
            if (id != uid) {
                return;
            }
            this.emit('action', { type: 'change', file });
            this._handleChange(file);
        });
        
        this.watcher.on("unlink", (file) => {
            if (id != uid) {
                return;
            }
            
            var n = 0;
            var files = this.files;
            for(var i = 0, l = files.length; i < l; i++) {
                if (files[i] != file) {
                    files[n++] = files[i];
                }
            }
            
            files.length = n;
            this.files = files;
            this.sync(null, 100);
            this.emit('action', { type: 'unlink', file });
        });
        
    }
    
    _handleTSConfigChanged() {
        var id = uid;
        
        FS.readFile(this._targetFilePath, (err, tsconfig) => {
            
            if (err || id != uid) {
                return;
            }
            try{
                tsconfig = JSON.parse(tsconfig || '{}');
            } catch (e) {
                return;
            }
            
            var newFileGlobs = tsconfig.fileGlobs || [];
            var oldFileGlobs = this._fileGlobs;
            
            for (var i = 0, globs = oldFileGlobs.length > newFileGlobs.length ? oldFileGlobs : newFileGlobs, l = globs.length; i < l; i++) {
                var glob = globs[i];
                
                if (newFileGlobs.indexOf(glob) > -1 && oldFileGlobs.indexOf(glob) > -1) {
                    continue;
                } else {
                    this._fileGlobs = newFileGlobs;
                    this._tsconfig = tsconfig;
                    this._watch();
                    return;
                }
            }
        });
            
    }
    
    _handleChange(file) {
        var u= uid;
        switch (file) {
            case 'x-tsconfig.json':
                this._syncLocker.queue(() => Promise.invoke(
                    FS.copy, 
                    Path.join(this._cwd, file), 
                    this._targetFilePath, 
                    { clobber : true }
                ));
                
                
                return true;
                
            case 'tsconfig.json':
                this._handleTSConfigChanged();
                return true;
        }
    }
}

module.exports = TSConfigSynchronizer;