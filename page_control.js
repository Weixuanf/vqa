/**
 * Created by wx on 3/5/17.
 */
//Page Render Control
//<!--Get the variables passed by the URL-->
//document.getElementById('myimage').src = "https://www.cs.utexas.edu/~dgurari/Projects/vqAnswerCollection/1500_Images/"+decode(gup('url'));
//document.getElementById('myquestion').innerHTML = decodeURI(gup('ques'));
var totalPages = 3;
document.getElementById('totalPages').innerHTML = totalPages;
var images = [];
var questions = [];
for (var i=1;i<=totalPages;i++) {
    images[i] = "https://s3.amazonaws.com/aws-website-myvqa-olx0m/"+decode(gup('img'+i));
    console.log(images[i]);
    questions[i] = decodeURI(gup('ques'+i));
    console.log(questions[i]);
}
//var images = ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg"];
//var questions = ["what is this?","how are you?","are you ok?","What's in it?","Why do you like it?"];
var page = parseInt(document.getElementById('pageNum').innerHTML); //title attribute recode the number of image

function renderBtnIfLastPage() {
    if(page==totalPages) {
        document.getElementById('nextBtn').style.display = 'none'; //hide the NEXT button if it's the last page
        document.getElementById('submitButton').type = 'submit'; //display the SUBMIT button at the last page
    }
}
//load image and question for current page
document.getElementById('myimage').src = images[page];
document.getElementById('myquestion').innerHTML = questions[page];

//Deal with clicking NEXT button
document.getElementById('nextBtn').addEventListener('click',renderNextPage);
var vqas = [];
function renderNextPage() {
    if(document.getElementById('myInput').value==""||document.querySelector('input[name=confidence]:checked')==null) {
        alert("You have to respond to ALL the questions on the page to move to the next one!");
        return;
    }
    var vqa = {
        image: images[page],
        question: questions[page],
        answer: document.getElementById('myInput').value,
        startInputTime: startInputTime,
        imageLoadedTime: imageLoadedTime,
        submitTime: new Date(),//the time when hit the NEXT button (submit the result of current page)
        deleteCnt: deleteCnt,
        editCnt: editCnt,
        keyTypeStream: keyTypeStream,
        timeTypeStream: timeTypeStream,
        confidence: document.querySelector('input[name=confidence]:checked').value//the selected radio value for "Do you think you were able to answer the question correctly?"
    };
    vqas.push(vqa);
    //alert(document.querySelector('input[name=confidence]:checked').value);
    //reset the feature parameters
    input.addEventListener("input", startInputHandler);
    deleteCnt = 0; //number of times of pressing delete/backspace
    editCnt = 0; //serial deleting counts for ONE
    keyTypeStream = [];
    timeTypeStream = [];

    //clear the answers of the previous input box
    document.getElementById('myInput').value = "";
    document.getElementById('option1').checked = false;
    document.getElementById('option2').checked = false;
    document.getElementById('option3').checked = false;
    var radios = document.getElementById('radioGroup').children;
    for (var i=0;i<radios.length;i++) {
        radios[i].classList.remove("active");
    }

    page ++;
    document.getElementById('pageNum').innerHTML = page.toString();
    //reload the image and question
    document.getElementById('myimage').src = images[page];
    document.getElementById('myquestion').innerHTML = questions[page];
    renderBtnIfLastPage();
}
//deal with on submit the form
document.getElementById('submitButton').addEventListener('click',formSubmit);

function formSubmit() {
    if(document.querySelector('input[name=confidence]:checked')==null) {
        alert("You have to respond to ALL the questions on the page to move to the next one!");
    }
    //add the result of the last page to vqa object
    var vqa = {
        image:images[page],
        question:questions[page],
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
    vqas.push(vqa);
    var vqaJson = JSON.stringify(vqas);
    alert(vqaJson);
    document.getElementById('vqa').value = vqaJson;
}