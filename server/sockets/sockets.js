/**
 * Created by ludovic on 25/01/16.
 */
    'use strict';
var shortid = require('shortid');
var connected = [];

var projectRequest = require("../database/requests/projects");

var sockets = function(io) {

    io.on('connection', function (socket) {
        var socketid = shortid.generate();
        connected.push({socketid: socketid, socket: socket});

        socket.on('disconnect', function() {
            connected = connected.filter(function(record) {
                return record.socketid !== socketid
            });
        });

		socket.on('message', function(data) {
			console.log("WebSocket Message: ", data);
			var id = data;
			projectRequest.findById(id, function(err, res) {
				console.log("Project #" + id + " found:", res);
				socket.emit("message", res);
				console.log("Data sent.");
				//socket.emit(res);
			});
		});

        socket.on('update', function(data) {
            console.log('update received', data.projectid);
			projectRequest.save(data.projectid, "DefaultUser", data.data, function(res) {
				projectRequest.findById(data.projectid, function(err, res) {
					socket.broadcast.emit('message-broadcast', res);
				})
			});
        });
    });


};

module.exports = sockets;