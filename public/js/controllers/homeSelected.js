// HOLME SELECTED CONTROLLER
App.controller('homeSelected', function (page) {
  // check if there are players
  $(page).find('.hometeam-list').html('<li class=app-button><div class="circleHome">H</div>' + team.homePlayers[0] + '</li><li class=app-button><div class="circleHome">H</div>' + team.homePlayers[1] + '</li>');

});