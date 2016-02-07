'use strict';

var assert = require('assert');
var projectDB = require('../database/requests/projects');
var async = require('async');

describe('Projects', function() {

    var projectName = 'my project';
    var username = 'username12345678';

    describe('add and remove :', function () {

        it('should create and remove a project in db', function (done) {
            projectDB.create(projectName, username, function(err, project) {
                if (err) throw err;
                assert(project._id !== undefined);

                projectDB.delete(project._id, function(err, project) {
                    if (err) throw err;
                    done();
                });
            });
        });
    });

    describe('operations :', function () {

        var projectid;

        before(function(done) {
            projectDB.create(projectName, username, function(err, project) {
                if (err) throw err;
                projectid = project._id;
                done();
            });
        });

        after(function(done) {
            projectDB.delete(projectid, function(err, project) {
                if (err) throw err;
                done();
            });
        });

        describe('tests :', function() {

            it('should add a contributor that does not exist', function(done) {
                var newContributor = 'contributor123456';
                projectDB.addContributor(projectid, newContributor, function(err, res) {
                    if (err && !err.businessError) {
                        throw err;
                    } else if (err && err.businessError) {
                        assert(err.businessError === undefined);
                    } else {
                        assert.equal(1, res.ok);
                        projectDB.addContributor(projectid, newContributor, function(err, res) {
                            if (err && !err.businessError) throw err;
                            assert.equal(true, err.businessError);
                            assert.equal('contributor is already associated with this project', err.message);
                            assert(res === undefined);
                            done();
                        });
                    }
                });
            });

            it('should remove an existing contributor', function(done) {
                var newContributor = 'contributor1234567';
                projectDB.addContributor(projectid, newContributor, function(err, res) {
                    async.parallel([
                        function(callback) {
                            projectDB.removeContributor(projectid, newContributor, function(err, res) {
                                if (err && !err.businessError) throw err;
                                assert.equal(1, res.ok);
                                callback();
                            });
                        },
                        function(callback) {
                            projectDB.removeContributor(projectid, 'unknownContributor', function(err, res) {
                                if (err && !err.businessError) throw err;
                                assert.equal(true, err.businessError);
                                assert.equal('no contributor with name unknownContributor found in this project', err.message);
                                assert(res === undefined);
                                callback();
                            });
                        }
                    ], function(err) {
                        done();
                    });

                });
            });

            it('should save the project data', function(done) {
                var username = 'userwhomodified';
                var data = {
                    property1: 'value1'
                };
                projectDB.save(projectid, username, data, function(err, res) {
                    if (err) throw err;
                    assert.equal(1, res.ok);
                    projectDB.findById(projectid, function(err, project) {
                        assert.equal(username, project.lastModifiedUsername);
                        assert.equal('value1', project.data.property1);
                    });
                    done();
                });
            });
        });
    });
});