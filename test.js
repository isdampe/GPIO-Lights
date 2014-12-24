var pins = require("./lib/pins.js");

pins.init(function(){

	//Disable pins.
	pins.writeToAll(1);

	setTimeout(function(){
		
		pins.motor(0);


	}, 2000);

/*
	//Run motor for one second.
	setTimeout(function(){
		pins.writeToRelay("relay1", 1);

		setTimeout(function(){
			pins.writeToRelay("relay2", 0);

			setTimeout(function(){
				pins.writeToRelay("relay2", 1);


			setTimeout(function(){
					pins.writeToRelay("relay1", 0);

					setTimeout(function(){
						pins.writeToRelay("relay2", 0);

						setTimeout(function(){
							pins.writeToRelay("relay2", 1);
						}, 1000);

					}, 1000);

				},1000);










			}, 1000);

		}, 1000);

	},1000);*/

	/*
	setTimeout(function(){
		pins.writeToRelay("relay2", 0);
		setTimeout(function(){
			pins.writeToRelay("relay2", 1);
			setTimeout(function(){
				pins.writeToRelay("relay1", 0);
				setTimeout(function(){
					pins.writeToRelay("relay1", 1);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1000);*/

});