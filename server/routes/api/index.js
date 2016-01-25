/**
 * Created by ludovic on 25/01/16.
 */
var requireDirectory = require('require-directory');

var express = require('express');
var router = express.Router();

// Loads API routes
var apiRoutes = requireDirectory(module, {recurse: false});
for(var route in apiRoutes) {
    if(!apiRoutes.hasOwnProperty(route)) continue;
    router.use('/'+route+'/', apiRoutes[route]);
}

module.exports = router;