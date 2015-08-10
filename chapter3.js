var SeparateObjectBindingThis = require('./separateObjectBindingThis');
var separateObjectBindingThis = new SeparateObjectBindingThis();

return separateObjectBindingThis.promiseChain( '123' )
.then(function(result) {
	console.log('Separate Object binding this result', result);
})
.fail( function( error ) {
	console.log( 'hiya', error );
});