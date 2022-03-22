
const server = require('./api');
const supertest = require('supertest');
const app = require('./server')
describe('GET /expenses', function(){
    it('respond with json', function(done){
      request(app)
        .get('/expenses')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });