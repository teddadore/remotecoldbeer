var socket;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0, 0, 255);

	// socket = io.connect('http://localhost:3000');
	socket = io.connect('10.0.1.29:3000');
	// socket.on('mouse', newDrawing);
}

function newDrawing (data) {
	noStroke();
	fill(255, 0, 100);
	ellipse(data.x, data.y, 20, 20);
}

function draw() {

	if (keyIsDown(UP_ARROW)) {
    	upLeft();
  	}

  	if (keyIsDown(DOWN_ARROW)) {
    	downLeft();
  	}

  	if (mouseIsPressed) {
  		if (yA >= 8 ) {
  			upLeft();
  			socket.emit('rightPlayer', yA);
  		} else if (yA <= 4) {
  			downLeft();
  			socket.emit('rightPlayer', yA);
  		}
  	}

  	window.ondevicemotion = function(event) {	
	    accX = Math.round(event.accelerationIncludingGravity.x*10) / 10;  
	    accY = Math.round(event.accelerationIncludingGravity.y*10) / 10;  
	    
	    movement = 10;
	    
	    xA = -(accX / 10) * movement;
	    yA = -(accY / 10) * movement;
	}
	
}



function upLeft() {
	var data = "left up";
	socket.emit('leftPlayer', data);

	// console.log(data);
}

function downLeft() {
	var data = "left down";
	socket.emit('leftPlayer', data);

	// console.log("Arrow DOWN!");
}


