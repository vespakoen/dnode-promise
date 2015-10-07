# dnode-promise

Use promises on your [dnode](https://github.com/substack/dnode) server.

## installation

```shell
npm install --save dnode-promise
```

## api

### dnodep.toDnode(promiseMethods)
Turns promise methods into functions with the dnode style callback `function (arg, cb) {}`

```js
var dnode = require('dnode');
var dnodep = require('dnode-promise');
var server = dnode(dnodep.toDnode({
  transform: function (url) {
    // lame example of using promises
    return Promise.resolve(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase());
    // returning the value directory (without Promise.resolve) would have worked as well!
  },
}));
server.listen(5004);
```

### dnodep.toPromise(dnodeMethods, PromiseImplementation)
Turns dnode methods to functions returning promises

```js
var dnode = require('dnode');
var dnodep = require('dnode-promise');
var client = dnode.connect(5004);
client.on('remote', function (methods) {
  var remote = dnodep.toPromise(methods);
  remote.transform('beep')
    .then(function (s) {
      console.log('beep => ' + s);
      client.end();
    });
});
```

If you want to use another promise implementation as the default `Promise` to be returned from the remote calls,
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
