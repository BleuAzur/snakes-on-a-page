var https = require('https'),      // module for https
fs =    require('fs');         // required to read certs and keys
var express = require('express');
var app = express();

app.use(express.static('public'));

var options = {
    key:    fs.readFileSync('private/server.key'),
    cert:   fs.readFileSync('private/server.crt'),
};

https.createServer(options, app).listen(3250, function () {
	console.log("Server running")
});