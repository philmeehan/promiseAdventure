# A Promise Adventure

I have been working on the plugin-cybersource repository to get it working for Voids, Credits and Debits with the new Soap Integration. A year ago, Kev wrote the code to perform a transaction reversal, and I have adapted this code to do the new actions.

The way Kev wrote the inegration was to new up a separate object each time the code was called (which would allow us to hotswap the authorisation keys each time without having to start the Works).

When I first adapted the code I copied and pasted the code 4 times, until I was sure I was generating the right SOAP payload and then I turned my attention to breaking the scripted code into promise-chained functions. However, I started to encounter issues with the value of 'this', which I have recreated in Chapter 1 below. From working through this issue I think I may have come up with a way to separate things like the Works controllers into separately testable chunks.

This 'adventure' is abstracting the ideas away from our current implementation so we can have a conversation about what is the best way to go.

Please clone this repo and do a npm install.

## Prologue - The Works controller-like function

Run

```
node prologue.js
```

and then take a look at this code

```
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
```

This is then called by

```
var worksController = require('./worksController');

worksController.promiseChain('123');
```

In a Works controller we basically declare a parent function with a load of child functions that are then chained together using promises.

As the child functions are within the scope of the parent they gain access to the variables declared in the parent scope allowing us to store values early on and then access them later (instead of having to pass through a lot of unrelated objects with each resolve).

Unfortunately, this means it is impossible to test each child function as a unit.

## Chapter 1 - Using a separate object

Run

```
node chapter1.js
```

and then take a look at this code

```
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
```

This is then called by

```
var SeparateObjectLosingThis = require('./separateObjectLosingThis');

var separateObjectLosingThis = new SeparateObjectLosingThis();

return separateObjectLosingThis.promiseChain('123');
```

This is where I got to initially when I was breaking apart the plugin-cybersource code to be a promise chain with separate functions.

I was very quickly losing the value held in value1.

However, I did quite like how everything was broken down - things felt a bit more like a Classical OO language, and it feels like the direction that Es6 is leaning as well https://github.com/addyosmani/es6-equivalents-in-es5 - look at the classes section.


### Chapter 2 - Separate Object - Passing Around Self/This
Run

```
node chapter2.js
```

Then read this code (just a fragment this time)

```
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
```

This is where I am currently at with the plugin-cybersource work. My simple solution to the problem above is to just pass this into the promise chain, renaming it to self in the parameter, and then resolving with that value each time.

My thought for if there was a sequence of a Revolver request where we prepare, send and process a request (so you couldn't use this pattern) that I would just put them in a sub chain - as that could be seen as a complete unit.

For me, this feels like it will be unit testable (one of my next challenges), and feels tidier than some of the other things we have played with.


### Chapter 3 - Separate Object - Binding This

Run

```
node chapter3.js
```

Then read this code (fragment)

```
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
```

I showed the passing around this to Kev last week and he suggested maybe looking at using Javascript binding so tonight I have hacked something together.

I must admit my ignorance of bind/call/apply (I have some funny gaps in my JS knowledge) but this also seems to work in this simple case.

In the promise chain function I can't seem to add things to this that is then picked up by the child functions but probably doing something silly.


### Epilogue

Please tell me what you think. Does this feel like the right route to go down? Do you prefer Chapter 3 to Chapter 2?

Maybe use the github issues for feedback