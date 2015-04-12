// AWAYTEAM CONTROLLER
App.controller('away-team', function (page) {
  team.awayPlayers = [];
 
    var myPlayers = new Firebase('https://jv-foosball.firebaseIO.com/players');
    myPlayers.on('value', function(snapshot) {
      playerData(snapshot.val())
    });

  function playerData(data) {
    if (data) {
      var Players = $("#player-list-template").html();
      //Compile the actual Template file
      var PlayersTemplate = Handlebars.compile(Players);

      //Generate some HTML code from the compiled Template
      var PlayersHTML = PlayersTemplate(data);
      //Replace the body section with the new code.
      $(page).find('#player-list').html(PlayersHTML);    
    }
  }

  function error(data) {console.log(data)};

  $(page).on('click', 'li', function () {

    if (team.awayPlayers.length == 1) {
      // $('.footer-fixed').animate({bottom: "0px"}, 200);
      App.dialog({
        title: 'Ready To Go?',
        text: 'Looks like your team is set',
        okButton: 'Done',
        cancelButton: 'Cancel'
      }, function (okButton) {
        if (okButton) {
          if (team.homePlayers.length == 2) {
            App.load('bothSelected', team); // fade between pages
            return
          }

          App.load('awaySelected', 'fade');
        } else {
          team.awayPlayers = [];
          $('.team-selected').html('');
        }
      });
    }

    team.awayPlayers.push($(this).text());
    $(this).children().html('&#x2714;');
  })

});