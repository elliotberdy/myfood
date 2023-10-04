// loginScipts.js

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the username and password from the input fields
        const username = document.getElementById("typeEmailX").value;
        const password = document.getElementById("typePasswordX").value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Extract the userID from the response
                const userid = data.userID;
        
                // Construct the URL with the userid and redirect
                const redirectUrl = `/index/index.html?userid=${userid}`;
                window.location.href = redirectUrl;
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
          
    });
});

