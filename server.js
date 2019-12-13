var express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 8085;
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
});
// app.use('/static', express.static('public'));
app.use(express.static(__dirname + '/dist/ClientApp'));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/ClientApp/index.html'));
})

var http = require('http').Server(app);
http.listen(port, () => console.log(`Listening on ${ port }`));