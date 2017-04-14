/**
 * Created by wx on 4/13/17.
 */

document.getElementById('nextBtn').addEventListener('click',renderNextPage);

function renderNextPage() {
    document.getElementById("myInput").type = "text";
    document.getElementById("myInput").focus();
    document.getElementById('nextBtn').style.display = 'none'; //hide the NEXT button if it's the last page
    document.getElementById('submitButton').type = 'submit'; //display the SUBMIT button at the last page

}