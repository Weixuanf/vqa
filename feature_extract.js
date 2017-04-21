/**
 * Created by wx on 3/5/17.
 */
    //<!--Feature Extraction-->
var input = document.getElementById("myInput");
input.addEventListener("input", startInputHandler);
var startInputTime;
var submitTime;
var imageLoadedTime;
var deleteCnt = 0; //number of times of pressing delete/backspace
var editCnt = 0; //serial deleting counts for ONE
var lastIsDelete = false;
var lastWindowWidth = window.innerWidth;
var keyTypeStream = []; //key typestream
var timeTypeStream = [];
var averageTypeSpeed;


document.getElementById("deleteCnt").innerHTML = "You've pressed delete/backspace for "+ deleteCnt + " times";
//get the start input time
function startInputHandler() {
    //var x = document.getElementById("myInput").value;
    startInputTime = new Date();
    document.getElementById("demo").innerHTML = "You started inputting at: " + startInputTime;
    document.getElementById("myInput").removeEventListener("input",startInputHandler);//remove the listener so it's an one time event
}
function submitFunction() {
    submitTime = new Date();
    document.getElementById("submitTime").innerHTML = "Your clicked submit at: " + submitTime;
    document.getElementById("timeDiff").innerHTML = "Your total input time: " + (submitTime.getTime()-startInputTime.getTime()) +" ms";
    //average type speed during the entire process
    averageTypeSpeed = keyTypeStream.length/(timeTypeStream[timeTypeStream.length-1].getTime()-timeTypeStream[0].getTime());
    var para=document.createElement("p");
    para.innerHTML = "Your type speed: "+averageTypeSpeed+" letters/ms";
    document.body.appendChild(para);
}
function imageLoaded() {
    imageLoadedTime = new Date();
    document.getElementById("imageLoadTime").innerHTML = "The image finished loading at: " + imageLoadedTime;
}
function keyDownHandler(event) {
    var code = event.keyCode;

    if ((code==8||code==46)&&input.value != '') {
        if(!lastIsDelete) {
            editCnt ++;
        }
        deleteCnt ++;
        lastIsDelete = true;
    }
    else {
        lastIsDelete = false;
        if ((code >= 48 && code <= 57)||(code >= 65 && code <= 90)) {
            //digit(0-9) or letter[A-Z] key is pressed
            //console.log(code+' '+new Date());
            keyTypeStream.push(code);
            timeTypeStream.push(new Date());
            console.log(keyTypeStream[keyTypeStream.length-1]+" "+timeTypeStream[timeTypeStream.length-1]);

        }
    }

    document.getElementById("deleteCnt").innerHTML = "You've pressed delete/backspace for "+ deleteCnt + " times";document.getElementById("deleteCnt").innerHTML = "You've pressed delete/backspace for "+ deleteCnt + " times";
    document.getElementById("editCnt").innerHTML = editCnt;

}
function resizeHandler() {
    var newWindow = window.innerWidth;
    if(newWindow < lastWindowWidth) {
        var para=document.createElement("p");
        //para.innerHTML = "You zoomed in!";
        document.body.appendChild(para);
    }
    else {
        var para=document.createElement("p");
        //para.innerHTML = "You zoomed out!";
        document.body.appendChild(para);
    }
    lastWindowWidth = newWindow;
}
