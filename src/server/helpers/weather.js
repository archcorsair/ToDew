const http = require('http');
const config = require('../config');

const state = '';

// Print out messages
function printMessage(temp, location, feelsLike, relHumidity, wind, lastUpdated) {
  const message = `The temperature in ${location} is ${temp}F.
Feels like: ${feelsLike}F\nRelative Humidity: ${relHumidity}\nWind: ${wind}\n${lastUpdated}`;
  console.log(message);
}
// Print out error messages
function printError(error) {
  console.error(error.message);
}
function get(searchTerm) {
  // Connect to Wunderground API
  const request = http.get(`http://api.wunderground.com/api/${config.apiKey}/conditions/q/${state || ''}/${searchTerm}.json`, (response) => {
    let body = '';
    // Read Data
    response.on('data', (chunk) => { body += chunk; });
    response.on('end', () => {
      if (response.statusCode === 200) {
        try {
          // Parse data
          const weather = JSON.parse(body);
          // Temporary way to handle Multi-result search. State search no implemented yet.
          if (weather.results || weather.response.results) {
            console.log(`Your search term (${searchTerm}) returned multiple results.
Try adding the state at the end of your search. Example: Portland OR`);
          } else if (weather.current_observation) {
            // Print data
            printMessage(weather.current_observation.temp_f,
              weather.current_observation.display_location.full,
              weather.current_observation.feelslike_f,
              weather.current_observation.relative_humidity,
              weather.current_observation.wind_string,
              weather.current_observation.observation_time
            );
          }
        } catch (error) {
          // Parse error
          printError(error);
        }
      } else {
        printError({ message: `There was an error getting the weather for ${searchTerm}.
          ${http.STATUS_CODES[response.statusCode]}` });
      }
    });
  });

  // Connection
  request.on('error', () => printError);
}

module.exports.get = get;
