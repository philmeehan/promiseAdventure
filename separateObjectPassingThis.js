var Q = require('q' );


PromiseAdventure = function() {

}

PromiseAdventure.prototype.promiseChain = function(initialValue) {
  
  console.log('Promise Chain (Separate Object Passing This)');
  console.log('Value 1', this.value1);
  console.log('Value 2', this.value2);
  console.log('Value 3', this.value3);

  return this.firstFunction( this, initialValue )
  .then(this.secondFunction)
  .then(this.thirdFunction)
}

PromiseAdventure.prototype.firstFunction = function(self, initialValue ) {
  this.value1 = initialValue;
  
  console.log('First Function (Separate Object Passing This)');
  console.log('Value 1', self.value1);
  console.log('Value 2', self.value2);
  console.log('Value 3', self.value3);
  return Q.resolve( self );
}

PromiseAdventure.prototype.secondFunction = function(self) {
  self.value2 = 'abc';
  
  console.log('Second Function (Separate Object Passing This)');
  console.log('Value 1', self.value1);
  console.log('Value 2', self.value2);
  console.log('Value 3', self.value3);
  
  return Q.resolve( self );
}

PromiseAdventure.prototype.thirdFunction = function(self) {
  self.value3 = 'def';
  console.log('Third function (Separate Object Passing This)');
  console.log('Value 1', self.value1);
  console.log('Value 2', self.value2);
  console.log('Value 3', self.value3);
  return Q.resolve({
    value1: self.value1,
    value2: self.value2,
    value3: self.value3
 } );
}

module.exports = PromiseAdventure;