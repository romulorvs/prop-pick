# PropPick

*The easiest way to filter properties from an object*

![npm](https://img.shields.io/npm/dm/prop-pick)
![npm bundle size](https://img.shields.io/bundlephobia/min/prop-pick)

```js

// filtering 'a' and 'c' from obj
var obj = { a:1, b:2, c:3, d:4 }

pick('a c', obj) //=> { a:1 , c:3 }

```

## Usage:
**pick(props, obj)** *// **props** is a **String** with the object keys (separated by **spaces** or **commas**). **obj** is the **Object** that you're filtering from*.

```js

import pick from 'prop-pick'

var person = {
    name: 'John',
    age: 33,
    job: 'Designer',
    city: 'New York'
}

// filtering 'name' and 'job' from 'person'
pick('name job', person) //=> { name: 'John', job: 'Designer' }

// you can also separate the keys by commas
pick('name, age, city', person) //=> { name: 'John', age: 33, city: 'New York' }

```

------------


**Returning an Array:**

You can also get the data as an **array**. Just set 'array' as the last parameter.

```js

pick('name job', person, 'array') //=> ['John', 'Designer']

```

------------

**Renaming the props:**

You can rename the prop keys using a greater than sign (**>**).

```js

// renaming 'name' to 'firstname' and 'job' to 'occupation'
pick(`
    name > firstname
    job > occupation
`, person) //=> { firstname: 'John', occupation: 'Designer' }

```

------------

**Concatenating another Object:**

If you want to join another object to the result, you can set the third parameter as an object.

```js

const person = {
    name: 'Lisa',
    job: 'Developer',
    age: 28
}

const location = {
    country: 'USA',
    state: 'California'
}

// filtering 'name' and 'age' from 'person', and joining 'location'
pick('name age', person, location) //=> { name: 'Lisa', age: 28, country: 'USA', state: 'California' }

// getting the result as an Array
pick('name age', person, location, 'array') //=> ['Lisa', 28, 'USA', 'California']

```
*Beaware that the filtering will occur only on the object set in the second paramenter. So in the example above, only **person** will be filtered. **location** will not be.*

------------

**Passing an Array**

What if the property key has spaces or commas? In this situation, you can set the first parameter as an array of strings.

```js

var business = {
    'sector one': 'office',
    'sector, two': 'fabric',
    ' sector, three ': 'shop',
    others: false
}

pick(['sector one', ' sector, three ', 'others'], business)
//=> { 'sector one': 'fabric', ' sector, three ': 'shop', others: false  }

```

## Installation
1. Install it using npm or yarn
    - ``npm install --save prop-pick``
    - ``yarn add prop-pick``
2. Import it
    - ``import pick from 'prop-pick'``
3. Use it 😄