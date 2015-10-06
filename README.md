# dnode-promise

Use promises on your [dnode](https://github.com/substack/dnode) server.

## installation

```shell
npm install --save dnode-promise
```

## api

This package exports one function (take a look inside!) that takes an object of promise-methods and returns an object of dnode style methods.

## usage

```js
var dnode = require('dnode');
var dnodep = require('dnode-promise');
var methods = dnodep({
  transform: function (s) {
    // sorry, lame example =)
    return Promise.resolve(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase());
  }
});
var server = dnode(methods);
server.listen(5004);
```

## license

Copyright 2015 Koen Schmeets (hello@koenschmeets.nl)

This project is free software released under the MIT license:
http://www.opensource.org/licenses/mit-license.php
