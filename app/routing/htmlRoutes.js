
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");


var router = express.Router();

//// this is to handle the default route:

router.get("/", function (req, res){
	res.sendFile(path.join(__dirname + "/../static/", "index.html"));

});

module.exports = router;

