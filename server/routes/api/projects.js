/**
 * Created by ludovic on 08/02/16.
 */
var express = require('express');
var router = express.Router();
var projectsRequests = require('../../database/requests/projects');
var logsRequests = require('../../database/requests/logs');

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
        logsRequests.create(req.body.username, "project creation", function(){});
        res.send(project);
    });
});

/**
 * List all the registered projects
 * GET /
 * filter:
 *  - ?username=username
 */
router.get('/', function(req, res) {
	var query = {};
    projectsRequests.query(query, function(err, projects) {
        if (err) return res.send(err);
        if (req.query.username) {
            projects = projects.filter(function(project) {
                var user = project.contributors.find(function(u) {
                    if (u.username === req.query.username) return u;
                });
                return user !== undefined;
            });
        }
        res.send(projects);
    });
});

/**
 * Get a project by id
 * GET /:id
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
 * DELETE /:id
 * request params :
 *  - id
 */
router.delete('/:id', function(req, res) {
    projectsRequests.delete(req.params.id, function(err, project) {
        if (err) return res.send(err);
        if (!project) return res.sendStatus(404);
        res.send(project);
    })
});

/**
 * Save a project
 * PUT /:id
 * request params :
 *  - id (projectid)
 * body :
 *  - username
 *  - data
 */
router.put('/:id', function(req, res) {
    if (!req.body.username || !req.body.data) return res.sendStatus(400);
    projectsRequests.save(req.params.id, req.body.username, req.body.data, function(err, response) {
        if (err) return res.send(err);
        if (response.ok) {
            logsRequests.create(req.body.username, "project saved", function(){});
        }
        res.send(response);
    });
});


/**
 * Add a contributor to a project
 * POST /:id/contributors
 * request params :
 *  - id (projectid)
 * body :
 *  - username
 */
router.post('/:id/contributors', function(req, res) {
    if (!req.body.username) return res.sendStatus(400);
    projectsRequests.addContributor(req.params.id, req.body.username, function(err, response) {
        if (err) return res.send(err);
        res.send(response);
    });
});

/**
 * Remove a contributor from a project
 * POST /:id/contributors/:username
 * request params :
 *  - id (projectid)
 *  - username
 */
router.delete('/:id/contributors/:username', function(req, res) {
    projectsRequests.removeContributor(req.params.id, req.params.username, function(err, response) {
        if (err) return res.send(err);
        res.send(response);
    });
});

/**
 * Add a comment to a project
 * POST /:id/comments
 * request params :
 *  - id (projectid)
 * body :
 *  - comment (need a comment.username which is the author of the comment and he must be a contributor)
 */
router.post('/:id/comments', function(req, res) {
    projectsRequests.addComment(req.params.id, req.body.comment, function(err, response) {
        if (err) return res.send(err);
        res.send(response);
    });
});

router.get('/:id/comments', function(req, res) {
    var skip = req.query.skip?req.query.skip:0;
    var max = req.query.max?req.query.max:10;
    console.log(skip, max);
    projectsRequests.getComments(req.params.id, skip, max, function(err, project) {
        if (err) return res.send(err);
        res.send(project);
    });
});


module.exports = router;