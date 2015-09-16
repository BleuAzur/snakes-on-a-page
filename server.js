var https = require('https'),      // module for https
fs =    require('fs');         // required to read certs and keys
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.render('index.html');
});


var options = {
    key:    fs.readFileSync('private/server.key'),
    cert:   fs.readFileSync('private/server.crt'),
    requestCert:        true,
    rejectUnauthorized: false
};

https.createServer(options, function (req, res) {
	console.log("Server running")
    if (req.client.authorized) {
        res.writeHead(200, '{&quot;Content-Type&quot;: &quot;application/json&quot;}');
        res.end('{&quot;status&quot;:&quot;approved&quot;}');
    } else {
        res.writeHead(401, '{&quot;Content-Type&quot;: &quot;application/json&quot;}');
        res.end('{&quot;status&quot;:&quot;denied&quot;}');
    }
}).listen(3000);
