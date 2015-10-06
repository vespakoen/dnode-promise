# dnode-promise

Use promises on your (dnode)[https://github.com/substack/dnode] server.

## installation

```shell
npm install --save dnode-promise
```

## api

This package exports one function (take a look inside!) that takes dnode as the first argument,
the promise methods as the second argument and returns the dnode server with the "node-ified" methods inside.

## usage

```js
var dnode = require('dnode');
var dnodep = require('dnode-promise');
var server = dnodep(dnode, {
    transform : function (s, cb) {
        Promise.resolve(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase());
    }
});
server.listen(5004);
```

## license

Copyright 2015 Koen Schmeets (hello@koenschmeets.nl)

This project is free software released under the MIT license:
http://www.opensource.org/licenses/mit-license.php 
