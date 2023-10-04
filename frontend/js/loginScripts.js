// loginScipts.js

document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });

    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the username and password from the input fields
        const username = document.getElementById("typeEmailX").value;
        const password = document.getElementById("typePasswordX").value;

        // Check if either username or password is empty
        if (!username || !password) {
            return; // Don't proceed with the fetch request
        }

        localStorage.setItem("loggedInUser", username);

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
