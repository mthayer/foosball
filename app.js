/**
 * Module dependencies.
 */

var express = require('express');
var methodOverride = require('method-override');
var _ = require('lodash');
var path = require('path');
var connectAssets = require('connect-assets');
var sys = require("sys");
var Firebase = require('firebase');

var myRootRef = new Firebase('https://jv-foosball.firebaseIO.com/games' );

// UNCOMMENT BELOW WHEN SERIAL CONNECTED
// var serialport = require("serialport");
// var SerialPort = serialport.SerialPort; // localize object constructor
// var sp = new SerialPort("/dev/cu.usbserial-A9007MEq", {
//   parser: serialport.parsers.raw
// });


//get the most recent game
myRootRef.limit(1).on("child_added", function(snapshot) {
  currentGameData = snapshot.val();
  gameName = snapshot.name();
  console.log("initial data");
  console.log(currentGameData);
//check if game is live and update score on serial write
  if(currentGameData.live){
    var SerialPort = require("serialport").SerialPort;
    var serialPort = new SerialPort("/dev/cu.usbserial-A9007MEq");
    //send game start to arduino via serial
    serialPort.on("open", function () {
      serialPort.on('data', function(data) {
        
        if(data[0] == 49){
          console.log("home scored");
          var myGameUpdate = new Firebase('https://jv-foosball.firebaseIO.com/games/'+gameName);
     
          currentGameData.homeScore += 1
          myGameUpdate.update({homeScore: currentGameData.homeScore});
        }
        if(data[0] == 50){
          console.log("away scored");
          var myGameUpdate = new Firebase('https://jv-foosball.firebaseIO.com/games/'+gameName);
     
          currentGameData.awayScore += 1
          myGameUpdate.update({awayScore: currentGameData.awayScore});
        }
      });
      serialPort.write("1", function(err, results) {
        console.log("On");
      });
    });
  }else {
    var SerialPort = require("serialport").SerialPort;
    var serialPort = new SerialPort("/dev/cu.usbserial-A9007MEq");
    serialPort.on("open", function () {
      serialPort.on('data', function(data) {
      });
      serialPort.write("2", function(err, results) {
        console.log("No Game");
        console.log("Off");
        serialPort.close(function(){
          console.log("Close Port");
        });
      });
    });
  }

});
//THIS HANDLES THE TURNING OFF
myRootRef.limit(1).on('child_changed', function(snapshot) {
  var currentGameData = snapshot.val();
  if(!currentGameData.live){
    console.log(currentGameData);
    var SerialPort = require("serialport").SerialPort;
    var serialPort = new SerialPort("/dev/cu.usbserial-A9007MEq");
    serialPort.on("open", function () {
      serialPort.write("2", function(err, results) {
        console.log("Game Over");
        console.log("Off");
        serialPort.close(function(){
          console.log("Close Port");
        });
      });
    });
  }

});

/**
 * Create Express server.
 */

var app = express();
var http = require('http').Server(app);

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * Express configuration.
 */

app.set('port', process.env.PORT || 3000);
app.use(connectAssets({
  paths: ['public/css', 'public/js'],
  helperContext: app.locals
}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));

/**
 * Main routes.
 */

app.get('/', function(req, res){
  res.send(index.html);
});

//CHECK SERIAL PORT
// var serialPort = require("serialport");
// serialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//     console.log(port.pnpId);
//     console.log(port.manufacturer);
//   });
// });

// serialPort.on("open", function () {
//   console.log('open');
//   serialPort.on('data', function(data) {
//     console.log('data received: ' + data);
//   });
//   serialPort.write("ls\n", function(err, results) {
//     console.log('err ' + err);
//     console.log('results ' + results);
//   });
// });



/**
 * Start Express server.
 */
http.listen(3000, function(){
  console.log('listening on *:3000');
});
