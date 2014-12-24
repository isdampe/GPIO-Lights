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

exports.motor = function( direction ) {

	if ( direction === 0 ) {
		//Reset steering first.
		gpio.write(relayModule.relay3, 1, function(err){
			if ( err ) throw err;
		});
	}

	//Set the direction on the DPDT.
	gpio.write(relayModule.relay1, direction, function(err){
		if ( err ) throw err;
		console.log("Set motor DPDT to " + direction );
		setTimeout(function(){

			gpio.write(relayModule.relay2, 0, function(){
				if ( err ) throw err;
				console.log("Set motor to drive.");
				setTimeout(function(){
					gpio.write(relayModule.relay2, 1, function(){
						if ( err ) throw err;
						console.log("Auto stop motor");
					});
				},250);
			});

		}, 50);
		
		
	});

}

exports.steering = function( direction ) {

	//Set the direction on the DPDT.
	gpio.write(relayModule.relay3, direction, function(err){
		if ( err ) throw err;
		console.log("Set motor DPDT to " + direction );
		setTimeout(function(){
			gpio.write(relayModule.relay4, 0, function(){
			if ( err ) throw err;
			console.log("Set motor to drive.");
			setTimeout(function(){
				gpio.write(relayModule.relay4, 1, function(){
					if ( err ) throw err;
					console.log("Auto stop motor");
				});
			},500);
		});
		}, 50);
		
	});

}

function writeToRelay( att, val ) {
	gpio.write(relayModule[att], val, function(err) {
    if (err) throw err;
   	console.log('Written to pin');
  });
}