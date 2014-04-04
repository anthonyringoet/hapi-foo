var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

// restart server for changes
gulp.task('default', function(){
  nodemon({ script: 'server.js', ext: 'html js'});
});
