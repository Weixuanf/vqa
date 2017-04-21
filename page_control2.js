/**
 * Created by wx on 4/13/17.
 */

document.getElementById('nextBtn').addEventListener('click',renderNextPage);
document.getElementById('submitButton').addEventListener('click',formSubmit);

var pageNum = document.getElementById('pageNum');
function getPageNum() {
    return parseInt(pageNum.innerHTML);
}
function renderNextPage() {
    var page = getPageNum();
    if (page==1) {//currently at the 1st page
        document.getElementById("page-1").style.display = "none";
        document.getElementById("page-2").style.display = "block";
        document.getElementById("questionBox").style.display = "block";
        init();//init the drawing canvas (this funtion is in drawbox.js)

        document.getElementById("step-cell-1").classList.add("active-nav");//change the step nav active cell
        document.getElementById("step-cell-0").classList.remove("active-nav");//change the step nav active cell
    }
    if (page==2) {//currently at the 2nd page
        if (notDrawn) {
            alert("You must give your bounding box before you can go the the next page!");
            return;
        }
        document.getElementById("myInput").type = "text";
        document.getElementById("myInput").focus();
        document.getElementById('nextBtn').style.display = 'none'; //hide the NEXT button if it's the last page
        document.getElementById('submitButton').type = "button"; //display the SUBMIT button at the last page

        //change the location of the canvas to the left-bar on the 3rd page (cur and paste in dom)
        document.getElementById('leftBar').appendChild(document.getElementById('draw-board'));
        document.getElementById("page-2").style.display = "none";
        document.getElementById("page-3").style.display = "block";

        document.getElementById("confidenceRadio").style.display = 'block'; //display the radio buttons of confidence
        document.getElementById("step-cell-2").classList.add("active-nav");//change the step nav active cell
        document.getElementById("step-cell-1").classList.remove("active-nav");//change the step nav active cell

        window.scrollTo(0, 0); //scoll to the top of the page
    }
    pageNum.innerHTML = ++page;

}

//deal with on submit the form
function formSubmit() {
    if(document.getElementById('myInput').value==""||document.querySelector('input[name=confidence]:checked')==null) {
        alert("You have to respond to ALL the questions on the page before you can submit!");
        return;
    }
    //add the result of the last page to vqa object
    var vqa = {
        image:imageName,
        question:question,
        answer:document.getElementById('myInput').value,
        startInputTime: startInputTime,
        imageLoadedTime: imageLoadedTime,
        submitTime:new Date(),//the time when hit the NEXT button (submit the result of current page)
        deleteCnt: deleteCnt,
        editCnt: editCnt,
        keyTypeStream:keyTypeStream,
        timeTypeStream:timeTypeStream,
        confidence: document.querySelector('input[name=confidence]:checked').value//the selected radio value for "Do you think you were able to answer the question correctly?"
    };
    var vqaJson = JSON.stringify(vqa);
    alert(vqaJson);
    document.getElementById('vqa').value = vqaJson;
    document.getElementById("mturk_form").submit();

}