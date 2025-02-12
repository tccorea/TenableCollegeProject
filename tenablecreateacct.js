//This is needed otherwise the validate passwords function will not work. 
document.addEventListener('DOMContentLoaded', function() {

    //passowrd and confirmpassword fields from tenablecollegecreateacct html page
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    //Getting the username field from the form.
    const usernameField = document.getElementById('username');

    const form = document.getElementById('form');

    //This function checks if the passwords match. I will add API calls here. 
    function validatePasswords() {
        if (passwordField.value !== confirmPasswordField.value) {
            confirmPasswordField.setCustomValidity('Passwords do not match');
        } else {
            confirmPasswordField.setCustomValidity('');
        }
    }

    //This function will check if username is an email. 
    function validateUsername() {
        if (!usernameField.value.includes('@')) {
            usernameField.setCustomValidity('Username must be an email address');
        } else {
            usernameField.setCustomValidity('');
        }
    }
 
    //This will validate the password and see if it they match. 
    passwordField.addEventListener('input', validatePasswords);
    confirmPasswordField.addEventListener('input', validatePasswords);

    //This will validate the username and see if it is an email.
    usernameField.addEventListener('input', validateUsername);

    //This is the funciton that activates when we click on create account button. 
    function createAccountCall(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        //API URL from AWS API Gateway stage for creating accounts. This is the key to getting the API Call to work. 
        const url = `https://mdxfzuptg2.execute-api.us-east-1.amazonaws.com/TenableCollegeStage/create-account?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        console.log('Request URL:', url);

        //fetch url for query parameters string. it wont work any other way. 
        fetch(url, {
            method: 'PUT', // Use PUT method as required by your API
            headers: {
                'Content-Type': 'application/json',
            }
        })   //If successful. 
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                alert('Account created successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while creating the account');
            });
    }


        //Event listener to when create account button is clicked. 
     form.addEventListener('submit', function(event) {
        //the validate password function will check if the passwords match and handlesubmit will get executed if passwords match. 
        validatePasswords();
        if (!form.checkValidity()) {
            event.preventDefault();
        } else {
            createAccountCall(event);
        }
        
    });
});