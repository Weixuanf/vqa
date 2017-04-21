var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    rect = {},
    drag = false,
    mouseX,
    mouseY,
    closeEnough = 5,
    dragTL = dragBL = dragTR = dragBR = false;
var notDrawn = true;//if a box is drawn or not on the canvas
var imageObj = new Image();
var colPadding = 0; //the default padding of a col-md element in bootstrap
var imageName = decode(gup('img')),
    question = decodeURI(gup('ques'));
//imageObj.src = "https://s3.amazonaws.com/aws-website-myvqa-olx0m/"+imageName;
imageObj.src = "images/COCO_1.jpg";
question = "What sport is this?";

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadImage();
    notDrawn = true;
    rect.w = undefined;
    rect.h = undefined;
}
function loadQuestion() {
    document.getElementById("myquestion").innerHTML = question;
}
function loadCanvas() {
    //var drawbox = document.getElementById("draw-board");
    var leftBarWidth = canvas.parentNode.clientWidth - colPadding;
    if (imageObj.width>leftBarWidth) {
        canvas.width = leftBarWidth;
    }
    else {
        canvas.width = imageObj.width;//adjust the canvas size according to the image size
    }
    canvas.height = canvas.width * (imageObj.height / imageObj.width);
    loadImage();
}
function init() {
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    document.getElementById("redrawButton").addEventListener("click",redraw);


    rect = {
        startX: 100,
        startY: 200,
    }
    loadQuestion();
    loadCanvas();
    imageObj.onload = function(){loadCanvas()};
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function mouseDown(e) {
    //mouseX = e.pageX - this.offsetLeft;
    //mouseY = e.pageY - this.offsetTop;
    mouseX = getMousePos(canvas,e).x
    mouseY = getMousePos(canvas,e).y
    notDrawn = false;
    // if there isn't a rect yet
    if (rect.w === undefined) {
        rect.startX = mouseX;
        rect.startY = mouseY;
        dragBR = true;
    }

    // if there is, check which corner
    //   (if any) was clicked
    //
    // 4 cases:
    // 1. top left
    else if (checkCloseEnough(mouseX, rect.startX) && checkCloseEnough(mouseY, rect.startY)) {
        dragTL = true;
    }
    // 2. top right
    else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY)) {
        dragTR = true;

    }
    // 3. bottom left
    else if (checkCloseEnough(mouseX, rect.startX) && checkCloseEnough(mouseY, rect.startY + rect.h)) {
        dragBL = true;

    }
    // 4. bottom right
    else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY + rect.h)) {
        dragBR = true;

    }
    // (5.) none of them
    else {
        // handle not resizing
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadImage()//redraw image
    draw();

}

function checkCloseEnough(p1, p2) {
    return Math.abs(p1 - p2) < closeEnough;
}

function mouseUp() {
    dragTL = dragTR = dragBL = dragBR = false;
}

function mouseMove(e) {
    canvas.style.cursor = "crosshair";
    if (notDrawn) {
        return;
    }
    //mouseX = e.clientX - this.offsetLeft;
    //mouseY = e.clientY - this.offsetTop;
    mouseX = getMousePos(canvas,e).x
    mouseY = getMousePos(canvas,e).y
    if (dragTL) {
        rect.w += rect.startX - mouseX;
        rect.h += rect.startY - mouseY;
        rect.startX = mouseX;
        rect.startY = mouseY;
    } else if (dragTR) {
        rect.w = Math.abs(rect.startX - mouseX);
        rect.h += rect.startY - mouseY;
        rect.startY = mouseY;
    } else if (dragBL) {
        rect.w += rect.startX - mouseX;
        rect.h = Math.abs(rect.startY - mouseY);
        rect.startX = mouseX;
    } else if (dragBR) {
        rect.w = Math.abs(rect.startX - mouseX);
        rect.h = Math.abs(rect.startY - mouseY);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadImage()//redraw image
    draw();
}

function draw() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#F0C132";
    ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
    drawHandles();
}

function drawCircle(x, y, radius) {
    ctx.fillStyle = "#111111";
    ctx.strokeStyle = "#ffffff"
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawHandles() {
    drawCircle(rect.startX, rect.startY, closeEnough);
    drawCircle(rect.startX + rect.w, rect.startY, closeEnough);
    drawCircle(rect.startX + rect.w, rect.startY + rect.h, closeEnough);
    drawCircle(rect.startX, rect.startY + rect.h, closeEnough);
}
function loadImage() {
    ctx.drawImage(imageObj, 0, 0, imageObj.width,    imageObj.height,     // source rectangle
        0, 0, canvas.width, canvas.height); // destination rectangle
}
