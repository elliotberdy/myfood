/*!
 * Start Bootstrap - Freelancer v6.0.0 (https://startbootstrap.com/themes/freelancer)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
 */

// Used this as a starting template ^^

(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 71,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 80,
  });

  // Collapse Navbar
  var navbarCollapse = function () {
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
  $(function () {
    $("body")
      .on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass(
          "floating-label-form-group-with-value",
          !!$(e.target).val()
        );
      })
      .on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
      })
      .on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
  });

  document.addEventListener("DOMContentLoaded", function () {
    //food input elements
    const foodInput = document.getElementById("foodInput");
    const foodDropdown = document.getElementById("foodDropdown");
    const foodForm = document.getElementById("foodForm");

    //mood button value
    let selectedMood = null;

    //initial chart values
    var foodName = "Salmon";
    var moodName = "Tired";

    // chart.js instances
    let myChart = null;
    let myChart2 = null;

    const username = localStorage.getItem("loggedInUser");
    const welcomeMessage = document.getElementById("welcome-message");
    const newMessage = `Hi ${username}! <br><br> Welcome to MyFood! Check out the GitHub link at the bottom of the page for instructions on how to use this website and more info on this project.`;
    welcomeMessage.innerHTML = newMessage;

    // Function to fetch and filter food options from the Edamam API
    function fetchAndFilterFoodOptions(query) {
      const apiKey = "8a73f4dfa676b8394d9e4191cd239244	";
      const appId = "fbe896e7";
      const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${apiKey}`;

      const inputWidth = window.getComputedStyle(foodInput).width;
      // Apply the same width to the dropdown container
      foodDropdown.style.width = inputWidth;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Clear previous food options
          foodDropdown.innerHTML = "";

          const uniqueLabels = new Set();
          const sortedLabels = [];

          // Iterate through the data.hints array and add unique food options to the set
          data.hints.forEach((hint) => {
            const label = hint.food.label.replace(/,/g, "");

            // Check if the label is not already in the set
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
            li.appendChild(link);
            foodDropdown.appendChild(li);
          });

          // Show the dropdown
          foodDropdown.style.display = "block";
          isDropdownOpen = true;
        })
        .catch((error) => {
          console.error("Error fetching food options:", error);
        });
    }

    //FOOD DROPDOWN IN INPUT SECTION
    // Event listener to trigger fetching food options as user types
    foodInput.addEventListener("input", function () {
      const query = foodInput.value.trim();

      if (query.length >= 1) {
        fetchAndFilterFoodOptions(query);
      } else {
        // Hide the dropdown if the input is too short
        foodDropdown.style.display = "none";
      }
    });

    foodInput.addEventListener("click", function () {
      const query = foodInput.value.trim();
      fetchAndFilterFoodOptions(query);
    });

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

    // SHOW FOOD OPTIONS THAT WERE CLICKED ABOVE DROPDOWN
    const selectedFoodsContainer = document.getElementById(
      "selectedFoodsContainer"
    );

    // Event listener for clicks on food options
    foodDropdown.addEventListener("click", (event) => {
      if (event.target.classList.contains("dropdown-item")) {
        // Create a button element for the selected food
        const selectedFoodButton = document.createElement("button");
        selectedFoodButton.textContent = event.target.textContent;
        selectedFoodButton.classList.add(
          "btn",
          "btn-secondary",
          "mx-1",
          "mt-2"
        );

        // Add a click event listener to remove button
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

    // ENSURE ONE AND ONLY ONE BUTTON IS ACTIVE IF CLICKED ON
    const buttons = document.querySelectorAll(".btn-primary");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Toggle the active class
        button.classList.toggle("active");

        // Check if any other buttons have the active class and remove it
        buttons.forEach((otherButton) => {
          if (otherButton !== button) {
            otherButton.classList.remove("active");
          }
        });
      });
    });

    // SUBMIT BUTTON FOR INPUT SECTION
    // Event listener for mood buttons
    const moodButtons = document.querySelectorAll(".mood-button");
    moodButtons.forEach((button) => {
      button.addEventListener("click", () => {
        selectedMood = button.getAttribute("data-mood");
      });
    });

    // Get references to the selected foods container and submit button
    const submitButton = document.querySelector(
      "#foodForm button[type='submit']"
    );
    const selectedFoods = [];

    // Parse the URL to get query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userid = urlParams.get("userid");
    console.log("User ID:", userid);

    // Event listener for the form submission
    foodForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Get the selected mood
      const selectedMood = document
        .querySelector(".mood-button.active")
        .getAttribute("data-mood");

      // Get the text content of each selected food button and add it to the selectedFoods array
      selectedFoods.length = 0;
      selectedFoodsContainer
        .querySelectorAll(".btn-secondary")
        .forEach(function (foodButton) {
          selectedFoods.push(foodButton.textContent);
        });

      // Create an object to hold the data to send to the backend
      const data = {
        mood: selectedMood,
        foods: selectedFoods,
        userid: userid,
      };

      // INSERT DATA TO DATABASE IN BACKEND
      // Send the data to the backend to put into database
      fetch("/api/data", {
        method: "POST",
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
          console.log("Data sent successfully:", responseData);
          resetForm();
        })
        .catch((error) => {
          console.error("Error sending data to the backend:", error);
        });
    });

    // RESET INPUT SECTION AFTER SUBMIT BUTTON IS PRESSED
    function resetForm() {
      // Clear the selected foods
      const selectedFoodsContainer = document.getElementById(
        "selectedFoodsContainer"
      );
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

    // MYDATA TABLE
    const dataTable = document.getElementById("data-table");

    // Fetch initial data from the server and populate the table

    fetch(`/api/data/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        populateDataTable(data);
      })
      .catch((error) => {
        console.error("Error fetching initial data:", error);
      });

    function populateDataTable(data) {
      const tbody = dataTable.querySelector("tbody");
      tbody.innerHTML = "";

      if (data.length === 0) {
        const noDataMessageRow = document.createElement("tr");
        noDataMessageRow.innerHTML = `
              <td colspan="2">No data available yet</td>
            `;
        tbody.appendChild(noDataMessageRow);
      } else {
        data.reverse().forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${item.food}</td>
                <td>${item.mood}</td>
              `;
          tbody.appendChild(row);
        });
      }
    }

    const plugin = {
      id: "emptyDoughnut",
      afterDraw(chart, args, options) {
        const { datasets } = chart.data;
        const { color, width, radiusDecrease } = options;
        let hasData = false;

        for (let i = 0; i < datasets.length; i += 1) {
          const dataset = datasets[i];
          hasData |= dataset.data.length > 0;
        }

        if (!hasData) {
          const {
            chartArea: { left, top, right, bottom },
            ctx,
          } = chart;
          const centerX = (left + right) / 2;
          const centerY = (top + bottom) / 2;
          const r = Math.min(right - left, bottom - top) / 2;

          ctx.beginPath();
          ctx.lineWidth = width || 2;
          ctx.strokeStyle = color || "rgba(0, 0, 0, 0.5)";
          ctx.arc(centerX, centerY, r - radiusDecrease || 0, 0, 2 * Math.PI);
          ctx.stroke();
        }
      },
    };

    // CHART 1 - MOOD COUNT FOR GIVEN FOOD
    fetch(`/api/mood-counts/${userid}/${foodName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Mood counts for", foodName, data);
        const moods = data.map((entry) => entry.mood);
        const counts = data.map((entry) => entry.count);

        const dataset = {
          labels: moods,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "#FF6384", // Red
                "#36A2EB", // Blue
                "#FFCE56", // Yellow
                "#4BC0C0", // Teal
                "#9966FF", // Purple
                "#FF9900", // Orange
              ],
            },
          ],
        };

        const cacheBuster = Date.now();

        const config = {
          type: "doughnut",
          data: dataset,
          options: {
            plugins: {
              emptyDoughnut: {
                color: "#006f1f",
                width: 4,
                radiusDecrease: 20,
              },
            },
            legend: {
              display: true,
              position: "top", // Adjust the legend position as needed
            },
            responsive: true,
            //maintainAspectRatio: false,
            cache: cacheBuster,
          },
          plugins: [plugin],
        };

        const ctx = document.getElementById("chart").getContext("2d");

        if (myChart) {
          myChart.destroy();
        }

        myChart = new Chart(ctx, config);
      })
      .catch((error) => {
        console.error("Error fetching mood counts:", error);
      });

    // CHART 2 FUNCTION
    // Function to fetch and update data for the top foods by mood as a bar chart
    function updateTopFoodsByMoodDoughnutChart(mood) {
      fetch(`/api/top-foods-by-mood/${userid}/${mood}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Top foods by", mood, data);
          const foods = data.map((entry) => entry.food);
          const moodCounts = data.map((entry) => entry.moodcount);
          console.log(foods, moodCounts);
          const foodColors = [
            "#FF6384", // Red
            "#36A2EB", // Blue
            "#FFCE56", // Yellow
            "#4BC0C0", // Teal
            "#9966FF", // Purple
            "#FF9900", // Orange
          ];

          const dataset = {
            labels: foods,
            datasets: [
              {
                data: moodCounts,
                backgroundColor: foodColors,
              },
            ],
          };

          const cacheBuster = Date.now();

          const config = {
            type: "doughnut",
            data: dataset,
            options: {
              plugins: {
                emptyDoughnut: {
                  color: "#006f1f",
                  width: 4,
                  radiusDecrease: 20,
                },
              },
              legend: {
                display: true,
                position: "top", // Adjust the legend position as needed
              },
              responsive: true,
              //maintainAspectRatio: false,
              cache: cacheBuster,
            },
            plugins: [plugin],
          };

          const ctx = document.getElementById("chart-2").getContext("2d");

          if (myChart2) {
            myChart2.destroy();
          }

          myChart2 = new Chart(ctx, config);
        })
        .catch((error) => {
          console.error("Error fetching top foods by mood:", error);
        });
    }
    updateTopFoodsByMoodDoughnutChart("Tired");

    // UPDATE CHARTS AND TABLE AFTER SUBMIT BUTTON IS PUSHED
    submitButton.addEventListener("click", () => {
      setTimeout(() => {
        fetch(`/api/data/${userid}`)
          .then((response) => response.json())
          .then((data) => {
            populateDataTable(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, 500);

      setTimeout(() => {
        fetch(`/api/mood-counts/${userid}/${foodName}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Mood counts for", foodName, data);
            const moods = data.map((entry) => entry.mood);
            const counts = data.map((entry) => entry.count);
            const dataset = {
              labels: moods,
              datasets: [
                {
                  data: counts,
                  backgroundColor: [
                    "#FF6384", // Red
                    "#36A2EB", // Blue
                    "#FFCE56", // Yellow
                    "#4BC0C0", // Teal
                    "#9966FF", // Purple
                    "#FF9900", // Orange
                  ],
                },
              ],
            };
            const cacheBuster = Date.now();

            const config = {
              type: "doughnut",
              data: dataset,
              options: {
                plugins: {
                  emptyDoughnut: {
                    color: "#006f1f",
                    width: 4,
                    radiusDecrease: 20,
                  },
                },
                legend: {
                  display: true,
                  position: "top", // Adjust the legend position as needed
                },
                responsive: true,
                //maintainAspectRatio: false,
                cache: cacheBuster,
              },
              plugins: [plugin],
            };

            const ctx = document.getElementById("chart").getContext("2d");

            if (myChart) {
              myChart.destroy();
            }

            myChart = new Chart(ctx, config);
          })
          .catch((error) => {
            console.error("Error fetching mood counts:", error);
          });
      }, 500);

      setTimeout(() => {
        console.log(moodName);
        updateTopFoodsByMoodDoughnutChart(moodName);
      }, 500);
    });

    // FOOD DROPDOWN FOR CHART 1
    const foodInputChart = document.getElementById("foodInputChart");
    const foodDropdownChart = document.getElementById("foodDropdownChart");

    // Function to fetch and filter food options from the Edamam API
    function fetchAndFilterFoodOptionsChart(query) {
      const apiKey = "8a73f4dfa676b8394d9e4191cd239244	";
      const appId = "fbe896e7";
      const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${apiKey}`;

      const inputWidth = window.getComputedStyle(foodInputChart).width;
      // Apply the same width to the dropdown container
      foodDropdownChart.style.width = inputWidth;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          foodDropdownChart.innerHTML = "";

          const uniqueLabels = new Set();
          const sortedLabels = [];

          data.hints.forEach((hint) => {
            const label = hint.food.label.replace(/,/g, "");

            if (!uniqueLabels.has(label)) {
              uniqueLabels.add(label);
              sortedLabels.push(label);
            }
          });

          sortedLabels.sort();

          sortedLabels.forEach((label) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.classList.add("dropdown-item");
            link.textContent = label;
            li.appendChild(link);
            foodDropdownChart.appendChild(li);
          });

          // Show the dropdown
          foodDropdownChart.style.display = "block";
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
        foodDropdownChart.style.display = "none";
      }
    });

    foodInputChart.addEventListener("click", function () {
      const query = foodInputChart.value.trim();
      fetchAndFilterFoodOptionsChart(query);
    });

    let isDropdownOpenChart = false;
    document.body.addEventListener("click", (event) => {
      const isClickInsideDropdown = foodDropdownChart.contains(event.target);

      if (isDropdownOpenChart && !isClickInsideDropdown) {
        foodDropdownChart.style.display = "none";
        isDropdownOpenChart = false;
      }
    });

    const moodInputChart = document.getElementById("moodInputChart");
    const moodDropdownChart = document.getElementById("moodDropdownChart");
    let isDropdownOpenMood = false;

    // DROPDOWN FOR MOOD CHART 2
    function populateMoodDropdown() {
      const inputWidth = window.getComputedStyle(moodInputChart).width;
      moodDropdownChart.style.width = inputWidth;

      // Define the mood options
      const moods = [
        "Tired",
        "Bloated",
        "Pain",
        "Normal",
        "Energized",
        "Amazing",
      ];

      moodDropdownChart.innerHTML = "";

      // Populate the dropdown with mood options
      moods.forEach((mood) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.classList.add("dropdown-item");
        link.textContent = mood;
        li.appendChild(link);
        moodDropdownChart.appendChild(li);
      });

      // Show the dropdown
      moodDropdownChart.style.display = "block";
      isDropdownOpenMood = true;
    }

    // Event listener to trigger displaying the dropdown when the input is clicked
    moodInputChart.addEventListener("click", function () {
      populateMoodDropdown();
    });

    // Event listener to close the dropdown when clicking outside of it
    document.body.addEventListener("click", (event) => {
      // Check if the click target is the form, the dropdown, or their children
      const isClickInsideForm = moodInputChart.contains(event.target);
      const isClickInsideDropdown = moodDropdownChart.contains(event.target);

      if (!isClickInsideForm && !isClickInsideDropdown && isDropdownOpenMood) {
        moodDropdownChart.style.display = "none";
        isDropdownOpenMood = false;
      }
    });

    // SHOW FOOD OPTION BELOW DROPDOWN
    const selectedFoodsContainerChart = document.getElementById(
      "selectedFoodsContainerChart"
    );

    let selectedFoodButton;
    selectedFoodButton = document.createElement("button");
    selectedFoodButton.textContent = foodName;
    selectedFoodButton.classList.add(
      "btn",
      "btn-secondary",
      "btn-lg",
      "mx-auto",
      "mt-2"
    );
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
          selectedFoodButton.classList.add(
            "btn",
            "btn-secondary",
            "btn-lg",
            "mx-auto",
            "mt-2"
          );

          // Add a click event listener to remove the selected food
          selectedFoodButton.addEventListener("click", () => {
            selectedFoodsContainerChart.removeChild(selectedFoodButton);
            selectedFoodButton = null;
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
          fetch(`/api/mood-counts/${userid}/${foodName}`)
            .then((response) => response.json())
            .then((data) => {
              console.log("Mood counts for", foodName, data);
              const moods = data.map((entry) => entry.mood);
              const counts = data.map((entry) => entry.count);
              const dataset = {
                labels: moods,
                datasets: [
                  {
                    data: counts,
                    backgroundColor: [
                      "#FF6384", // Red
                      "#36A2EB", // Blue
                      "#FFCE56", // Yellow
                      "#4BC0C0", // Teal
                      "#9966FF", // Purple
                      "#FF9900", // Orange
                    ],
                  },
                ],
              };
              const cacheBuster = Date.now();

              const config = {
                type: "doughnut",
                data: dataset,
                options: {
                  plugins: {
                    emptyDoughnut: {
                      color: "#006f1f",
                      width: 4,
                      radiusDecrease: 20,
                    },
                  },
                  legend: {
                    display: true,
                    position: "top", // Adjust the legend position as needed
                  },
                  responsive: true,
                  //maintainAspectRatio: false,
                  cache: cacheBuster,
                },
                plugins: [plugin],
              };

              const ctx = document.getElementById("chart").getContext("2d");

              if (myChart) {
                myChart.destroy();
              }

              myChart = new Chart(ctx, config);
            })
            .catch((error) => {
              console.error("Error fetching mood counts:", error);
            });
        }, 500);
      }
    });

    const selectedMoodsContainerChart = document.getElementById(
      "selectedMoodsContainerChart"
    );
    let selectedMoodButton;
    selectedMoodButton = document.createElement("button");
    selectedMoodButton.textContent = moodName;
    selectedMoodButton.classList.add(
      "btn",
      "btn-secondary",
      "btn-lg",
      "mx-auto",
      "mt-2"
    );
    selectedMoodsContainerChart.appendChild(selectedMoodButton);

    moodDropdownChart.addEventListener("click", (event) => {
      if (event.target.classList.contains("dropdown-item")) {
        const selectedMood = event.target.textContent;

        if (selectedMoodButton) {
          // If a button already exists, update its text content
          selectedMoodButton.textContent = selectedMood;
        } else {
          // If no button exists, create a new one
          selectedMoodButton = document.createElement("button");
          selectedMoodButton.textContent = selectedMood;
          selectedMoodButton.classList.add(
            "btn",
            "btn-secondary",
            "btn-lg",
            "mx-auto",
            "mt-2"
          );

          // Add a click event listener to remove the selected food
          selectedMoodButton.addEventListener("click", () => {
            selectedMoodsContainerChart.removeChild(selectedMoodButton);
            selectedMoodButton = null; // Reset to allow selecting a new food
          });

          // Append the selected food button to the selectedFoodsContainer
          selectedMoodsContainerChart.appendChild(selectedMoodButton);
        }

        moodDropdownChart.style.display = "none";
        isDropdownOpenMood = false;
        // Clear the input field after selecting a food
        moodInputChart.value = "";
        moodName = selectedMood;
        setTimeout(() => {
          console.log(moodName);
          updateTopFoodsByMoodDoughnutChart(moodName);
        }, 500);
      }
    });
  });
})(jQuery); // End of use strict
