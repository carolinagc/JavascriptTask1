var nRectangles     = 3;
var containerWidth  = 600;
var containerHeight = 600;
var containerId     = "container";
var minRectDim      = 50;
var maxRectDim      = 100;
var rectangles      = {};

function main(){
    setDiv(containerId, containerWidth, containerHeight);
    for(i=0; i<nRectangles; i++){
        var width = setWidthRect();
        var height = setHeightRect();
        var id     = "rect" + i;

        setCanvasRect(id, width,height );   
    }
}


function setDiv(id,width, height) {
    var div = document.createElement("div");
    div.id = id;
    div.style.width = width + "px";
    div.style.height = height + "px";
//    div.style.backgroundColor = "green";
    div.style.position = "absolute";
    div.style.top = 0;
    div.style.left = 0
    document.body.appendChild(div);     
}


function setCanvasRect(id,width, height) {
    var canvasR = document.createElement("canvas");
    ctx = canvasR.getContext("2d");
    ctx.canvas.id = id;
    //    canvasR.addEventListener('mouseover', onMouseOver,false);    

    //Set canvas size
    setSize(ctx,width, height);

    //Set canvas random position
    x = randomize(0,containerWidth-maxRectDim);
    y =  randomize(0,containerWidth-maxRectDim);
    setPos(ctx,x,y);
    document.getElementById(containerId).appendChild(canvasR); // adds the canvas to #div

    //Store canvas  in Object
    var rect = storeCanvas(id,x,y,width,height);
    
    //Check if canvas is overlapping
    if (isOverlapping(rect, rectangles)) {
        //option1
        document.getElementById("container").style.visibility="hidden";
        location.reload();
        //option 2
        var rect = storeCanvas(id,x,y,width,height);
        //draw rectangle
        console.log("setPos re calculated")
        drawRectangle(id, width, height,setColor());
    } else {
        //draw rectangle
        drawRectangle(id, width, height,setColor());
    }
    
    document.getElementById(id).addEventListener('mouseover', function() {
        drawRectangle(id, width, height,setColor());
        console.log("MOUSE OVER")
    })    

}

function resetCoord(myNewRect,rect) {
    var x1 = rect[0];
    var w1 = rect[2];
    var x2 = myNewRect[0];
    var w2 = myNewRect[2];
    x2 = x1+w1+1;
    // check new position is inside container

    if (x2>0 && x2+w2<600) {
        ctx.canvas.style.left = x2 + "px";
        ctx.canvas.style.top =  y + "px";
    } else {
        x2 = x1 - w2 - 1;
        ctx.canvas.style.left = x2 + "px";
        ctx.canvas.style.top =  y + "px";
        console.log("no no")
    }

}

function setPos(context,x,y) {
    ctx.canvas.style.position = "absolute";
    ctx.canvas.style.left = x + "px";
    ctx.canvas.style.top =  y + "px";
}

function setSize(context,width, height) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function storeCanvas(id,x,y,width,height) {
    var rect = [x,y,width, height];
    rectangles[id]=rect;
//    rectangles.push(rect);   
    console.log("rectangles", rectangles)
    return rect;
}

function drawRectangle(id,width,height,color) {
    r_canvas = document.getElementById(id);
    r_context = r_canvas.getContext("2d");
    r_context.fillStyle = color; 

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


function intersects (myNewRect, rect) {
    x1 = rect[0], 
    y1 = rect[1], 
    w1 = rect[2],
    h1 = rect[3]

    x2 = myNewRect[0],
    y2 = myNewRect[1],
    w2 = myNewRect[2],
    h2 = myNewRect[3]

    if (x1+w1<x2 || x2+w2<x1 || y1+h1<y2 || y2+h2<y1){
        
        return false;        
    } else {
//        resetCoord(myNewRect,rect);
        return true;
    }

}

function isOverlapping(myNewRect, rectangles) {
    var rectangles_length = Object.keys(rectangles).length
    if (rectangles_length === 2 && intersects(myNewRect, rectangles.rect0)) {
        console.log("intersection", myNewRect, rectangles.rect0);
        return true;
    }
    if (rectangles_length === 3) {
      if (intersects(myNewRect, rectangles.rect0) || intersects(myNewRect, rectangles.rect1)) {
          console.log("intersection r2, r0",myNewRect, rectangles[0]);
          console.log("intersection r2, r1", myNewRect, rectangles[1]);
          return true;
      }
    }
    
    return false;

}
