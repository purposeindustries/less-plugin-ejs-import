var getEjsFileManager = require('./ejs-file-manager');
var usage = require('./usage');
var parseOptions = require('./parse-options');


function LessPluginEjsImport(options) {
  this.options = options;
}

LessPluginEjsImport.prototype = {
    install: function(less, pluginManager) {
        var EjsFileManager = getEjsFileManager(less);
        pluginManager.addFileManager(new EjsFileManager(this.options));
    },
    printUsage: function () {
        usage.printUsage();
    },
    setOptions: function(options) {
        this.options = parseOptions(options);
    },
    minVersion: [2, 1, 1]
};

module.exports = LessPluginEjsImport;
