'use strict';

var mongoose = require('mongoose');
var projectSchema = require('../schemas/projectSchema');

var Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;