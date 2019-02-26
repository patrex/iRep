'use strict';

var assert = require('assert');
var server = require('../build/server');
var req = require('supertest');
var should = require('chai').should();
var chaiexpect = require('chai').expect;
var chaiassert = require('chai').assert;

describe("API Endpoints Test", function () {
    it("get all red-flag records", function (done) {
        req(server).get('/api/v1/red-flags').expect(200).end(function (err, res) {
            if (err) return done(err);
            assert.ok(res.body.status == 200);
            done();
        });
    });

    it("ensure that returned object has is not empty", function (done) {
        req(server).get('/api/v1/red-flags').expect(200).end(function (err, res) {
            if (err) return done(err);
            chaiexpect(res.body).to.not.be.empty;
            done();
        });
    });

    it("ensure that returned object has property 'status'", function (done) {
        req(server).get('/api/v1/red-flags').expect(200).end(function (err, res) {
            if (err) return done(err);
            chaiexpect(res.body).to.have.property('status');
            done();
        });
    });

    it('respond with json for GET /', function (done) {
        req(server).get('/api/v1/red-flags').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });

    it("should get a specific red flag record", function (done) {
        req(server).get('/api/v1/red-flags/1').expect(200).end(function (err, res) {
            if (err) return done(err);
            assert.ok(res.body.status == 200);
            done();
        });
    });

    it('respond with json for GET / specific', function (done) {
        req(server).get('/api/v1/red-flags/1').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });

    it("should modify the location of a specific red-flag record", function (done) {
        req(server).patch("/api/v1/red-flags/redFlagID/location").send({ redFlagID: 1, location: '0,0' }).expect(200).end(function (err, res) {
            if (err) return done(err);
            //assert.ok(res.body.status == 200);
            done();
        });
    });

    //PASSING!
    it('respond with json for POST /', function (done) {
        req(server).post('/api/v1/red-flags').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });

    //PASSING!
    it("should create a red-flag record", function (done) {
        req(server).post('/api/v1/red-flags').set('Connection', 'keep alive').set('Content-Type', 'application/x-www-form-urlencoded')
        //.send('userId=1&postData=Allday&type=red-flag')
        .expect(200).end(function (err, res) {
            if (err) return done(err);
            assert.ok(res.body.status == 201);
            done();
        });
    });

    it("should delete a red-flag record", function (done) {
        req(server).delete('/api/v1/red-flags/1').expect(200).end(function (err, res) {
            if (err) return done(err);
            assert.ok(res.body.status == 201);
            done();
        });
    });

    it('respond with json for DELETE /', function (done) {
        req(server).delete('/api/v1/red-flags/1').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
}); //end describe