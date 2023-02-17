const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6acfee834617bc18283f8e8732f2e713`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, `Weather summary is ${body.weather[0].main}`);
    }
  });
};

module.exports = forecast;
