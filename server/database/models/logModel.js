/**
 * Created by ludovic on 08/02/16.
 */
'use strict';

var mongoose = require('mongoose');
var logSchema = require('../schemas/logSchema');

var Projects = mongoose.model('Logs', logSchema);

module.exports = Projects;