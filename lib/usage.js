module.exports = {
  printUsage: function() {
    console.log('');
    console.log('Ejs Import Plugin');
    console.log('specify plugin with --ejs-import');
    this.printOptions();
    console.log('css/less extensions not necessary');
    console.log('');
  },
  printOptions: function() {
    console.log('add any key=value or key="value"');
  }
};
