const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);
let Page = require('../models/index.js').Page;
var marked = require('marked');


describe('Page model', function () {


  describe('Virtuals', function () {

    let page;
    beforeEach( function() {

      page = Page.build({
        title: 'this is title',
        content: '# H1'
      });

      //console.log('page:', page);
    });

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function() {
        expect(page.route).to.equal('/wiki/' + page.urlTitle);
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function() {
        expect(marked(page.content)).to.equal('<h1 id="h1">H1</h1>\n');
      });
    });
  });

  describe('Class methods', function () {

    describe('findByTag', function () {
      beforeEach( function(done) {
        Page.sync({force: true}).then( function() {
          return Page.create({
            title: 'this is title',
            content: '# H1',
            tags: ['foo', 'bar']
          });
        }).then( function() {
          done();
        })
      });

      it('gets pages with the search tag', function() {
        return Page.findByTag('foo')
        .then(function(pages) {

          let aryLength = function(ary) {
            return ary.length;
          }
          
          expect(aryLength(pages)).to.be.equal(1);  
        });
      });

      it('does not get pages without the search tag', function() {
        return Page.findByTag('notfoo')
        .then(function(pages) {
          expect(pages).to.have.lengthOf(0);  
        });
      });

    });
  });

  describe('Instance methods', function () {
    
    let page1, page2, page3;
    beforeEach( function() {
      return Page.sync({force: true}).then( function() {
        return Page.create({
            title: 'Page1',
            content: 'Page1 Content',
            tags: ['foo', 'bar']
          }).then( function(page) {
            page1 = page;
            return Page.create({
            title: 'Page2',
            content: 'Page2 Content',
            tags: ['foo', 'notbar']
          })
          }).then( function(page) {
            page2 = page;
            return Page.create({
            title: 'Page3',
            content: 'Page3 Content',
            tags: ['foofoo', 'barbar']
            });
        }).then( function(page) {
          page3 = page;
        })
      })
      //return Promise.all([page1, page2, page3])
    })



    describe('findSimilar', function () {
      it('never gets itself', function(done) {
        //console.log(page2);
        let findAry;

        page1.findSimilar().then( function(similarAry) {
          findAry = similarAry;
        }).then( function() {
          console.log(findAry.length);
          expect(findAry).to.have.lengthOf(1);
          //expect(findAry[0]).to.contain(page2);
        })
        .then( function() {
          done();
        })
      });

      it('gets other pages with any common tags', function(done) {
        let findAry;

        page1.findSimilar().then( function(similarAry) {
          findAry = similarAry;
        }).then( function() {
          console.log(findAry.length);
          expect(findAry).to.have.lengthOf(1);
          //expect(findAry[0]).to.contain(page2);
        })
        .then( function() {
          done();
        })
      });

      
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
