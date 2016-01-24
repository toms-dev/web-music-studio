/**
 * Created by ludovic on 18/01/16.
 */
    'use strict';
var mongoose = require('mongoose');
var Basics = require('../models/basicModel');

exports.doBasics = function() {
    // default mongo database, TODO config file
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', function() {
        console.error('connection error (db)');
    });
    db.once('open', function() {
        console.log('connected to db');

        var b = new Basics({
            name: 'a basic instance'
        });

        // saving it
        b.save(function (err, b) {
            if (err) return console.error(err);
        });

        // find it an remove it
        Basics.findOneAndRemove({ name: /^a basic/ }, function (err, basic) {
            if (err) return console.error(err);
            console.log(basic);
        });

        // basics sould be empty now
        Basics.find(function (err, basics) {
            console.log(basics);
        });
    });
};
