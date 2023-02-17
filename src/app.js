const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

//setup hanlerbars engine an views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to server
app.use(express.static(publicDirectoryPath));

//setting routes for handlebar
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Bobo Fetta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "I think this the help message",
    title: "Help",
    name: "Bobo Fetta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "Mendalorian",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "There is no location",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "It is clear today",
  //   location: "New Delhi",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide search term",
    });
  }

  res.send({
    products: [],
  });
});

//404 page
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorName: "This help article does not exist",
    name: "Bug",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorName: "404 Error",
    name: "Bug",
  });
});

app.listen(3000, () => {
  console.log("server is up ");
});
