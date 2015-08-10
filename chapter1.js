var SeparateObjectLosingThis = require('./separateObjectLosingThis');

var separateObjectLosingThis = new SeparateObjectLosingThis();

return separateObjectLosingThis.promiseChain('123')
.then(function(result) {
	console.log('Separate Object losing this result', result);
})
.fail( function( error ) {
	console.log( 'hiya', error );
});