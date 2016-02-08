/**
 * Created by ludovic on 08/02/16.
 */
'use strict';
var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
    username: String,
    action: String,
    createdAt: String,
});

module.exports = logSchema;