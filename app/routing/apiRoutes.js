

var friends = require('../data/friends.js');

module.exports = function(app){

//required express get and post!

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});



	app.post('/api/friends', function(req, res){

		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		var holoInput 	= req.body;
		var userName 	= holoInput.name;
		var userPhoto 	= holoInput.photo;
		var userScores 	= holoInput.scores;
		var totalDifference = 0;

		for  (var i=0; i< friends.length; i++) {
//friend list loop
			//This gives a log of what friends we have in our database. 
			console.log(friends[i].name);
			totalDifference = 0;

			// score loop
			for (var j=0; j< friends[i].scores[j]; j++){
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				
				if (totalDifference <= bestMatch.friendDifference){
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		//push it to the database
		friends.push(holoInput);

		//This is used in the HTML later
		res.json(bestMatch);

	});

}