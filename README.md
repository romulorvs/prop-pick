# PickProps

*The easiest way to filter properties from an object*

**Description:** Returns a filtered copy of an object. Just pick the properties you want.

## How to Use:
It works just like **destructuring**. Just call **pickProps()** passing a function that:
1. has a **destructred object** as an argument, and
2. returns the object you are pickering from

**Example:**
```js
import pickProps from 'PickProps'

// How to pick only name and job from a person object
var person = {
    name: 'John',
    age: 33,
    job: 'Designer',
    city: 'New York'
}
pickProps( ({ name, job }) => person );
//=> { name:'John', job:'Designer' }
```

You can also get the data as an **array**. Just set 'array' as the second parameter

**Example:**
```js
// How to pick the data as an array
pickProps( ({ name, job }) => person, 'array' );
//=> ['John', 'Designer']
```

## Other Examples
### Fetching Data
***without** PickProps:*
```js
function fetchData(){
    const response = api.get('http://localhost:8080/person/10');
    
    // destructuring specific properties from and object
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

***using** PickProps:*
```js
function fetchData(){
    const response = api.get('http://localhost:8080/person/10');

    // getting a filtered object with the specific properties
    const personData = pickProps( ({ name, age, height, job, city }) => response )

    // now just use it 🤗
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