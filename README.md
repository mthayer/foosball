Foosball Hack
-------------

Always wanted to make your foosball table better? Well here you go. With an arduino and a rasberry pi and a few other parts you can have a killer automated foosball table that tracks your games, score and team stats. 

Kickoff your games from a mobile device and view current game scores live on any browser.

![alt tag](https://www.evernote.com/shard/s20/sh/f0505173-971c-446c-a894-280a2a2497a1/34071a0bbfcfd378/res/e9247333-cab8-4f3c-a0bb-15ffdb249eff/skitch.png?resizeSmall&width=832)
![alt tag](https://www.evernote.com/shard/s20/sh/76326f8b-084e-4522-a2f8-cae6d5a0f526/ab058e9b0749924f/res/6d809d46-a113-488d-94ce-29f54d679cd8/skitch.png?resizeSmall&width=832)

###Parts

* Arduino
* Raspberry Pi
* 2 x 3v - 5v laser modules 

http://www.amazon.com/650nm-Mini-Diode-Module-Head/dp/B00LITXF40/ref=sr_1_16?ie=UTF8&qid=1428859709&sr=8-16&keywords=laser+module

* 2 x mini photo cell (photoresistor)

https://www.sparkfun.com/products/9088

A way to hook it all up (soldering iron or breadboard, spare wires)

###Putting it all together

You will need to install node on the rasberry pi. Check this out. http://joshondesign.com/2013/10/23/noderpi

Next you need to load the foos sketch onto the arduino. This requires some additional steps to download and setup the IDE(ADE). If you are not familiar with this you can get up to speed here http://arduino.cc/en/Guide/HomePage

*Now it is time to hook up the lasers!*

Check out this wiring diagram to see how to hook everything up. 
coming soon

Install the sketch on the arduino using the arduino IDE
coming soon

###A little more on how it works

When a user selects a team and starts the game from the web app the raspberry pi (server) send a serial command to the arduino board to turn on the laser gates.

Whenever a laser gate is broken by the ball passing through the gate the arduino send a goal command with the team that scored to the raspberry pi. The raspberry pi takes it form there and updates firebase with the new score. Since Firebase is awesome it will update the client app with the new score in real time.

## License

Foosball is licensed under the [MIT license](http://opensource.org/licenses/MIT).
