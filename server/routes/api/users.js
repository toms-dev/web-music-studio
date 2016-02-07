/**
 * Created by ludovic on 25/01/16.
 */
var express = require('express');
var router = express.Router();
var usersRequests = require('../../database/requests/users');
var projectsRequests = require('../../database/requests/projects');

/**
 * Create a user from a username and a password
 * POST /
 * body :
 *  - username
 *  - password
 */
router.post('/', function(req, res) {
    if (!req.body.username || !req.body.password) return res.sendStatus(400);
    usersRequests.create(req.body.username, req.body.password, function(err, user) {
        if (err) {
            return res.send(err);
        }
        res.send(user);
    });
});

/**
 * List all the registered users
 * GET /
 */
router.get('/', function(req, res) {
    usersRequests.queryUsers({}, function(err, users) {
        if (err) return res.send(err);
        res.send(users);
    });
});

/**
 * Get a user by username
 * GET /?username
 * request params :
 *  - username
 */
router.get('/:username', function(req, res) {
    usersRequests.getByUsername(req.params.username, function(err, user) {
        if (err) return res.send(err);
        if (!user) return res.sendStatus(404);
        res.send(user);
    });
});

/**
 * Get all projects from a contributor
 * GET /?username
 * request params :
 *  - username
 */
router.get('/:username/projects', function(req, res) {
    projectsRequests.query({contributors: req.params.username}, {}, function(err, projects) {
        if (err) return res.send(err);
        res.send(projects);
    });
});

/**
 * Delete a user by username
 * DELETE /?username
 * request params :
 *  - username
 */
router.delete('/:username', function(req, res) {
    usersRequests.deleteByUsername(req.params.username, function(err, user) {
        if (err) return res.sned(err);
        if (!user) return res.sendStatus(404);
        res.send(user);
    })
});

module.exports = router;