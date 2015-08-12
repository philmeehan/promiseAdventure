var should = require('chai').should();
var sinon = require('sinon');
require('sinon-as-promised');

var validateData = require('../huzz/validateData');
var validateDataStub = sinon.stub();

var getPassword = require('../huzz/getPassword');
var getPasswordStub = sinon.stub();

var processReply = require('../huzz/processReply');
var processReplyStub = sinon.stub();

var promiseAdventure = require('../huzz/');


beforeEach(function() {
	promiseAdventure();
});

describe('promiseAdventure ', function() {
  context('with all promises resolving', function() {

    describe('validateData()', function () {
      it('should have been called once', function() {
        validateDataStub.should.have.been.calledOnce;
      });
    })
    
    describe('getPassword()', function () {
      it('should have been called once', function() {
        getPasswordStub.should.have.been.calledOnce;
      });

      it('should have the correct arguments passed', function () {
        getPasswordStub.yields('foo', 'bar');
      });
    })

    describe('processReply()', function () {
      it('should have been called once', function() {
        processReplyStub.should.have.been.calledOnce;
      });

      it('should have the correct arguments passed', function () {
        processReplyStub.yields('This was stored in state!');
      });
    })
    

    
  });
})
