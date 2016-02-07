'use strict';
var db = require('../connection/connection');
var Projects = require('../models/projectModel');

exports.create = function(name, username, callback) {
    var project = new Projects({
        name: name,
        contributors: [username],
        createdAt: new Date(),
        lastModifiedDate: new Date(),
        lastModifiedUsername: username,
        data: {}
    });

    project.save(function(err, project) {
        callback(err, project);
    });
};

exports.delete = function(projectid, callback) {
    Projects.findOneAndRemove({_id:projectid}, function(err, project) {
        callback(err, project);
    });
};

exports.addContributor = function(projectid, username, callback) {
    Projects.findOne({_id: projectid}, {contributors: 1}, function(err, project) {
        if (project && project.contributors.indexOf(username) === -1) {
            Projects.update({_id:projectid}, {$push: {contributors: username}}, function(err, res) {
                callback(err, res);
            });
        } else {
            callback({businessError: true, message: 'contributor is already associated with this project'});
        }
    });
};

exports.removeContributor = function(projectid, username, callback) {
    Projects.findOne({_id: projectid}, {contributors: 1}, function(err, project) {
        if (project && project.contributors.indexOf(username) === -1) {
            return callback({businessError: true, message: 'no contributor with name '+username+' found in this project'});
        }
        Projects.update({_id:projectid}, {$pull: {contributors: username}}, function(err, res) {
            callback(err, res);
        });
    });
};

exports.query = function(query, fields, callback) {
    Projects.find(query, fields, function(err, projects) {
        callback(err, projects);
    });
};

exports.findById = function(projectid, callback) {
    Projects.findOne({_id: projectid}, function(err, project) {
        callback(err, project);
    });
};

exports.save = function(projectid, username, data, callback) {
    Projects.update({_id:projectid}, {data: data, lastModifiedDate: new Date(), lastModifiedUsername: username}, function(err, res) {
        callback(err, res);
    });
};
