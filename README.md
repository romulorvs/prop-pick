# PickProps

*The easiest way to pick properties from an object*

**Description:**
PickProps returns a filtered copy of an object.

**How to Use:**
It works just like **destructuring**:

```js
import pickProps from 'PickProps'

// filtering "a" and "c"
pickProps( ({ a, c }) => ({a:1, b:2, c:3, d:4}) );
//=> { a:1, c:3 }

var person = {
    name: 'John',
    age: 33,
    job: 'Designer',
    city: 'New York'
}
pickProps( ({ name, job }) => person);
//=> { name:'John', job:'Designer' }
```

You can also get the data as an **array** of values
```js
pickProps( ({ name, city }) => person, 'array'); // set 'array' as the second parameter
//=> ['John', 'Designer']
```

## Examples
*fetching data **without** PickProps:*
```js
function fetchData(){
    
    const url = 'http://localhost:8080/person/10';
    
    // destructuring specific properties from and object
    const { name, age, height, job, city } = api.get(url);
    
    // but now you need to pass an object with the same properties (redundancy)
    setData({
        name,
        age,
        height,
        job,
        city
    })
}
```

*fetching data **using PickProps***:
```js
function fetchData(){
    
    const url = 'http://localhost:8080/person/10';

    // getting a filtered object with the specific properties
    const personData = pickProps( ({ name, age, height, job, city }) => api.get(url) )

    // now just pass it
    setData(personData)
}
```

## How to Install
1. Install it using npm or yarn
    - ``npm install --save pickprops``
    - ``yarn add pickprops``
2. Import it
    - ``import pickProps from 'pickprops'``
2. Use it 😄

#### That's all folks 😎