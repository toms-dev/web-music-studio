/**
 * Created by ludovic on 25/01/16.
 */
var express = require('express');
var router = express.Router();
var usersRequests = require('../../database/requests/users');

router.post('/', function(req, res) {
    if (!req.body.username || !req.body.password) return res.sendStatus(400);
    usersRequests.create(req.body.username, req.body.password, function(err, user) {
        if (err) {
            return res.send(err);
        }
        res.send(user);
    });
});

router.get('/', function(req, res) {
    usersRequests.queryUsers({}, function(err, users) {
        if (err) return res.send(err);
        res.send(users);
    });
});

router.get('/:username', function(req, res) {
    usersRequests.getByUsername(req.params.username, function(err, user) {
        if (err) return res.send(err);
        if (!user) return res.sendStatus(404);
        res.send(user);
    });
});

router.delete('/:username', function(req, res) {
    usersRequests.deleteByUsername(req.params.username, function(err, user) {
        if (err) return res.sned(err);
        if (!user) return res.sendStatus(404);
        res.send(user);
    })
});

module.exports = router;