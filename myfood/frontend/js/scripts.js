/*!
    * Start Bootstrap - Freelancer v6.0.0 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });

    //search dropdown
    document.addEventListener("DOMContentLoaded", function () {
      const foodInput = document.getElementById("foodInput");
      const foodDropdown = document.getElementById("foodDropdown");
      const foodForm = document.getElementById("foodForm");
      var foodName = 'Salmon'; 
      let myChart = null;

      // Function to fetch and filter food options from the Edamam API
      function fetchAndFilterFoodOptions(query) {
          const apiKey = '8a73f4dfa676b8394d9e4191cd239244	';
          const appId = 'fbe896e7';
          const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${apiKey}`;

          // Get the computed width of the input search bar
          const inputWidth = window.getComputedStyle(foodInput).width;

          // Apply the same width to the dropdown container
          foodDropdown.style.width = inputWidth;

          fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                  // Clear previous food options
                  foodDropdown.innerHTML = '';

                  // Create a set to store unique labels and an array for sorted labels
                  const uniqueLabels = new Set();
                  const sortedLabels = [];

                  // Iterate through the data.hints array and add unique food options to the set
                  data.hints.forEach((hint) => {
                    const label = hint.food.label.replace(/,/g, '');

                    // Check if the label is not already in the set (i.e., it's unique)
                    if (!uniqueLabels.has(label)) {
                      uniqueLabels.add(label);
                      sortedLabels.push(label);
                    }
                  });

                  // Sort the sortedLabels array alphabetically
                  sortedLabels.sort();

                  // Populate the dropdown with sorted unique food options
                  sortedLabels.forEach((label) => {
                    const li = document.createElement("li");
                    const link = document.createElement("a");
                    link.classList.add("dropdown-item");
                    link.textContent = label;
                    //link.href = "#"; // You can add an action when a food option is clicked
                    li.appendChild(link);
                    foodDropdown.appendChild(li);
                  });

                  // Show the dropdown
                  foodDropdown.style.display = 'block';
                  isDropdownOpen = true;
              })
              .catch((error) => {
                  console.error("Error fetching food options:", error);
              });
      }

      // Event listener to trigger fetching food options as the user types
      foodInput.addEventListener("input", function () {
          const query = foodInput.value.trim();

          if (query.length >= 1) {
              fetchAndFilterFoodOptions(query);
          } else {
              // Hide the dropdown if the input is too short
              foodDropdown.style.display = 'none';
          }
      });

      foodInput.addEventListener("click", function () {
        const query = foodInput.value.trim();
        fetchAndFilterFoodOptions(query);
      })

      let isDropdownOpen = false;
      document.body.addEventListener("click", (event) => {
        // Check if the click target is the dropdown or a child of the dropdown
        const isClickInsideDropdown = foodDropdown.contains(event.target);
      
        // If the dropdown is open and the click is outside of it, close the dropdown
        if (isDropdownOpen && !isClickInsideDropdown) {
          foodDropdown.style.display = "none";
          isDropdownOpen = false;
        }
      });

      // SHOW FOOD OPTIONS ABOVE DROPDOWN
      // Get references to elements
      const selectedFoodsContainer = document.getElementById("selectedFoodsContainer");

      // Event listener for clicks on food options
      foodDropdown.addEventListener("click", (event) => {
        if (event.target.classList.contains("dropdown-item")) {
          // Create a button element for the selected food
          const selectedFoodButton = document.createElement("button");
          selectedFoodButton.textContent = event.target.textContent;
          selectedFoodButton.classList.add("btn", "btn-secondary","mx-1", "mt-2"); // Add Bootstrap button classes

          // Add a click event listener to remove the selected food
          selectedFoodButton.addEventListener("click", () => {
            selectedFoodsContainer.removeChild(selectedFoodButton);
          });

          // Append the selected food button to the selectedFoodsContainer
          selectedFoodsContainer.appendChild(selectedFoodButton);
          foodDropdown.style.display = "none";
          isDropdownOpen = false;
          // Clear the input field after selecting a food
          foodInput.value = "";
        }
      });

      // BUTTON ACTIVE STATE
      const buttons = document.querySelectorAll('.btn-primary');

      buttons.forEach((button) => {
          button.addEventListener('click', () => {
              // Toggle the active class
              button.classList.toggle('active');

              // Check if any other buttons have the active class and remove it
              buttons.forEach((otherButton) => {
                  if (otherButton !== button) {
                      otherButton.classList.remove('active');
                  }
              });
          });
      });

      // SUBMIT 
      // Initialize the selected mood as null
      let selectedMood = null;

      // Event listener for mood buttons
      const moodButtons = document.querySelectorAll(".mood-button");
      moodButtons.forEach((button) => {
          button.addEventListener("click", () => {
              selectedMood = button.getAttribute("data-mood");
          });
      });

      // Get references to the selected foods container and submit button
      const submitButton = document.querySelector("#foodForm button[type='submit']");

      // Initialize an array to store the selected foods
      const selectedFoods = [];

      // Event listener for the form submission
      foodForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the selected mood
        const selectedMood = document.querySelector(".mood-button.active").getAttribute("data-mood");

        // Get the text content of each selected food button and add it to the selectedFoods array
        selectedFoods.length = 0; // Clear the array
        selectedFoodsContainer.querySelectorAll(".btn-secondary").forEach(function (foodButton) {
          selectedFoods.push(foodButton.textContent);
        });

        // Create an object to hold the data to send to the backend
        const data = {
          mood: selectedMood,
          foods: selectedFoods,
        };

        // Send the data to the backend using the Fetch API
        fetch("/api/data", {
          method: "POST", // You can use POST or another HTTP method depending on your backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((responseData) => {
            // Handle the response from the backend, e.g., show a success message
            console.log("Data sent successfully:", responseData);
            resetForm();
          })
          .catch((error) => {
            // Handle errors, e.g., show an error message
            console.error("Error sending data to the backend:", error);
          });
          
          // alert("Data to be sent to the backend:\n\n" + JSON.stringify(data, null, 2));
          
      });

      function resetForm() {
        // Clear the selected foods
        const selectedFoodsContainer = document.getElementById("selectedFoodsContainer");
        selectedFoodsContainer.innerHTML = "";
      
        // Reset the food input field
        const foodInput = document.getElementById("foodInput");
        foodInput.value = "";
      
        // Deselect active mood buttons
        const moodButtons = document.querySelectorAll(".btn-primary");
        moodButtons.forEach((button) => {
          button.classList.remove("active");
        });
      }

      const dataTable = document.getElementById('data-table');

      // Fetch initial data from the server and populate the table
      fetch('/api/data')
        .then((response) => response.json())
        .then((data) => {
          populateDataTable(data);
        })
        .catch((error) => {
          console.error('Error fetching initial data:', error);
        });

      // Function to populate the table with data
      function populateDataTable(data) {
        const tbody = dataTable.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        data.reverse().forEach((item) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.food}</td>
            <td>${item.mood}</td>
          `;
          tbody.appendChild(row);
        });
      }

      
      
      fetch(`/api/mood-counts/${foodName}`)
          .then((response) => response.json())
          .then((data) => {
            // Handle the data received from the backend (mood counts for the specified food)
            console.log('Mood counts for', foodName, data);
            const moods = data.map((entry) => entry.mood);
            const counts = data.map((entry) => entry.count);
            // Sample data (replace with your actual data)
            const dataset = {
              labels: moods,
              datasets: [
                {
                  data: counts, // Replace with the actual mood counts
                  backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9900',
                  ],
                },
              ],
            };

            const cacheBuster = Date.now();
            
            // Chart.js configuration
            const config = {
              type: 'doughnut',
              data: dataset,
            };
            
            // Get the canvas element
            const ctx = document.getElementById('chart').getContext('2d');
            
            if (myChart) {
              myChart.destroy();
            }

            // Create the chart
            myChart = new Chart(ctx, { ...config, ...{ options: { cache: cacheBuster } } });
          })
          .catch((error) => {
            console.error('Error fetching mood counts:', error);
          });


      // Example: Trigger data fetching and table update a few seconds after submitting food data
      submitButton.addEventListener('click', () => {
        // Handle food data submission here (e.g., sending data to the server)

        // After the submission, fetch and update the table with the latest data after a delay
        setTimeout(() => {
          fetch('/api/data')
            .then((response) => response.json())
            .then((data) => {
              populateDataTable(data);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }, 500); 

        setTimeout(() => {
          fetch(`/api/mood-counts/${foodName}`)
            .then((response) => response.json())
            .then((data) => {
              // Handle the data received from the backend (mood counts for the specified food)
              console.log('Mood counts for', foodName, data);
              const moods = data.map((entry) => entry.mood);
              const counts = data.map((entry) => entry.count);
              // Sample data (replace with your actual data)
              const dataset = {
                labels: moods,
                datasets: [
                  {
                    data: counts, // Replace with the actual mood counts
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF',
                      '#FF9900',
                    ],
                  },
                ],
              };
              const cacheBuster = Date.now();

              // Chart.js configuration
              const config = {
                type: 'doughnut',
                data: dataset,
              };
              
              // Get the canvas element
              const ctx = document.getElementById('chart').getContext('2d');
              
              if (myChart) {
                myChart.destroy();
              }

              // Create the chart
              myChart = new Chart(ctx, { ...config, ...{ options: { cache: cacheBuster } } });
            })
            .catch((error) => {
              console.error('Error fetching mood counts:', error);
            });
          }, 500); 
      });

      const foodInputChart = document.getElementById("foodInputChart");
      const foodDropdownChart = document.getElementById("foodDropdownChart");

      // Function to fetch and filter food options from the Edamam API
      function fetchAndFilterFoodOptionsChart(query) {
        const apiKey = '8a73f4dfa676b8394d9e4191cd239244	';
        const appId = 'fbe896e7';
        const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${apiKey}`;

        // Get the computed width of the input search bar
        const inputWidth = window.getComputedStyle(foodInputChart).width;

        // Apply the same width to the dropdown container
        foodDropdownChart.style.width = inputWidth;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Clear previous food options
                foodDropdownChart.innerHTML = '';

                // Create a set to store unique labels and an array for sorted labels
                const uniqueLabels = new Set();
                const sortedLabels = [];

                // Iterate through the data.hints array and add unique food options to the set
                data.hints.forEach((hint) => {
                  const label = hint.food.label.replace(/,/g, '');

                  // Check if the label is not already in the set (i.e., it's unique)
                  if (!uniqueLabels.has(label)) {
                    uniqueLabels.add(label);
                    sortedLabels.push(label);
                  }
                });

                // Sort the sortedLabels array alphabetically
                sortedLabels.sort();

                // Populate the dropdown with sorted unique food options
                sortedLabels.forEach((label) => {
                  const li = document.createElement("li");
                  const link = document.createElement("a");
                  link.classList.add("dropdown-item");
                  link.textContent = label;
                  //link.href = "#"; // You can add an action when a food option is clicked
                  li.appendChild(link);
                  foodDropdownChart.appendChild(li);
                });

                // Show the dropdown
                foodDropdownChart.style.display = 'block';
                isDropdownOpenChart = true;
            })
            .catch((error) => {
                console.error("Error fetching food options:", error);
            });
      } 

      // Event listener to trigger fetching food options as the user types
      foodInputChart.addEventListener("input", function () {
        const query = foodInputChart.value.trim();

        if (query.length >= 1) {
            fetchAndFilterFoodOptionsChart(query);
        } else {
            // Hide the dropdown if the input is too short
            foodDropdownChart.style.display = 'none';
        }
      });

      foodInputChart.addEventListener("click", function () {
        const query = foodInputChart.value.trim();
        fetchAndFilterFoodOptionsChart(query);
      })

      let isDropdownOpenChart = false;
      document.body.addEventListener("click", (event) => {
        // Check if the click target is the dropdown or a child of the dropdown
        const isClickInsideDropdown = foodDropdownChart.contains(event.target);
      
        // If the dropdown is open and the click is outside of it, close the dropdown
        if (isDropdownOpenChart && !isClickInsideDropdown) {
          foodDropdownChart.style.display = "none";
          isDropdownOpenChart = false;
        }
      });

      // SHOW FOOD OPTION BELOW DROPDOWN
      // Get references to elements
      const selectedFoodsContainerChart = document.getElementById("selectedFoodsContainerChart");

      let selectedFoodButton;
      selectedFoodButton = document.createElement("button");
      selectedFoodButton.textContent = foodName;
      selectedFoodButton.classList.add("btn", "btn-secondary", "btn-lg", "mx-auto", "mt-2");
      selectedFoodsContainerChart.appendChild(selectedFoodButton);

      foodDropdownChart.addEventListener("click", (event) => {
        if (event.target.classList.contains("dropdown-item")) {
          const selectedFood = event.target.textContent;

          if (selectedFoodButton) {
            // If a button already exists, update its text content
            selectedFoodButton.textContent = selectedFood;
          } else {
            // If no button exists, create a new one
            selectedFoodButton = document.createElement("button");
            selectedFoodButton.textContent = selectedFood;
            selectedFoodButton.classList.add("btn", "btn-secondary", "btn-lg", "mx-auto", "mt-2");

            // Add a click event listener to remove the selected food
            selectedFoodButton.addEventListener("click", () => {
              selectedFoodsContainerChart.removeChild(selectedFoodButton);
              selectedFoodButton = null; // Reset to allow selecting a new food
            });

            // Append the selected food button to the selectedFoodsContainer
            selectedFoodsContainerChart.appendChild(selectedFoodButton);
          }

          foodDropdownChart.style.display = "none";
          isDropdownOpenChart = false;
          // Clear the input field after selecting a food
          foodInputChart.value = "";
          foodName = selectedFood;
          setTimeout(() => {
            fetch(`/api/mood-counts/${foodName}`)
              .then((response) => response.json())
              .then((data) => {
                // Handle the data received from the backend (mood counts for the specified food)
                console.log('Mood counts for', foodName, data);
                const moods = data.map((entry) => entry.mood);
                const counts = data.map((entry) => entry.count);
                // Sample data (replace with your actual data)
                const dataset = {
                  labels: moods,
                  datasets: [
                    {
                      data: counts, // Replace with the actual mood counts
                      backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9900',
                      ],
                    },
                  ],
                };
                const cacheBuster = Date.now();
                
                // Chart.js configuration
                const config = {
                  type: 'doughnut',
                  data: dataset,
                };
                
                // Get the canvas element
                const ctx = document.getElementById('chart').getContext('2d');
                
                if (myChart) {
                  myChart.destroy();
                }

                // Create the chart
                myChart = new Chart(ctx, { ...config, ...{ options: { cache: cacheBuster } } });
              })
              .catch((error) => {
                console.error('Error fetching mood counts:', error);
              });
            }, 500); 
        }
      });






    });
  
  })(jQuery); // End of use strict
  