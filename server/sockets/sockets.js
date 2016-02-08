/**
 * Created by ludovic on 25/01/16.
 */
    'use strict';
var shortid = require('shortid');
var connected = [];

var sockets = function(io) {

    io.on('connection', function (socket) {
        var socketid = shortid.generate();
        connected.push({socketid: socketid, socket: socket});

        socket.on('disconnect', function() {
            connected = connected.filter(function(record) {
                return record.socketid !== socketid
            });
        });

        socket.on('update', function(data) {
            console.log('update received');
            socket.broadcast.emit('update', data);
        });
    });


};

module.exports = sockets;