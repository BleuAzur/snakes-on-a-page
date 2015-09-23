var https = require('https'),      // module for https
fs =    require('fs');         // required to read certs and keys
var express = require('express');
var app = express();

/*app.get('/', function (req, res) {
  res.setHeader('Content-Type','text/html')
  res.render('public/index.html');
});*/

app.use(express.static('public'));


var options = {
    key:    fs.readFileSync('private/server.key'),
    cert:   fs.readFileSync('private/server.crt'),
//    requestCert:        true,
//    rejectUnauthorized: false
};

https.createServer(options, app).listen(3250, function () {
	console.log("Server running")
	
});
