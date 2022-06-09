const concat = require('concat-files');
 
  concat([
    "./src/DefaultCLI.mjs"
  ], "./prebuild/default.mjs", function(err) {
    if (err) throw err
    console.log('done');
  });