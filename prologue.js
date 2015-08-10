var worksController = require('./worksController');

worksController.promiseChain('123')
.then(function(result) {
	console.log('Works Controller result', result);
})
.fail( function( error ) {
	console.log(error);
} )