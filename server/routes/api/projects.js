/**
 * Created by ludovic on 08/02/16.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var projectsRequests = require('../../database/requests/projects');

router.use(
	bodyParser.json()
);

/**
 * Create a project from a name and a username
 * POST /
 * body :
 *  - name
 *  - username
 */
router.post('/', function(req, res) {
    if (!req.body.name || !req.body.username) return res.sendStatus(400);
	console.log("BODY:", req.body);
    projectsRequests.create(req.body.name, req.body.username, null, function(err, project) {
        if (err) return res.send(err);
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
 *
 */
router.put('/:id', function(req, res) {
    if (!req.body.username || !req.body.data) return res.sendStatus(400);
    projectsRequests.save(req.params.id, req.body.username, req.body.data, function(err, response) {
        if (err) return res.send(err);
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



module.exports = router;