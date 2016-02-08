'use strict';
var db = require('../connection/connection');
var Projects = require('../models/projectModel');

exports.create = function(name, username, callback) {
    var project = new Projects({
        name: name,
        contributors: [{username:username, role:'fullaccess'}],
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

exports.addContributor = function(projectid, username, role, callback) {
    Projects.findOne({_id: projectid}, {contributors: 1}, function(err, project) {
        if (project) {
            var user = project.contributors.find(function(u) {
                if (u.username === username) return u;
            });
            if (!user) {
                Projects.update({_id: projectid}, {$push: {contributors: {username: username, role: role}}}, function (err, res) {
                    callback(err, res);
                });
            } else {
                callback({businessError: true, message: 'contributor is already associated with this project'});
            }
        }
    });
};

exports.removeContributor = function(projectid, username, callback) {
    Projects.findOne({_id: projectid}, {contributors: 1}, function(err, project) {
        if (project) {
            var user = project.contributors.find(function(u) {
                if (u.username === username) return u;
            });
            if (!user) {
                return callback({businessError: true, message: 'no contributor with name '+username+' found in this project'});
            } else {
                Projects.update({_id:projectid}, {$pull: {contributors: { $elemMatch: { username: username }}}}, function(err, res) {
                    callback(err, res);
                });
            }
        }
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
