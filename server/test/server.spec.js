let chai = require('chai');
let should = chai.should();

const assert = require('assert')
let server = require('../index');
const req = require('supertest');

describe("API Endpoints Test", function(){
    it("get all red-flag records", function(done){
        req(server).get('/api/v1/red-flags')
            .expect(200).end((err, res) => {
                if(err) return done(err);
                assert.ok(res.body.status == 200);
                done();
            });
    });

    it('respond with json for GET /', function(done) {
        req(server)
          .get('/api/v1/red-flags')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

    it("should get a specific red flag record", function(done){
        req(server).get('/api/v1/red-flags/1')
            .expect(200).end((err, res) => {
                if(err) return done(err);
                assert.ok(res.body.status == 200);
                done();
            });
    });

    it('respond with json for GET / specific', function(done) {
        req(server)
          .get('/api/v1/red-flags/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

    it("should modify the location of a specific red-flag record", function(done){
        req(server).patch('/api/v1/red-flags/1/1.0,2.0')
            .expect(200).end((err, res) => {
                if(err) return done(err);
                assert.ok(res.body.status == 201);
                done();
            });
    });

    it('respond with json for PATCH / location', function(done) {
        req(server)
          .patch('/api/v1/red-flags/1/1.0, 2.0')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

    //PASSING!
    it('respond with json for POST /', function(done) {
        req(server)
          .post('/api/v1/red-flags')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });
    
    //PASSING!
    it("should create a red-flag record", function(done){
        req(server).post('/api/v1/red-flags')
            .set('Connection', 'keep alive')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('userId',1)
            .field('postData', 'All Day')
            .field('type', 'red-flag')
            //.send('userId=1&postData=Allday&type=red-flag')
            .expect(200).end((err, res) => {
                if(err) return done(err);
                assert.ok(res.body.status == 201);
                done();
            });
    });

    it("should delete a red-flag record", function(done){
        req(server).delete('/api/v1/red-flags/1')
            .expect(200).end((err, res) => {
                if(err) return done(err);
                assert.ok(res.body.status == 201);
                done();
            });
    });

    it('respond with json for DELETE /', function(done) {
        req(server)
          .delete('/api/v1/red-flags/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

}); //end describe

