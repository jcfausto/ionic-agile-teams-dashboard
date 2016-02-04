var express = require('express');
app = express();

var gulp = require('gulp'); // Load gulp
require('./gulpfile'); // Loads our config task

//run config task
gulp.start('config');

//serve client side files
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
