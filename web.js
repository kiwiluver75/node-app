/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , pg = require('pg')


var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

var port = process.env.PORT || 5000
app.listen(port, function() {
	console.log("Listening on " + port);
})

pg.connect(process.env.DATABASE_URL, function(err, client) {
	var query = client.query('SELECT * FROM your_table');

	query.on('row', function(row) {
		console.log(JSON.stringify(row));
  });
});
