var validateData = require('./validateData');
var getPassword = require('./getPassword');
var buildXmlRequest = require('./buildXmlRequest');
var sendRequest = require('./sendRequest');
var processReply = require('./processReply');

// If we need to store state, use this obj up in this scope
var higherScopeObj = {};

module.exports = function() {
	validateData().then( function( validateDataResponse ) {
	    // use validateData response to create arguments for getPassword
	    // If you need to pass something to a later method, use higherScopeObj here
	    higherScopeObj.baz = 'This was stored in state!';
	    return getPassword('foo', 'bar');
	} )
	.then( function( getPasswordResponse ) {
	    // use getPassword response to create arguments for buildXmlRequest
	    // If you need to pass something to a later method, use higherScopeObj here
	    return buildXmlRequest();
	} )
	.then( function( buildXmlRequestResponse ) {
	    // use buildXmlRequest response to create arguments for sendRequest
	    // If you need to pass something to a later method, use higherScopeObj here
	    return sendRequest();
	} )
	.then( function( sendRequestResponse ) {
	    // use sendRequest response to create arguments for processReply
	    // If you need to pass something to a later method, use higherScopeObj here
	    return processReply(higherScopeObj.baz);
	} );
}