var express = require("express")
	, stylus = require("stylus")
	, nib = require("nib")

var app = express();

function compile(str, path)
{
	return stylus(str)
		.set('filename', path)
		.use(nib())
}
app.set('views',__dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
	{ src:__dirname + '/public'
	, compile:compile
	}
))
app.get('/', function(req, res) {
	res.send("testing")
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
})

