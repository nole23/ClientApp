const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { createProxyMiddleware  } = require('http-proxy-middleware');
var io = require('socket.io');
const { routes } = require('./config.json');
const service = require('./service/service.js');

const app = express();

const client = require('./service/client.js');

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

app.use('/api/client', client);

for (route of routes) {
    app.use(route.route,
        createProxyMiddleware({
            target: route.address,
            changeOrigin: true,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/')
            },
            onError: (err, req, res) =>{
                res.writeHead(500, {
                  'Content-Type': 'application/json',
                });
                res.end('Something went wrong. And we are reporting a custom error message.' + err);
            },
            onProxyReq: (proxyReq, req, res) =>{
                if (req.method != 'GET') {
                    proxyReq.setHeader('content-type', 'application/json');
                    proxyReq.setHeader('method', req.method);
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(JSON.stringify(req.body)))
                    proxyReq.write( JSON.stringify(req.body) );
                    proxyReq.end();
                }
            },
            onProxyRes: (proxyRes, req, res) => {
                if (
                    (req.method.toString() == 'POST') || 
                    (req.method.toString() == 'PUT') || 
                    (req.method.toString() == 'DELETE')
                ) {
                    proxyRes.on('data', (data) => {
                        var rData = JSON.parse(data.toString('utf-8'));
                        if (rData.socket.toString() != 'SOCKET_NULL_POINT') {
                            rData.socket.participants.forEach(element => {
                                io.emit(rData.socket.link.toString() + element._id,
                                    JSON.stringify(rData.socket.data)
                                )
                            });
                        }
                    })
                }
            }
        })
    );
}

app.use('/images', express.static('publication'));
app.use(express.static(__dirname + '/dist/ClientApp'));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/ClientApp/index.html'));
})

var http = require('http').Server(app);

var io = require('socket.io')(http);
io.on('connection', function (socket) {
    socket.on('setOnline', (data) =>{
        service.requestMethod(
            '/status',
            'POST',
            'status/',
            true,
            socket.client.id,
            data,
            io
        );
    })

    socket.on('typing', (data) =>{
        data.user.forEach(element => {
            io.emit('typing-' + element._id, {chater: data.chater});
        })
        
    })

    socket.on('disconnect', function(){
        console.log('user disconnected');
        service.requestMethod(
            '/status',
            'DELETE',
            'status/',
            false,
            socket.client.id,
            null,
            io
        );
    });
});

app.set('socket-io', io);
http.listen(port, () => console.log(`Listening on ${ port }`));
