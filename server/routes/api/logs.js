/**
 * Created by ludovic on 08/02/16.
 */
var express = require('express');
var router = express.Router();
var logsRequests = require('../../database/requests/logs');

/**
 * Create a record in the log
 * POST /
 * body :
 *  - username
 *  - action
 */
router.post('/', function(req, res) {
    if (!req.body.username || !req.body.action) return res.sendStatus(400);
    logsRequests.create(req.body.username, req.body.action, function(err, log) {
        if (err) return res.send(err);
        res.send(log);
    });
});

/**
 * GET history logs
 * GET /
 */
router.get('/', function(req, res) {
    var query = {};
    if (req.query.username) {
        query.username = req.query.username;
    }
    logsRequests.query(query, {}, function(err, logs) {
        if (err) return res.send(err);
        res.send(logs);
    });
});


module.exports = router;