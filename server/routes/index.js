var express = require('express');
var router = express.Router();
var basicRequests = require('../database/requests/basic');


/* GET home page. */
router.get('/', function(req, res, next) {
    basicRequests.doBasics();
    res.render('index', { title: 'Basic' });
});

module.exports = router;
