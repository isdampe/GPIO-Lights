var gpio = require('rpi-gpio');
var pinsConnected = 0;
var relayModule = {
	"relay1": 7,
	"relay2": 11,
	"relay3": 12,
	"relay4": 13,
	"relay5": 15,
	"relay6": 16,
	"relay7": 18,
	"relay8": 22
};

exports.init = function( onComplete ){

	gpio.on('export', function(pin) {
		console.log('Pin opened: ' + pin);
	});

	for( var att in relayModule) {
		gpio.setup(relayModule[att], gpio.DIR_OUT);
	}

	setTimeout(function(){
		onComplete();
	}, 600);

}


exports.closePins = function() {
  gpio.destroy(function() {
      console.log('All pins unexported');
      return process.exit(0);
  });
}

exports.writeToRelay = function( att, val ) {
	gpio.write(relayModule[att], val, function(err) {
    if (err) throw err;
   	console.log('Written to pin');
  });
}

exports.writeToAll = function( val ) {
	for ( var att in relayModule ) {
		console.log("Writing to " + att);
		gpio.write(relayModule[att], val, function(err) {
			if ( err ) throw err;
		});
	}
}

function writeToRelay( att, val ) {
	gpio.write(relayModule[att], val, function(err) {
    if (err) throw err;
   	console.log('Written to pin');
  });
}