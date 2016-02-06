var express = require('express');
var router = express.Router();
var requireDirectory = require('require-directory');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

var apiRoutes = requireDirectory(module, {recurse: false});
for(var route in apiRoutes) {
    if(!apiRoutes.hasOwnProperty(route)) continue;
    router.use('/'+route+'/', apiRoutes[route]);
}

module.exports = router;
