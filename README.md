# MyFood

## Elliot Berdy 

Project Website: [http://www.elliotberdy.com ](https://elliotberdy.onrender.com/)

Thank you to https://startbootstrap.com/themes/freelancer for the starting template :)

### About MyFood

MyFood is a personal project of mine that can track the food a user is eating and how they are feeling after that food. As an active and health conscious person, I have always been interested in what foods are best for me personally, but it is near impossible to mentally keep track of these trends. I therefore developed MyFood to keep track of all of this for me and allow me to see trends in how certain foods make me feel. This is an ongoing project that is not yet done, but feel free to play around with it!

### How To Use The Website

Login Page: Enter a username and password to get started. As long as the username/password combination is unique, you are good to go!

Once you are logged on, there are three main sections of the website: Input, Analyze, My Data. 

1. Input

    In this section you can input what foods you have eaten and how you are feeling. Currently there are six options for how you are feeling. You can enter as many foods as you want per submission, but you can only choose one feeling per submission. If you would like to remove a food that you selected, just click on that food and it will be deleted. Once you have selected what you wish to input, click the submit button and the selected foods and mood will be inputted into the database. 

2. Analyze

    In this section you can visualize some trends in your food/mood data. The first chart allows you to select a given food and see the distribution of feelings you have had when eating that food. For example, if you select salmon, it will show you a doughnut chart displaying how many times you have felt amazing, average, tired, etc. after eating salmon.

    The second chart allows you to select a specific mood (i.e. Tired) and see the five foods that have the most counts for that mood. This chart allows you to know which foods make you feel a certain way to either eliminate those foods or eat more of them!

    If either chart is empty, then there are currently no entries for that food or mood.

3. My Data

    This section is a table that shows all of your previous food/mood inputs.

### Shortcomings and Next Steps

I would like to create a public API for MyFood, enabling other developers to utilize and build upon what I have created. 

I would also like to add more options for how the user is feeling. This is an easy improvement, although it will then require more input data to see interesting trends. 

Lastly, I want to get more from the data. For example, I want to sort the foods into categories (i.e. fruits, vegetables, etc.) and apply some ML to look for trends in how certain food categories may make the user feel. I am also interested in looking for trends centered around what time of day the food was eaten. 

### Technologies Used

MyFood is a fullstack web application that uses HTML, CSS, JavaScript, Bootstrap, Node.js, Express.js, PostgresSQL, and Body Parser. MyFood also uses the Edamam API to populate the dropdowns with a list of foods.
