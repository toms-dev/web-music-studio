/**
 * Created by ludovic on 25/01/16.
 */
'use strict';
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

module.exports = userSchema;