/**
 * Created by ludovic on 08/02/16.
 */
var express = require('express');
var router = express.Router();
var projectsRequests = require('../../database/requests/projects');

/**
 * Create a project from a name and a username
 * POST /
 * body :
 *  - name
 *  - username
 */
router.post('/', function(req, res) {
    if (!req.body.name || !req.body.username) return res.sendStatus(400);
    projectsRequests.create(req.body.name, req.body.username, function(err, project) {
        if (err) return res.send(err);
        res.send(project);
    });
});

/**
 * List all the registered projects
 * GET /
 */
router.get('/', function(req, res) {
    projectsRequests.query({}, function(err, projects) {
        if (err) return res.send(err);
        res.send(projects);
    });
});

/**
 * Get a project by id
 * GET /?id
 * request params :
 *  - id
 */
router.get('/:id', function(req, res) {
    projectsRequests.findById(req.params.id, function(err, project) {
        if (err) return res.send(err);
        if (!project) return res.sendStatus(404);
        res.send(project);
    });
});

/**
 * Delete a project by id
 * DELETE /?id
 * request params :
 *  - id
 */
router.delete('/:id', function(req, res) {
    projectsRequests.delete(req.params.id, function(err, project) {
        if (err) return res.sned(err);
        if (!project) return res.sendStatus(404);
        res.send(project);
    })
});

module.exports = router;