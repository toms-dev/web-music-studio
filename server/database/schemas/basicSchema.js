/**
 * Created by ludovic on 18/01/16.
 */
    'use strict';
var mongoose = require('mongoose');

var basicSchema = mongoose.Schema({
    name: String
});

module.exports = basicSchema;