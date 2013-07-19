resize_canvas();
var canvas = window.document.getElementById("canvas");
var c = canvas.getContext("2d");
var attribsArray = [];
var onThis = {x: canvas.width, y: canvas.height};

setInterval(draw, 40);
setInterval(draw, 30);
setInterval(draw, 20);
setInterval(draw, 10);
function draw(){
	var attribs = {
				x: onThis.x,
				y: onThis.y,
				xSpeed: getRandomInRange(-20,20),
				ySpeed: getRandomInRange(-20,20),
				color: getRandomColor(),
				size: 10
			};

	attribsArray.push(attribs);
    document.getElementById("numBoxes").innerHTML = attribsArray.length +" boxes";
	c.clearRect(0,0,canvas.width, canvas.height);
	for(var i in attribsArray){
		var attribs = attribsArray[i];
		c.fillStyle = attribs.color;

		c.fillRect(attribs.x/2,attribs.y/2,attribs.size, attribs.size);
		attribs.x = attribs.x+attribs.xSpeed;
		attribs.y = attribs.y+attribs.ySpeed;
		attribs.size = attribs.size * 0.99;
		if(attribs.x < 0 ){
			delete attribsArray[i];
		}
	}
}

document.onmousemove = function(e){
    onThis.x = e.clientX*2;
    onThis.y = e.clientY*2;
}