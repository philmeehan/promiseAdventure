var Q = require( 'q' );

var promiseChain = function(initialValue) {
  var value1 = initialValue;
  var value2;
  var value3;

  function firstFunction( ) {
    console.log('First Function (Works Controller)');
    console.log('Initial Value', value1);
    value2 = 'abc';
    return Q.resolve();
  }

  function secondFunction( ) {
    console.log('Second Function (Works Controller)');
    console.log('Initial Value', value1);

    value3 = 'def';
    return Q.resolve();
  }

  function thirdFunction( ) {
    console.log('Third function (Works Controller)');
    console.log('Initial Value', value1);
    return Q.resolve( {
      value1: value1,
      value2: value2,
      value3: value3
   } );
  }

  return firstFunction()
  .then(secondFunction)
  .then(thirdFunction)
}

module.exports = {
  promiseChain: promiseChain
}