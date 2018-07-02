var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

////'create a router instance'
var router = express.Router();

////'global object for multiple purposes, loging or reference.'
var obj = {
	table: []
};


////'Handle the post from the data form on the surver.html'
router.post('/api/friends', function(req, res){
	
	////'Get data from the form post'
	var formData = req.body;
	var finalProspect = {};

	////'Form Data ???'
	////'console.log(formData);

	////'READ and APPEND to DATA file'
	fs.readFile(__dirname + "/../data/friends.json", 'utf8', function readFileCallback(err, data){
	    if (err){
	        console.log(err);
	    } else {

			obj = JSON.parse(data);
			////file data now as an object
	    	////Store all prospects and the total difference array of each prospect
	    	var prospects = [];
	    	var totalDifference = [];
	    	

	    	for (var i = 0; i < obj.table.length; i++) {
	    		////var dbScore = obj.table[i].name;
	    		//console.log("This is the score: " + dbScore);

	    		////'substract between UserForm Input and Data File input'
	    		var x = obj.table[i].scores.map(function(item,index){
	    			//'Use the Math.abs to evaluate the absolute value'
	    			var test = Math.abs(item - formData.scores[index]);
	    			return test;
	    		});
	    		////'get the sum of each difference'
	    		var sum = x.reduce(add, 0);

	    		function add(a,b){
	    			return a + b;
	    		}

	    		////'store the users that have been Evaluated into a local object'
	    		var usersEval = {
	    			name: obj.table[i].name,
	    			photo: obj.table[i].photo,
	    			friendDifference: sum
	    		}

	    		////'updatee the total difference array'
	    		totalDifference.push(sum);
	    		////'send the file data to a global object'
	    		prospects.push(usersEval);

	    	 } 

	    	 ////'selecting the minimal score for perfect match'
		    var selectedScore = Math.min.apply(null,totalDifference);

			////console.log(selectedScore);

			////'Loop tru the prospects to match the persona that contains the lowest score'

			for(var i = 0; i < prospects.length; i++){
				if(parseInt(prospects[i].friendDifference) == parseInt(selectedScore)){
					finalProspect = {
						name: prospects[i].name,
						photo: prospects[i].photo,
						friendDifference: prospects[i].friendDifference
					}
					
				}
			}		    
			////console.log(finalProspect);
			obj.table.push(formData); 
			////push the finalist user into as a new object
			json = JSON.stringify(obj); 
			////convert it back to json
		    ////console.log(json);
		    ////'Store the object into our local DB file'
			fs.writeFile(__dirname + '/../data/friends.json', json, 'utf8', function(err){console.log(err);}); 
			//// write it back into file
		    ////'respond to the app with the final Prospect a.k.a finalist'
		    res.json(finalProspect);
	}});
	
});

////'Show all the users in the data file'
router.get('/api/friends', function(req, res){

		fs.readFile(__dirname + "/../data/friends.json", 'utf8', function readFileCallback(err, data){
	    if (err){
	        console.log(err);
	    } else {
	    	var dbData = JSON.parse(data);
	    	return res.json(dbData);
	    }

	});
});

////'export this route'
module.exports = router;