var PromiseConstructor = typeof Promise === 'undefined' ? require('promise') : Promise;
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

module.exports = function(less) {
  var FileManager = less.FileManager;

  function EjsFileManager(options) {
    this.options = options || {};

    if (this.options.prefix === undefined) {
      this.options.prefix = 'ejs://';
    }
  }

  EjsFileManager.prototype = new FileManager();

  EjsFileManager.prototype.supports = function(filename, currentDirectory, options, environment) {
    var ejsProtocolPrefixRegex = new RegExp('^' + this.options.prefix, 'i');
    return filename.match(ejsProtocolPrefixRegex) || currentDirectory.match(ejsProtocolPrefixRegex);
  };
  EjsFileManager.prototype.supportsSync = EjsFileManager.prototype.supports;

  EjsFileManager.prototype.resolve = function(filename, currentDirectory) {
    filename = filename.replace(this.options.prefix, '');

    return path.normalize(path.join(currentDirectory, filename));
  };

  EjsFileManager.prototype.loadFile = function(filename, currentDirectory, options, environment) {
    var tmplOptions = this.options;
    try {
      filename = this.resolve(filename, currentDirectory);
      return new PromiseConstructor(function(fullfill, reject) {
        fs.readFile(filename, {
          encoding: 'utf8'
        }, function(err, data) {
          if (err) {
            return reject(err);
          }
          try {
            var text = ejs.render(data.toString(), tmplOptions, {
              filename: filename
            });
            fullfill({ contents: text, filename: filename});
          } catch (e) {
            reject(e);
          }
        });
      });
    }
    catch (e) {
      return new PromiseConstructor(
        function(fullfill, reject) {
          reject(e);
        }
      );
    }
     //return FileManager.prototype.loadFile.call(this, filename, "", options, environment);
  };

  EjsFileManager.prototype.loadFileSync = function(filename, currentDirectory, options, environment) {
    try {
      filename = this.resolve(filename, currentDirectory);
    }
    catch (e) {
      return { error: e };
    }
    return FileManager.prototype.loadFileSync.call(this, filename, "", options, environment);
  };

  EjsFileManager.prototype.tryAppendExtension = function(path, ext) {
    return path;
  };

  EjsFileManager.prototype.tryAppendLessExtension = function(path) {
    return path;
  };

  return EjsFileManager;
};
