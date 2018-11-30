// var request = require('request');
// const baseURL = 'http://localhost:3000/';

describe("Test End-points", function(){
    describe("GET /", function(){
        it("should return a status code of 200 ok", function(done){
            request.get(baseURL, function(err, res, body){
                expect(res.statusCode).toBe(200);
                done();
            });
        }); //end it

        it("should have a body with 'data' key", function(done){
            request.get(baseURL, function(err, res, body){
                expect(body).toBe('Hello, world');
                done();
            });
        }); //end it
    }); //end describe
}); //end describe