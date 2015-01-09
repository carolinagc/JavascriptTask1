var	nRectangles = 3;
var containerWidth = 600;
var containerHeight = 600;
var containerId = "container";
var minRectDim = 50;
var maxRectDim = 100;

function main() {
    setCanvas(containerId, containerWidth, containerHeight);
    for(i=0; i<nRectangles; i++){
        drawRect();
        document.body.appendChild(x);  
    }
}

function setCanvas(id, width, height) {
    x = document.createElement("canvas");
    ctx = x.getContext("2d");
    ctx.canvas.id = id;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function drawRect() {
    var x = randomize(0,255);
    var y =  randomize(0,255);
    ctx.fillStyle = setColor(); 
    ctx.fillRect(x,y,setWidthRect(), setHeightRect());

}

function setColor() {
    var r = randomize(0,254);
    var g = randomize(0,254);
    var b = randomize(0,254);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function setWidthRect() {
    var width = randomize(0,255);
    if (width < minRectDim ) {width = minRectDim};
    if (width > maxRectDim ) {width = maxRectDim};
    return width;

}

function setHeightRect() {
    var height = randomize(0,255);
    if (height < minRectDim ) {height = minRectDim};
    if (height > maxRectDim ) {height = maxRectDim};
    return  height;
}

function randomize(max,min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function recIntersection(rect1,rect2) {


}
