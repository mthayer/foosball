// HOMETEAM CONTROLLER
App.controller('home-team', function (page) {
  team.homePlayers = [];
  // GET TEAM LIST

    var myPlayers = new Firebase('https://<YOUR FIREBASE APP NAME>.firebaseIO.com/players');
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

    if (team.homePlayers.length == 1) {
      // $('.footer-fixed').animate({bottom: "0px"}, 200);
      App.dialog({
        title: 'Ready To Go?',
        text: 'Looks like your team is set',
        okButton: 'Done',
        cancelButton: 'Cancel'
      }, function (okButton) {
        if (okButton) {
          if (team.awayPlayers.length == 2) {
            App.load('bothSelected', team); // fade between pages
            return
          }

          App.load('homeSelected', 'fade'); // fade between pages

        } else {
          team.homePlayers = [];
          $('.team-selected').html('');
        }
      });
    }

    team.homePlayers.push($(this).text());
    $(this).children().html('&#x2714;');
  })

});