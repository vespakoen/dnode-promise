# dnode-promise

Use promises on your [dnode](https://github.com/substack/dnode) server.

## installation

```shell
npm install --save dnode-promise
```

## api

This package exports one function (take a look inside!) that takes an object of promise-methods and returns an object of dnode style methods.

## usage

server:
```js
var dnode = require('dnode');
var dnodep = require('dnode-promise');
var server = dnode(dnodep.toDnode({
  transform: function (s) {
    return Promise.resolve(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase());
  }
}));
server.listen(5004);
```

client:
```js
var dnode = require('dnode');
var dnodep = require('dnode-promise');
var d = dnode.connect(5004);
d.on('remote', function (methods) {
  var remote = dnodep.toPromise(methods);
  remote.transform('beep')
    .then(function (s) {
      console.log('beep => ' + s);
      d.end();
    });
});
```

If you want a specific promise to be returned from the remote calls,
supply it to the second argument of the `toPromise` method, example:

```js
var BBPromise = require('bluebird');
// ...
var remote = dnodep.toPromise(methods, BBPromise);
remote.transform('beep')
  .then(function (s) {
    console.log('beep => ' + s);
    d.end();
  });
// ...
```

## license

Copyright 2015 Koen Schmeets (hello@koenschmeets.nl)

This project is free software released under the MIT license:
http://www.opensource.org/licenses/mit-license.php
