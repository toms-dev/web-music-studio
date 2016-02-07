'use strict';

var assert = require('assert');
var userDB = require('../database/requests/users');

describe('Users', function() {

    var username = 'username123456';
    var password = 'username123456';

    describe('add and remove :', function () {

        it('should create a user in db', function (done) {
            userDB.create(username, password, function(err, user) {
                if (err) throw err;
                assert.equal(username, user.username);
                assert(user._id !== undefined);

                userDB.deleteByUsername(username, function(err, user) {
                    if (err) throw err;
                    assert.equal(username, user.username);
                    done();
                });
            });
        });
    });

    describe('operations :', function () {

        before(function() {
            userDB.create(username, password, function(err, user) {
                if (err) throw err;
            });
        });

        after(function() {
            userDB.deleteByUsername(username, function(err, user) {
                if (err) throw err;
            });
        });

        describe('tests :', function() {

            it('should get the created user by username', function() {
                userDB.getByUsername(username, function(err, user) {
                    if (err) throw err;
                    assert.equal(username, user.username);
                });
            });

            it('should try to create a user with the same username', function() {
                userDB.create(username, password, function(err, user) {
                    if (err) throw err;
                    assert(user === undefined);
                });
            });

            it('should return one record from query and only field username', function() {
                userDB.queryUsers({username: username}, {username: 1}, function(err, users) {
                    if (err) throw err;
                    assert.equal(1, users.length);
                });
            });

            it('should return true because the couple username password exists in db', function() {
                userDB.userExists(username, password, function(boolean) {
                    assert.equal(true, boolean);
                });

                userDB.userExists(username+'7', password+'7', function(boolean) {
                    assert.equal(false, boolean);
                });
            });

        });
    });
});