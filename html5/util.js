function resize_canvas(){
    canvas = document.getElementById("canvas");
    if (canvas.width  < window.innerWidth)
    {
        canvas.width  = window.innerWidth;
    }

    if (canvas.height < window.innerHeight)
    {
        canvas.height = window.innerHeight;
    }
}

function getRandomInRange(bottom, top){
	return Math.random() * ( 1 + top - bottom )  + bottom;
}

function getRandomColor(){
	return "#"+Number(Math.floor(getRandomInRange(0,255))).toString(16)+""+Number(Math.floor(getRandomInRange(0,255))).toString(16)+""+Number(Math.floor(getRandomInRange(0,255))).toString(16);
}