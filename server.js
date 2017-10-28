// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

app.get("/:time/", function (request, response) {

 function getTime() {
    const monthList = ['January', 'February','March','April','May','June','July','August','September', 'October','November','December'];
    var time = new Date(request.params.time * 1000);
    var final = "";
    //console.log(time);
    
   if (parseInt(request.params.time)) {
       const timeNew = time;
       const year = time.getFullYear();
       const month = monthList[time.getMonth()];
       const day = time.getDate();
       final = month + " " + day + ", " + year;
       response.send({"unix": request.params.time, "natural": final});
    } else if(Date.parse(request.params.time)) {
    const unixDate = Date.parse(request.params.time) / 1000;
	response.send({"unix": unixDate, "natural": request.params.time });
    } else {
		response.send({"unix": "null", "natural": "null" });
	}
    
  }
  //response.send({"unix": "121212", "natural": "2017"});
  getTime();
});


// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
