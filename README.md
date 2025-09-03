# internsala_project3
weather forecast application using JavaScript, HTML, and CSS. This application retrieve weather data from an API display it in a user-friendly interface, and provide essential features such as location-based forecasts, current weather conditions, and extended forecasts

# setup Instruction
1. First check package.json file exist or not.
2. give command "npm install" to download all package.
3. Now simply start project using "npm start".

# How Project was made
1. Basic Project Structure - visit APP.js
2. Integration with Weather API - visit App.js line-62 and line-117.
3. Allow users to search for weather forecasts by city name - visit App.js--->line-240.
4. Allow users to search weather forecasts for their current location - visit App.js--->line-301
5. Add user interaction features such as buttons and input fields for selecting
locations and viewing different weather data - visit App.js ---> line 328 - 310
6. Implement a dropdown menu for recently searched cities - visit App.js ---> line 255 - 289
7. Implement event listeners to handle user interactions and update the UI accordingly - visit App.js ---> all state's and functions
8. Use appropriate icons or graphics to represent weather conditions (e.g., sunny, cloudy, rainy) - visit assets/GIFs and assets/Images, used at assets/shortcode/weathers.js
9. Implement functionality to display extended weather forecasts for multiple
days - App.js ---> line 442 - 564
10. Organize forecast data into a visually appealing and easy-to-read format - App.js ---> line 371 - 440
11. Handle API errors gracefully and display appropriate error messages to
users - App.js ---> line 70 - 108

# Product Description
1. Use Simply visit the page, at initially user location coordinate is fetched and as per that coords weather detail is shown.
2. Now, User can search for for different cities weather, their searches will be stored in search history as a list with the help of session storage.
3. Current Location button is provided, so that user can switch to their current location any time.
4. User can see current weather forecast and next 4 days weather forecast.
5. Weather detail is provided in two formats in short and with fully described with information such as wind flow, humidity,cloud,sun rise,temp,sun set.
6. Weather is nicely described with GIF,icon, emoji, and background wallpaper.
7. Their is Toggle button to switch between Temperature Unit's.
8. Initially Next 4 Days Forecast is represented in short form with basic details like date,icon and temperature, their is down arrow for each day forecast to see details of that day forecast.
9. Their is refresh button, that simply works on logic, that when search input field is empty it will refresh user current location and when their is city entered in input field, it will refresh weather condition for that city.
# Git Logs
Their i separate file for logs named as "git-log-txt"