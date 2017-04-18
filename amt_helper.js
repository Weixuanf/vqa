/**
 * Created by wx on 3/5/17.
 */
//
// This method Gets URL Parameters (GUP)
//
function gup( name )
{
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
    if( results == null )
        return "";
    else
        return results[1];
}

//
// This method decodes the query parameters that were URL-encoded
//
function decode(strToDecode)
{
    var encoded = strToDecode;
    return unescape(encoded.replace(/\+/g,  " "));
}


//
// Check if the worker is PREVIEWING the HIT or if they've ACCEPTED the HIT
//
if (gup('assignmentId') == "ASSIGNMENT_ID_NOT_AVAILABLE")
{
    // If we're previewing, disable the button and give it a helpful message
    document.getElementById('submitButton').disabled = true;
    document.getElementById('submitButton').value = "You must ACCEPT the HIT before you can submit the results.";
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('nextBtn').value = "You must ACCEPT the HIT before you can submit the results.";

} else {
    var form = document.getElementById('mturk_form');
    if (document.referrer && ( document.referrer.indexOf('workersandbox') != -1) ) {
        form.action = "https://workersandbox.mturk.com/mturk/externalSubmit";
    }
}
document.getElementById('assignmentId').value = gup('assignmentId');
