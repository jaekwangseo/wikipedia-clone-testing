const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

describe('simple test', function(){
  it('tests addition', function() {

    expect(2+2).to.be.equal(4);
  });

  it('tests settimeout', function(done) {

    let start = new Date();

    setTimeout(function() {
      let duration = new Date() - start;
      expect(duration).to.be.closeTo(1000, 50);
      done();
    }, 1000);

  });

  it('tests chai-spies', function() {
    var tests = [ 1,2,3 ];

    let func = function(arg) {
      console.log(arg);
    }

    let funcSpied = chai.spy(func);
    tests.forEach(funcSpied);
    expect(funcSpied).to.have.been.called.exactly(3);

  });



});
