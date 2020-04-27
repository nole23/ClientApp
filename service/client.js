const express = require('express');
const fs = require('fs');
const router = express.Router();
const openGeocoder = require('node-open-geocoder');

router
    .get('/list-language', function(req, res) {
        this.country = [
            {i: 0, name: 'English', type: 'en'},
            {i: 1, name: 'Srbija', type: 'sr'},
            {i: 2, name: 'Bosna i Hercegovina', type: 'ba'},
            {i: 3, name: 'Hrvatska', type: 'hr'},
            {i: 4, name: 'Crna Gora', type: 'mnt'},
            {i: 5, name: 'Severna Makedonija', type: 'mk'},
            {i: 6, name: 'Slovenija', type: 'slo'}, 
        ];
        return res.status(200).send({message: country, socket: 'SOCKET_NULL_POINT'})
    })
    .get('/get-host', function(req, res) {
        var type = req.params.type;
        const testFolder = './publication/' + type;
        var fullUrl = req.protocol + '://' + req.get('host');

        // fs.readdir(testFolder, (err, files) => {
        //     var listSmile = [];
        //     files.forEach(file => {
        //         listSmile.push(fullUrl + '/images/' + type + '/' + file.toString())
        //     });

        return res.status(200).send({message: fullUrl, socket: 'SOCKET_NULL_POINT'})
        // });
    })
    .get('/:city', function(req, res) {
        var city = req.params.city;
        openGeocoder()
            .geocode(city.toString())
            .end((err, result) => {
                return res.status(200).send({message: result, socket: 'SOCKET_NULL_POINT'});
            })
    })
    .post('/', function(req, res) {
        var data = req.body;
        var io = req.app.get('socket-io');

        data.participants.forEach(element => {
            io.emit(data.link.toString() + element,
                JSON.stringify(data.data)
            )
        });

        return res.status(200).send({message: 'success request'})
    })
module.exports = router;