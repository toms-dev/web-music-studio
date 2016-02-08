/**
 * Created by ludovic on 08/02/16.
 */
'use strict';
var db = require('../connection/connection');
var Logs = require('../models/logModel');

exports.create = function(username, action, callback) {
    var log = new Logs({
        username: username,
        action: action,
        createdAt: new Date()
    });

    log.save(function(err, log) {
        callback(err, log);
    })
};

exports.query = function(query, fields, callback) {
    Logs.find(query, fields, function (err, logs) {
        callback(err, logs);
    });
};


