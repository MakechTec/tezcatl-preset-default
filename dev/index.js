const concat = require('concat-files');
 
  concat([
    "./src/Default.mjs",
    "./src/constants.mjs",
  ], "./prebuild/default.mjs", function(err) {
    if (err) throw err
    console.log('done');
  });