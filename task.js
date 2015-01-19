var nRectangles     = 3;
var containerWidth  = 600;
var containerHeight = 600;
var containerId     = "container";
var minRectDim      = 50;
var maxRectDim      = 100;
var rectangles      = {};

function main() {
    setDiv(containerId, containerWidth, containerHeight);
    for(i=0; i<nRectangles; i++){
        var width  = setWidthRect();
        var height = setHeightRect();
        var id     = "rect" + i;
        drawCanvasRect(id, width,height );   
    }
}

function setDiv(id,width, height) {
    var div = document.createElement("div");
        div.id = id;
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.position = "absolute";
        div.style.top = 0;
        div.style.left = 0;

    document.body.appendChild(div);     
}

function drawCanvasRect(id,width, height) {

    //Set canvas
    var canvasR = document.createElement("canvas");
    ctx = canvasR.getContext("2d");
    ctx.canvas.id = id;
    
    var color = setColor();
    
    setSize(ctx,width, height);

    var x = randomize(0,containerWidth-maxRectDim);
    var y =  randomize(0,containerWidth-maxRectDim);
    setPos(ctx,x,y);
    document.getElementById(containerId).appendChild(canvasR); // adds the canvas to #div

    //Store canvas  in Object
    var rect = storeCanvas(id,x,y,width,height);
    
    //Check if canvas is overlapping

    while (isOverlapping(id,rect,rectangles)) {
        delete rectangles[id];
        var newCoord = resetPos(id);
        rect = storeCanvas(id,newCoord[0],newCoord[1],width,height);
    }
    
    
    
    // Draw rectangle
    drawRectangle(id,x,y, width, height, color);

    document.getElementById(id).addEventListener('mouseover', function(e) {
        var colorM = setColor();
        drawRectangle(id,x,y, width, height,colorM);
        mousePos = getMousePos(canvasR, e);
        // mouse position relative to canvas
        var mouseX = mousePos.x;
        var mouseY = mousePos.y;
        var onMouseOver = function(idR,ctxR,p,q,w,h) {
            return function() {
                if (mouseX>=0 && mouseY>=0) {
//                    alert("MOUSE IN")
                    var newCoord = resetPos(idR);
                    mousePos = getMousePos(canvasR, e);
                    var mX = mousePos.x;
                    var mY = mousePos.y;
                    var rectM = storeCanvas(idR,newCoord[0],newCoord[1],width,height);

                    //checking that after 3 sec rect is reposition and is not under cursor                 

                    while ((isOverlapping(idR,rectM,rectangles) || (mX>=0 && mY>=0))) {
                        delete rectangles[idR];
                        var newCoord = resetPos(idR);
                        rectM = storeCanvas(idR,newCoord[0],newCoord[1],width,height);
                        mousePos = getMousePos(canvasR, e);
                        mX = mousePos.x;
                        mY = mousePos.y;

                    }
                        //draw rectangle
                        drawRectangle(idR,p,q, w, h, colorM);
                }
            }
        }

        t = setTimeout(onMouseOver(id,ctx,x,y,width,height),3000);
    }) // close mouseover

    document.getElementById(id).addEventListener('mouseout', function(e) {
        mousePos = getMousePos(canvasR, e);
        var mouseX = mousePos.x;
        var mouseY = mousePos.y;
        clearTimeout(t);
    });                               
}    

function getMousePos(canvas,e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top

    };
}

function resetPos(id) {
    rCanvas  = document.getElementById(id);
    ctxR = rCanvas.getContext("2d");
    var x = randomize(0,containerWidth-maxRectDim);
    var y =  randomize(0,containerWidth-maxRectDim);  
    ctxR.canvas.style.position = "absolute";
    ctxR.canvas.style.left = x + "px";
    ctxR.canvas.style.top =  y + "px";
    return [x,y]
}

function setPos(ctx,x,y) {
    ctx.canvas.style.position = "absolute";
    ctx.canvas.style.left = x + "px";
    ctx.canvas.style.top =  y + "px";
    
}

function setSize(ctx,width, height) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function storeCanvas(id,x,y,width,height) {
    var rect = [x,y,width, height];
    rectangles[id] = rect;
    return rect;
}

function drawRectangle(id,x,y,width,height,color) {
    r_canvas  = document.getElementById(id);
    r_context = r_canvas.getContext("2d");
    r_context.fillStyle = color; 
    r_context.fillRect(0,0,width, height);
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

function intersects(myNewRect, rect) {
    x1 = rect[0], 
    y1 = rect[1], 
    w1 = rect[2],
    h1 = rect[3]

    x2 = myNewRect[0],
    y2 = myNewRect[1],
    w2 = myNewRect[2],
    h2 = myNewRect[3]

    if (x1+w1<x2 || x2+w2<x1 || y1+h1<y2 || y2+h2<y1) {
        return false;        
    } else {
        return true;
    }
}


function isOverlapping(id, myNewRect, rectangles) {
    var rectangles_length = Object.keys(rectangles).length;
    var intersection ;

    var obj = {
        1: function(){
            return false;
        },
        2:function(){
            return (intersects(myNewRect, rectangles.rect0)) ;
        },
        3: function() {
            switch(id) {
            case "rect0":
                intersection = (intersects(myNewRect, rectangles.rect1) || intersects(myNewRect, rectangles.rect2)) 
                break;
            case "rect1":
                intersection = (intersects(myNewRect, rectangles.rect0) || intersects(myNewRect, rectangles.rect2));
                break;
            case "rect2":
                intersection = (intersects(myNewRect, rectangles.rect0) || intersects(myNewRect, rectangles.rect1));
                break;
            }
            return intersection;
        }
    }

    return obj[rectangles_length]();
}
