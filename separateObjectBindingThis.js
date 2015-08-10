var Q = require( 'q' );


PromiseAdventure = function() {

}

PromiseAdventure.prototype.promiseChain = function( initialValue ) {
  // Can't seem to add anything to this here!!!

  return this.firstFunction( initialValue )
  .then(this.secondFunction)
  .then(this.thirdFunction)
}

PromiseAdventure.prototype.firstFunction = function( initialValue ) {
  this.value1 = initialValue;
  
  console.log('First Function (Separate Object Binding This)');
  console.log('Value 1', this.value1);
  console.log('Value 2', this.value2);
  console.log('Value 3', this.value3);
  return Q.resolve();
}.bind(this)

PromiseAdventure.prototype.secondFunction = function( ) {
  this.value2 = 'abc';
  
  console.log('Second Function (Separate Object Binding This)');
  console.log('Value 1', this.value1);
  console.log('Value 2', this.value2);
  console.log('Value 3', this.value3);
  
  return Q.resolve();
}.bind(this)

PromiseAdventure.prototype.thirdFunction = function( ) {
  this.value3 = 'def';
  console.log('Third function (Separate Object Binding This)');
  console.log('Value 1', this.value1);
  console.log('Value 2', this.value2);
  console.log('Value 3', this.value3);
  return Q.resolve( {
    value1: this.value1,
    value2: this.value2,
    value3: this.value3
 } );
}.bind(this)

module.exports = PromiseAdventure;