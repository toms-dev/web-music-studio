/**
 * Created by ludovic on 25/01/16.
 */
'use strict';
var mongoose = require('mongoose');

// default mongo database, TODO config file
var uri = 'mongodb://localhost/test';
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', function() {
    console.error('connection error (db)');
});
db.once('open', function() {
    console.log('connected to db : ', uri);
});

module.exports = db;