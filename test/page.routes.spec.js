var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);


describe('http requests', function () {

  describe('GET /wiki', function () {
    it('gets 200 on index', function (done) {
      agent
      .get('/wiki')
      .expect(200, done);
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200', function(done) {
      agent
      .get('/wiki/add')
      .expect('Content-Type', /html/)
      .expect(function(res) {
        if (!res.text.includes('Add a Page')) throw new Error("missing title 'Add a Page'");
      })
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle', function () {

    beforeEach(function() {
      return agent
      .post('/wiki')
      .send({authorName: 'jaekwang2', title: "title", authorEmail: "email@email.com", content: 'content'});
    })

    it('responds with 404 on page that does not exist', function(done) {
      agent
      .get('/wiki/somepage')
      .expect('Content-Type', /html/)
      .expect(function(res) {
        //console.log(res);
        //if (!res.text.includes('Add a Page')) throw new Error("missing title 'Add a Page'");
      })
      .expect(404, done);
    });
    it('responds with 200 on page that does exist', function(done) {

      agent
      .get('/wiki/title')
      .expect('Content-Type', /html/)
      .expect(function(res) {
        //console.log(res);
        //if (!res.text.includes('Add a Page')) throw new Error("missing title 'Add a Page'");
      })
      .expect(200, done);
    });
  });

  describe('GET /wiki/search/:tag', function () {
    it('responds with 200');
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist');
    it('responds with 200 for similar page');
  });

  describe('POST /wiki', function () {


    xit('responds with 302', function() {
      agent
      .post('/wiki')
      .send({authorName: 'jaekwang2', title: "title", authorEmail: "email@email.com", content: 'content'})
      .end(function(err, res){
        // Calling the end function will send the request
        console.log("body: ", res, err);
      });
    });

    xit('creates a page in the database');
  });

});
