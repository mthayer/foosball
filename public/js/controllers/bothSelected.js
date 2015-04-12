// BOTH CONTROLLER
App.controller('bothSelected', function (page, team) {
  
  	$(page).find('.awayteam-list').html('<li class=app-button><div class="circleAway">A</div>' + team.awayPlayers[0] + '</li><li class=app-button><div class="circleAway">A</div>' + team.awayPlayers[1] + '</li>');
	$(page).find('.hometeam-list').html('<li class=app-button><div class="circleHome">H</div>' + team.homePlayers[0] + '</li><li class=app-button><div class="circleHome">H</div>' + team.homePlayers[1] + '</li>');	
		
	var	game = { 	
	// START NEW GAME
	  		live: true,
	  		homeScore: 0,
	  		awayScore: 0,
	  		awayTeam1: team.awayPlayers[0],
	  		awayTeam2: team.awayPlayers[1],
	  		homeTeam1: team.homePlayers[0],
	  		homeTeam2: team.homePlayers[1],
	      	startTime: Firebase.ServerValue.TIMESTAMP
	   }

	var myGamerefBoth = new Firebase('https://jv-foosball.firebaseIO.com/games');

	$(page).find('#kickoff-btn').on('click', function(){
	  var newGame = myGamerefBoth.push(game);
	  localStorage.setItem("live-game",newGame.name());
	  App.load('live', game);
	})
});