var gpio = require("pi-gpio");
var lights = {
	1: {
		pin: 7,
		hold: 30000
	},
	2: {
		pin: 11,
		hold: 15000,
		status: 0
	},
	3: {
		pin: 18,
		hold: 5000,
		status: 0
	},
	4: {
		pin: 13,
		hold: 2500,
		status: 0
	},
	5: {
		pin: 15,
		hold: 1000,
		status: 0
	},
	6: {
		pin: 23,
		hold: 250,
		status: 0
	}
}

for ( i=1; i<7; i++ ) {
	gpio.open(lights[i].pin, "output", function(){});
}

function lightUp(count) {

	console.log("Light " + count + ", pin " + lights[count].pin);

	gpio.write(lights[count].pin, 1, function(){
		lights[count].status = 1;
		setTimeout(function(){
			console.log("Light off " + count + ", pin " + lights[count].pin);
				gpio.write(lights[count].pin, 0, function(){
					lights[count].status = 0;
				});

		}, 250);
	});

}

setInterval(function(){

	//Get random number.
	var number =  Math.floor((Math.random() * 6) + 1); 
	
	lightUp(number);

}, 500);


process.on('SIGINT', function() {
	for ( i=1; i<7; i++ ) {
		var ix = i;
		gpio.write(lights[ix].pin, 0, function(){
			gpio.close(lights[ix].pin);
		});
	}
	setTimeout(function(){
		process.exit();
	}, 1000);
});