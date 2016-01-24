/**
 * Created by ludovic on 18/01/16.
 */
    'use strict';
var mongoose = require('mongoose');
var basicSchema = require('../schemas/basicSchema');

var Basics = mongoose.model('Basics', basicSchema);

module.exports = Basics;
