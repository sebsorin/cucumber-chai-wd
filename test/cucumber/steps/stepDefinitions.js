

module.exports = function() {

  this.Given(/^I run Cucumber with Protractor$/, function() {
    
  });

  this.Given(/^I go on(?: the website)? "([^"]*)"$/, function(url) {
    browser.get(url);
  });

  this.Then(/the title should equal "([^"]*)"$/, function(text) {
    expect(browser.getTitle()).to.eventually.equal(text);
  });

  this.Then(/^it should return not present when an element disappears within an array$/, 
    function() {
      browser.get('index.html#/form');
      element.all(by.model('color')).then(function(elements) {
        console.log('in alement all')
        var disappearingElem = elements[0];
        expect(disappearingElem.isPresent()).to.eventually.be.true;
        browser.get('index.html#/bindings');
        expect(disappearingElem.isPresent()).to.eventually.be.false;
      });
  });

  this.Then(/^it should get an element from an array$/, function() {
    var colorList = element.all(by.model('color'));

    browser.get('index.html#/form');

    expect(colorList.get(0).getAttribute('value')).to.eventually.equal('blue');
    expect(colorList.get(1).getAttribute('value')).to.eventually.equal('green');
    expect(colorList.get(2).getAttribute('value')).to.eventually.equal('red');
  });

  this.Then(/^it should test non promise assertions as well$/, function() {
      expect(true).to.eventually.be.true;
  });


  this.Then(/^it should get an element from an array using should$/, function() {
    var colorList = element.all(by.model('color'));

    browser.get('index.html#/form');

    colorList.get(0).getAttribute('value').should.eventually.equal('blue');
    colorList.get(1).getAttribute('value').should.eventually.equal('green');
    colorList.get(2).getAttribute('value').should.eventually.equal('red');
  });

};
