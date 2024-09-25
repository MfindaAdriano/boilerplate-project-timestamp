// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//http://localhost:3000/api/449879709871
//A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// 10%11%2018

/*************Starts Here ********* */
app.get("/api/:date?", (req, res) => {
  let codificado = encodeURI("12 10 2019");
  console.log(codificado);
  console.log(decodeURI(codificado));
  console.log(new Date(decodeURI(codificado)));
  console.log(new Date("2022, 12 30"));
  console.log("Data: " + new Date(decodeURI(codificado)))


  let date = req.params.date;
  let dateObj;

  //if date parameter is empty
  if(!date){
    //date = new Date(req.params.date);
    dateObj = new Date();
    res.json({unix: dateObj.getTime(), utc: dateObj.toUTCString()});
  }else{
      const arg = decodeURI(req.params.date);
      dateObj = new Date(arg);

      if(new Date(arg).toUTCString() === "Invalid Date"){
        if(new Date(parseInt(arg)).toUTCString() === "Invalid Date"){
          res.json({error: "Invalid Date"});
        }else{
          dateObj = new Date(parseInt(arg));
          res.json({unix: dateObj.getTime(), utc: dateObj.toUTCString()});
        }
        
      }else{
        res.json({unix: dateObj.getTime(), utc: dateObj.toUTCString()});
      }
      
  }

})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
