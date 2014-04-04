var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;
var child;

// restart server for changes
gulp.task('default', function(){
  nodemon({ script: 'server.js', ext: 'html js'});
});

gulp.task('test', function () {
  child = exec('node node_modules/lab/bin/lab',
    function (error, stdout, stderr) {
      console.log(stdout);
      if (error) {
        console.log('exec error: ' + error);
      }
  });
});
