# myfood
## Elliot Berdy

http://www.elliotberdy.com

Thank you to https://startbootstrap.com/themes/freelancer for the starting template :)

### About MyFood

MyFood is a personal project of mine that can track the food I am eating and how I am feeling after that food. As an active and health conscious person, I have always been interested in what foods are best for me personally, but it is near impossible to mentally keep track of these trends. I therefore developed MyFood to keep track of all of this for me and allow me to see trends in how certain foods make me feel. This is an ongoing project that is not yet done, but feel free to play around with it!

### How To Use The Website

There are three main sections of the website: Input, Analyze, My Data. 

1. Input

In this section you can input what foods you have eaten and how you are feeling. Currently there are six options for how you are feeling. You can enter as many foods as you want per submission, but you can only choose one feeling per submission. If you would like to remove a food that you selected, just click on that food and it will be deleted. Once you have selected what you wish to input, click the submit button and the selected foods and mood will be inputted into the database. Currently there is only one communal database, so don't be surprised if you see previous inputs that are not yours!

2. Analyze

In this section you can visualize some trends in your food/mood data. The first chart allows you to select a given food and see the distribution of feelings you have had when eating that food. For example, if you select salmon, it will show you a doughnut chart displaying how many times you have felt amazing, average, tired, etc. after eating salmon.

The second chart allows you to select a specific mood (i.e. Tired) and see the five foods that have the most counts for that mood. This chart allows you to know which foods make you feel a certain way to either eliminate those foods or eat more of them!

If either chart is empty, then there are currently no entries for that food or mood.

3. My Data

This section is a table that shows all of your previous food/mood inputs.

### Shortcomings and Next Steps

As mentioned earlier, currently there is only one communal database. Therefore, if there are multiple users trying out MyFood, one person cannot track only their own food. This is obviously not ideal so the next upgrade I want to make is to create a login system that enables users to have their own database and track their own food. 

Another imnprovement I would like to make is to add more options for how the user is feeling. This is an easy improvement, although it then requires more data to see interesting trends. 

Lastly, I would like to try and get more from the data. For example, I want to sort the foods into categories (i.e. fruits, vegetables, etc.) and apply some ML algorithms to look for trends in how certain food categories may make the user feel. I am also interested in looking for trends centered around what time of day the food was eaten. While these improvements are the most exciting to me, the login system is more central to the use of the application and will therefore be my first priority. 

### Technologies Used

MyFood is a fullstack web application that uses HTML, CSS, JavaScript, Bootstrap, Node.js, and SQLite. MyFood also uses the Edamam API to populate the dropdowns with a list of foods.