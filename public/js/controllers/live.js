// LIVE CONTROLLER
App.controller('live', function(page, data) {
    // check if there are players
    console.log('live loaded')
    this.transition = 'fade';
    console.log(data);
    if(data){
        updateBoard(data);
    }
    var myGameLive = new Firebase('https://jv-foosball.firebaseIO.com/games');
    var myGameLiveQuery = myGameLive.limit(1);
    // GOAL
    myGameLiveQuery.on('child_changed', function(snapshot) {
        console.log('live on fired');
        var scoresData = snapshot.val();
        updateBoard(scoresData);
        if(scoresData.awayScore != 0 && scoresData.homeScore != 0 && scoresData.live){
            humane.log('GOAL SCORED!');
            var Scores = $("#score-board").html();
            console.log('changed score');
            var ScoresTemplate = Handlebars.compile(Scores);
            //Generate some HTML code from the compiled Template
            var ScoreHTML = ScoresTemplate(scoresData);
            //Replace the body section with the new code.
            $(page).find('#board').html(ScoreHTML);

        }
        if(!scoresData.live ){
            humane.log('GAME OVER', function(){location.reload()});
        }
    });

    function updateBoard(scoresData){

        //Get the Template from above
        var Teams = $("#live-teams").html();
        //Compile the actual Template file
        var TeamsTemplate = Handlebars.compile(Teams);
        //Generate some HTML code from the compiled Template
        var TeamsHTML = TeamsTemplate(scoresData);
        // console.log(TeamsHTML);
        //Replace the body section with the new code.
        $(page).find('#live-teams').html(TeamsHTML);

        var Scores = $("#score-board").html();
        var ScoresTemplate = Handlebars.compile(Scores);
        //Generate some HTML code from the compiled Template
        var ScoreHTML = ScoresTemplate(scoresData);
        //Replace the body section with the new code.
        $(page).find('#board').html(ScoreHTML);
    }
    

    if (localStorage.getItem("live-game")) {
        $(page).find("#end-game-btn").html('<div class="app-section"><div id="ending-game" class="app-button btn-away" data-target="live">End Game</div></div>')
        }

    $(page).find("#ending-game").on('click', function(){
    	var myGameEndRef = new Firebase('https://jv-foosball.firebaseIO.com/games/'+localStorage.getItem("live-game"));
    	myGameEndRef.update({live: false});
        console.log('live updated');
        localStorage.clear();
    	// App.load('home');
    })

    });