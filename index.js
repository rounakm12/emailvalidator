document.addEventListener('DOMContentLoaded', function(){ 

	// Valids 'email' form through regex expression
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

    // IDs for the DOM elements
    const buttonId='submit';
    const emailFieldId='emailInput';
    const apiKey = '56271e29-22a1-4e71-8354-84cc7533f090'

    // IDs for email messages
    var invalidText = document.getElementById("invalidEmailText");
    var validText = document.getElementById("validEmailText");
  
    // Binds the function to the click of the button
   document.getElementById(buttonId).addEventListener("click", myFunction);
    function myFunction() {
    	var email= document.getElementById(emailFieldId).value;
		var url = 'https://bpi.briteverify.com/emails.json?address=' + email + '&apikey=' + apiKey;

		if (validateEmail(email)) {
			loadJSONP(
				url,
				function(response) {
					if (response.error_code === undefined) {
						validText.style.display = "block";
						invalidEmailAccountInvalid.style.display = "none";
						invalidEmailDomainInvalid.style.display = "none";
			
					} else if(response.status == 'invalid'){
						validText.style.display = "none";
						if (response.error_code == 'email_domain_invalid') {
							invalidEmailAccountInvalid.style.display = "none";
							invalidEmailDomainInvalid.style.display = "block";
						} else {
							invalidEmailAccountInvalid.style.display = "block";
							invalidEmailDomainInvalid.style.display = "none";
						}
					}
				}
			);
		} else {
			alert("Please enter a well formed email address, e.g. example@abc.com");
			validText.style.display = "none";
			invalidEmailAccountInvalid.style.display = "none";
			invalidEmailDomainInvalid.style.display = "none";
		}
		
	}

	// To allow Cross-Origin
	var loadJSONP = (function(){
		var unique = 0;
		return function(url, callback, context) {
		  // INIT
		  var name = "_jsonp_" + unique++;
		  if (url.match(/\?/)) url += "&callback="+name;
		  else url += "?callback="+name;
		  
		  // Create script
		  var script = document.createElement('script');
		  script.type = 'text/javascript';
		  script.src = url;
		  
		  // Setup handler
		  window[name] = function(data){
			callback.call((context || window), data);
			document.getElementsByTagName('head')[0].removeChild(script);
			script = null;
			delete window[name];
		  };
		  
		  // Load JSON
		  document.getElementsByTagName('head')[0].appendChild(script);
		};
	  })();

}, false);

