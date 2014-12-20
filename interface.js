var pins = require("./lib/pins.js");
var http = require('http');
var fs = require('fs');

var index = fs.readFileSync('view/index.html');


//First up, enable pins.
pins.init(function(){

	//Disable pins.
	pins.writeToAll(1);

	//Create the server.
	http.createServer(function (req, res) {

		var buffer = '';
		res.writeHead(200, {'Content-Type': 'text/html'});

		switch( req.url ) {
			case "/":
				//Main page.
				buffer = index;
			break;
			case "/1":
				//Motor forwards
				
				pins.motor(1);

			break;
			case "/2":
				//Motor backwards.
				
				pins.motor(0);

			break;
		}

	  res.end(buffer);
	}).listen(9615);

});

