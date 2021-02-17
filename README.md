# PropPick

*The easiest way to filter an object properties*

```js
// How to filter "a" and "c" from obj
var obj = { a:1, b:2, c:3, d:4 }

pick( ({ a, c }) => obj );
//=> { a:1, c:3 }
```

## How to Use:
It works using **destructuring**. Just call **pick()** passing a function that:
1. has a **destructred object** as an argument, and
2. returns the object you are pickering from

**Example:**
```js
import pick from 'prop-pick'

// How to pick only "name" and "job" from a "person"
var person = {
    name: 'John',
    age: 33,
    job: 'Designer',
    city: 'New York'
}
pick( ({ name, job }) => person );
//=> { name: 'John', job: 'Designer' }
```

You can also get the data as an **array**. Just set 'array' as the second parameter

**Example:**
```js
// How to pick the data as an array
pick( ({ name, job }) => person, 'array' );
//=> ['John', 'Designer']
```

## Other Examples
### Fetching Data
***without** PropPick:*
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

***using** PropPick:*
```js
function fetchData(){
    const response = api.get('http://localhost:8080/person/10');

    // getting a filtered object with the specific properties
    const personData = pick( ({ name, age, height, job, city }) => response )

    // now just use it 🤗
    setData(personData)
}
```

## How to Install
1. Install it using npm or yarn
    - ``npm install --save prop-pick``
    - ``yarn add prop-pick``
2. Import it
    - ``import pick from 'prop-pick'``
2. Use it 😄

#### That's all folks 😎