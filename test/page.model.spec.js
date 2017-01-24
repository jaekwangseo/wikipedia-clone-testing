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

      console.log('page:', page);
      //done();
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

      let page;
      beforeEach( function() {

        return Page.create({
          title: 'this is title',
          content: '# H1',
          tags: ['foo', 'bar']
        });
      });

      it('gets pages with the search tag', function(done) {
        Page.findById('foo')
        .then(function(pages) {
          console.log('pages: ', pages);
          expect(pages.length).to.be(1);
          done();
        });
      });

      it('does not get pages without the search tag', function() {

      });

    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
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
