var Q = require( 'q' );


PromiseAdventure = function() {

}

PromiseAdventure.prototype.promiseChain = function(initialValue) {
  return this.firstFunction( initialValue )
  .then(this.secondFunction)
  .then(this.thirdFunction)
}

PromiseAdventure.prototype.firstFunction = function(initialValue) {
  this.value1 = initialValue; 
  console.log('First Function (Separate Object Losing This)');
  console.log('Value 1', this.value1);
  console.log('Value 2', this.value2);
  console.log('Value 3', this.value3);
  return Q.resolve();
}

PromiseAdventure.prototype.secondFunction = function() {
  this.value2 = 'abc';
  console.log('Second Function (Separate Object Losing This)');
  console.log('Value 1', this.value1);
  console.log('Value 2', this.value2);
  console.log('Value 3', this.value3);
  
  return Q.resolve();
}

PromiseAdventure.prototype.thirdFunction = function() {
  this.value3 = 'def';
  console.log('Third function (Separate Object Losing This)');
  console.log('Value 1', this.value1);
  console.log('Value 2', this.value2);
  console.log('Value 3', this.value3);
  return Q.resolve( {
    value1: this.value1,
    value2: this.value2,
    value3: this.value3
 } );
}

module.exports = PromiseAdventure;