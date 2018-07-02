var express = require('express');
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 3000;
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static content for the app from the "static" directory in the application directory.
app.use(express.static('./app/static'));

//requiring external routes.
var routes = require("./app/routing/apiRoutes.js");
var defroutes = require("./app/routing/htmlRoutes.js");

//use those routes.
app.use(routes);
app.use(defroutes);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
