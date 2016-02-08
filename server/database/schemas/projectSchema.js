'use strict';
var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    name: String,
    contributors: [],
    createdAt: String,
    lastModifiedDate: String,
    lastModifiedUsername: String,
    data: {}
});

module.exports = projectSchema;
