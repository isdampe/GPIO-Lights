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

function lightUp(count) {

	console.log("Light " + count + ", pin " + lights[count].pin);
	gpio.open(lights[count].pin, "output", function(err){
		gpio.write(lights[count].pin, 1, function(){
			lights[count].status = 1;
			gpio.close(lights[count].pin);
			setTimeout(function(){

				console.log("Light off " + count + ", pin " + lights[count].pin);
				gpio.open(lights[count].pin, "output", function(err){
					gpio.write(lights[count].pin, 0, function(){
						lights[count].status = 0;
						gpio.close(lights[count].pin);
					});
				});

			}, lights[count].hold);
		});
	});

}

lightUp(1);

/*
gpio.open(7, "output", function(err) {
    gpio.write(7, 1, function() {
    	gpio.write(7,0,function(){
    		gpio.close(7);
    	});
        
    });
});
*/