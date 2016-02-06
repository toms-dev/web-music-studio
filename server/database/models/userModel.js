/**
 * Created by ludovic on 25/01/16.
 */
'use strict';
var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema');

var Users = mongoose.model('Users', userSchema);

module.exports = Users;