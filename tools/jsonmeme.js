var jf = require('jsonfile')

var file = 'data.json';
var obj = {name: 'JP'};

jf.writeFile(file, obj, function(err) {
  console.log(err);
})