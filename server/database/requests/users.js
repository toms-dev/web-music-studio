/**
 * Created by ludovic on 25/01/16.
 */
'use strict';
var db = require('../connection/connection');
var Users = require('../models/userModel');
var bcrypt = require('bcrypt-nodejs');

exports.create = function(username, password, callback) {
    this.getByUsername(username, function(err, user) {
        if (user) {
            return callback({message: 'user already exists'});
        }
        user = new Users({
            username: username,
            password: bcrypt.hashSync(password)
        });
        user.save(function (err, user) {
            callback(err, user);
        });
    });
};

exports.getByUsername = function(username, callback) {
    Users.findOne({username: username}, function (err, user) {
        if (callback) callback(err, user);
    });
};

exports.deleteByUsername = function(username, callback) {
    Users.findOneAndRemove({username: username}, function(err, user) {
        callback(err, user);
    });
};

exports.userExists = function(username, password, callback) {
    this.getByUsername(username, function(err, user) {
        if (!user) {
            callback(false);
            return;
        }
        bcrypt.compare(password, user.password, function(err, res) {
            callback(res);
        });
    });
};

exports.queryUsers = function(query, fields, callback) {
    Users.find(query, fields, function(err, users) {
        callback(err, users);
    });
};