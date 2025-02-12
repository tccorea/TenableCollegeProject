document.addEventListener('DOMContentLoaded', function() {

    //Variable for the form.
    const form = document.getElementById('form');
    
    //This function checks or validates the creds and makes the API call. 
    function loginCall(event) { 

    //Getting the username and password fields from the form.
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    const url = `https://mdxfzuptg2.execute-api.us-east-1.amazonaws.com/tenableCollegeLogin/login-authentication?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    console.log('Request URL:', url);
    
    //Adding cors and making sure that headers match the API Gateway.
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    
        .then((response) => response.json())
        .then((data) => {

            console.log('Success:', data);
            
            if(data === 'Login credentials are valid'){
                window.location.href = 'tenableLab.html'; //Redirects to the tenableLab.html page.
                form.reset(); // Resets the form in the tenable login html page.
            }
            else{
                alert(data);//Shows the API response . Results of checking the credentials. 
                form.reset(); // Resets the form in the tenable login html page.
            }
             

        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Login failed');
            form.reset(); 
        });

    }

    //Event listener to when Login button is clicked. 
    form.addEventListener('submit', function(event) {
    
        event.preventDefault()

    //the validate password function from above. 
    console.log('Login button clicked');
    if (!form.checkValidity()) {
        event.preventDefault();
    }
    else {
        event.preventDefault()
        loginCall(event);
    }

    });



});