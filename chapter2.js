var SeparateObjectPassingThis = require('./separateObjectPassingThis');

var separateObjectPassingThis = new SeparateObjectPassingThis();

return separateObjectPassingThis.promiseChain('123')
.then(function(result) {
	console.log('Separate Object passing this result', result);
})
.fail( function( error ) {
	console.log( 'hiya', error );
});