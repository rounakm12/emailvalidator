document.addEventListener('DOMContentLoaded', function(){ 

var xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://mywebsite.com', true)
        xhr.withCredentials = true
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 2) {// do something}
        }
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(json)
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}




	// Valids 'email' form through regex expression
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}





	// For a GET request
	function httpGet(email, apiKey) {
		var xmlHttp = new XMLHttpRequest({mozSystem:true});
    	//const url ='https://api.github.com/users/buckyroberts'
    	const url = 'https://bpi.briteverify.com/emails.json?address=' + email + '&apikey='+apiKey;
    	xmlHttp.open( "GET", url, false ); // false for synchronous request
    	xmlHttp.send( null );
    	return xmlHttp.responseText; 
    }

    // IDs for the DOM elements
    const buttonId='submit';
    const emailFieldId='emailInput';

    const apiKey = '56271e29-22a1-4e71-8354-84cc7533f090'

    // IDs for email messages
    var invalidText = document.getElementById("invalidEmailText");
    var validText = document.getElementById("validEmailText");

    // Binds the function to the click of the button
 //  document.getElementById(buttonId).addEventListener("click", makeCorsRequest);
   document.getElementById(buttonId).addEventListener("click", myFunction);
    function myFunction() {
    	var email= document.getElementById(emailFieldId).value;
    	response=httpGet(email, apiKey);
    	response = JSON.parse(response);

    //	alert(response.error_code);
    	if (response.error_code === undefined) {
			validText.style.display = "block";
			invalidEmailAccountInvalid.style.display = "none";
			invalidEmailDomainInvalid.style.display = "none";

	} else if(response.error_code === 'email_domain_invalid'){
			validText.style.display = "none";
			invalidEmailAccountInvalid.style.display = "none";
			invalidEmailDomainInvalid.style.display = "block";


	}
	else if(response.error_code === 'email_account_invalid'){
			validText.style.display = "none";
			invalidEmailAccountInvalid.style.display = "block";
			invalidEmailDomainInvalid.style.display = "none";


	}		
    	// If the email has the correct form
    /*	if (validateEmail(email)){
    		validText.style.display = "block";
    		invalidText.style.display = "none";
    	}else{ // Email has an invalid form
    		validText.style.display = "none";
    		invalidText.style.display = "block";
    	} */
    }


}, false);

