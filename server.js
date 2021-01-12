// Required dependencies
var express = require("express");
var exphbs = require("express-handlebars");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Create express app instance.
var app = express();

// Serve static content for the app from the public folder
app.use(express.static("public"));

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Import routes and give the server access to them
var routes = require('./controllers/burgers_controllers.js');
app.use(routes);

// Start our server so it can listen for requests from the client
app.listen(PORT, () => {
    // Let us know (server-side) when the server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
})
