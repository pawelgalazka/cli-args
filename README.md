# cli-args ![node version](https://img.shields.io/node/v/%40pawelgalazka%2Fcli-args.svg) [![Build Status](https://travis-ci.org/pawelgalazka/cli-args.svg?branch=master)](https://travis-ci.org/pawelgalazka/cli-args) [![npm version](https://badge.fury.io/js/%40pawelgalazka%2Fcli-args.svg)](https://badge.fury.io/js/%40pawelgalazka%2Fcli-args)
CLI arguments micro parser. Only 38 lines of code, no dependencies.

``` js
#!/usr/bin/env node
const args = require('@pawelgalazka/cli-args')(process.argv.slice(2));
console.dir(args);
```

```
$ script.js -a --foo=bar --boo abc def
{
    params: ['abc', 'def'],
    options: { a: true, foo: 'bar', boo: true }
}
