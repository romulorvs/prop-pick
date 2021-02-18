# PropPick

*The easiest way to filter properties from an object*

![npm](https://img.shields.io/npm/dw/prop-pick)
![npm bundle size](https://img.shields.io/bundlephobia/min/prop-pick)
![npm](https://img.shields.io/npm/v/prop-pick)

```js
// filtering "a" and "c" from obj
var obj = { a:1, b:2, c:3, d:4 }

pick( ( a, c ) => obj );
//=> { a:1, c:3 }
```

## Usage:
Just call **pick()** passing a function that receives the properties, as arguments, and returns the object that you're pickering from.

**Example:**
```js
import pick from 'prop-pick'

// filtering "name" and "job" from a "person"
var person = {
    name: 'John',
    age: 33,
    job: 'Designer',
    city: 'New York'
}
pick( ( name, job ) => person );
//=> { name: 'John', job: 'Designer' }
```

You can get the data as an **array** of values. Just set "array" as the second parameter.

**Array Example:**
```js
// returning the data as an array
pick( ( name, job ) => person, "array" );
//=> ['John', 'Designer']
```

## Other Examples
### Fetching Data
***without** PropPick:*
```js
function fetchData(){
    const response = api.get('http://localhost/person/');
    
    // destructuring specific properties from an object
    const { name, age, height, job, city } = response;
    
    // but now you need to pass an object with the same properties (redundancy 😩)
    setData({
        name,
        age,
        height,
        job,
        city
    })
}
```

***using** PropPick:*
```js
function fetchData(){
    const response = api.get('http://localhost/person/');

    // getting a filtered object with the specific properties
    const personData = pick( ( name, age, height, job, city ) => response )

    // now just use it 🤗
    setData(personData)
}
```

## Installation
1. Install it using npm or yarn
    - ``npm install --save prop-pick``
    - ``yarn add prop-pick``
2. Import it
    - ``import pick from 'prop-pick'``
2. Use it 😄

#### That's all folks 😎