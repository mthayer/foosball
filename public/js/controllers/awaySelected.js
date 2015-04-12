// AWAY CONTROLLER
App.controller('awaySelected', function (page) {
  // check if there are players
  $(page).find('.awayteam-list').html('<li class=app-button><div class="circleAway">A</div>' + team.awayPlayers[0] + '</li><li class=app-button><div class="circleAway">A</div>' + team.awayPlayers[1] + '</li>');
});