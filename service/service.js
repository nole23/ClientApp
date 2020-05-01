const http = require("http");
var https = require('https');
const { routes } = require('../config.json');

module.exports = {
    requestMethod: function(app, method, linkReq, info, client_id, sendData, socket) {
        const item = routes.find(x => x.route === app);
        var link = item.address.split('/').slice(2).join('/');

        var hostname = link.split(':');

        var edit = {
            client_id: client_id
        }
        if (sendData !== null) {
            edit['user'] = JSON.parse(sendData);
        }

        var data = JSON.stringify(edit)

        console.log(hostname[0])
        var options = {
            host: hostname[0],
            path: '/api/' + linkReq,
            method: method,
            headers: {
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Credentials':'true',
              'Access-Control-Allow-Methods':'GET, HEAD, POST, PUT, DELETE',
              'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(data),
              'authorization': 'token',
            }
        };

        if (hostname.length > 1) {
            options['port'] = hostname[1]
        }

        var httpreq = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                var friends = null;
                if (sendData !== null) {
                    friends = JSON.parse(sendData);
                } else {
                    friends = JSON.parse(chunk)['message']['user'];
                }
                
                if (friends !== undefined) {
                    friends['listFriends'].forEach(element => {
                        socket.emit('user-is-online-' + element, {user: friends, status: info});
                    });
                }
            });
        });
        httpreq.write(data);
        httpreq.end();
    }
}