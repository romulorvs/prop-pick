# PropPick

*The easiest way to filter properties from an object*

![npm](https://img.shields.io/npm/dw/prop-pick)
![npm bundle size](https://img.shields.io/bundlephobia/min/prop-pick)
![npm](https://img.shields.io/npm/v/prop-pick)

```js

// filtering 'a' and 'c' from obj
var obj = { a:1, b:2, c:3, d:4 }

pick('a c', obj); // { a:1 , c:3 }

```

## Usage:
Call **pick()** passing a string with the object keys (separated by spaces) and the object that you're pickering from.

```js

import pick from 'prop-pick'

// filtering 'name' and 'job' from person
var person = {
    name: 'John',
    age: 33,
    job: 'Designer',
    city: 'New York'
}

pick('name job', person); // { name: 'John', job: 'Designer' }

```

------------

**Returning an Array:**

You can also get the data as an **array**. Just set 'array' as the third parameter.

```js

pick('name job', person, 'array'); // ['John', 'Designer']

```

------------

**Passing an Array**

What if the property key has spaces? You can set the first parameter as an array of strings.

```js

var business = {
    'sector one': 'office',
    'sector two': 'fabric',
    'sector three': 'shop',
    others: false
}

pick(['sector one', 'sector three', 'others'], business);
// { 'sector one': 'fabric', 'sector three': 'shop', others: false  }

```

## Installation
1. Install it using npm or yarn
    - ``npm install --save prop-pick``
    - ``yarn add prop-pick``
2. Import it
    - ``import pick from 'prop-pick'``
3. Use it 😄