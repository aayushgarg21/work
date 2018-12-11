const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

describe('Signup API', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/Signup')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ username: 'test', password: 'test' , email : "test@gmail.com" })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.eql({message : "failed"});
           })
           .end(done);
    }); 
});


describe('Login API', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: 'test2@gmail.com', password: 'test' })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.eql({message : "failed"});
           })
           .end(done);
    }); 
});
describe('Register Name  API', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/register')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ name : "test" , userName : "test"  })
           .expect(401)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.status).to.eql(401);
              expect(response.body).to.eql({ message: 'Application Already Registred' });
           })
           .end(done);
    }); 
});
describe('Register Name  API', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/register-yaml')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ application  : 
            {
                activityname : "test"
            }
               })
           .expect(401)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.status).to.eql(401);
              expect(response.body).to.eql({ message: 'Application Already Registred' });
           })
           .end(done);
    }); 
});