var nRectangles     = 3;
var containerWidth  = 600;
var containerHeight = 600;
var containerId     = "container";
var minRectDim      = 50;
var maxRectDim      = 100;
var rectangles      = [];

function main(){
    setDiv(containerId, containerWidth, containerHeight);
    for(i=0; i<nRectangles; i++){
        setCanvasRect("rect"+i,setWidthRect(), setHeightRect());   
    }
}


function setDiv(id,width, height) {
    var div = document.createElement("div");
    div.id = id;
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.backgroundColor = "green";
    div.style.position = "absolute";
    div.style.top = 0;
    div.style.left = 0
    document.body.appendChild(div);     
}


function setCanvasRect(id,width, height) {
    var canvasR = document.createElement("canvas");
    ctx = canvasR.getContext("2d");
    ctx.canvas.id = id;
    setSize(ctx,width, height);

    //Set canvas position
    x = randomize(0,containerWidth-maxRectDim);
    y =  randomize(0,containerWidth-maxRectDim);
    setPos(ctx,x,y);
    document.getElementById(containerId).appendChild(canvasR); // adds the canvas to #div

    //Store canvas  in Array
    var rect = [x,y,width, height];
    rectangles.push(rect);   
    //    var c = storeCanvas(x,y,width,height);
    
    //Check if canvas is overlapping
    if (isOverlapping(rect, rectangles)) {
        resetPos(ctx,x,y);
        //draw rectangle
        console.log("setPos re calculated")
        //drawRectangle(id, width, height);
    } else {
        //draw rectangle
        drawRectangle(id, width, height);
    }


}

function onMouseOver(e) {
    event.target.style.color = setColor();
    alert("MOUSE");

}

function resetPos(context,x,y) {

}

function setPos(context,x,y) {
    ctx.canvas.style.position = "absolute";
    ctx.canvas.style.top = y + "px";
    ctx.canvas.style.left = x + "px";
}

function setSize(context,width, height) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function storeCanvas(x,y,width,height) {
    var rect = [x,y,width, height];
    rectangles.push(rect);   
    return rect;
}

function drawRectangle(id,width,height) {
    r_canvas = document.getElementById(id);
    r_context = r_canvas.getContext("2d");
    r_context.fillStyle = setColor(); 
    r_context.fillRect(0,0,width, height);

    console.log(id, x,y,width,height);

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


function intersects (rect1, rect2) {
    x1  = rect1[0], 
    y1 = rect1[1], 
    w1 = rect1[2],
    h1 = rect1[3]

    x2  = rect2[0],
    y2 = rect2[1],
    w2 = rect2[2],
    h2 = rect2[3]

    if (x1+w1<x2 || x2+w2<x1 || y1+h1<y2 || y2+h2<y1){
        return false;        
    } else {
        return true;
    }

}

function isOverlapping(myNewRect, rectangles) {
    if (rectangles.length == 1) { return false } 
    if (rectangles.length == 2 && intersects(myNewRect, rectangles[0])) {
        console.log("intersection", myNewRect, rectangles[0]);
        return true;
    }
    if (rectangles.length === 3) {
        if (intersects(myNewRect, rectangles[0]) || intersects(myNewRect, rectangles[1])) {
            console.log("intersection r2, r0",myNewRect, rectangles[0]);
            console.log("intersection r2, r1", myNewRect, rectangles[1]);
            return true;
        }
    }
    
    return false;

}
