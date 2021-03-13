# PropPick

*A tool that helps you filter properties from an object*

![npm](https://img.shields.io/npm/dm/prop-pick)
![npm bundle size](https://img.shields.io/bundlephobia/min/prop-pick)

*filtering 'a' and 'c' from obj:*
```js

var obj = { a:1, b:2, c:3, d:4 }

pick('a c', obj) //=> { a:1 , c:3 }

```

*filtering **nested objects**:*
```js

var tournament = {
    results: {
        top3: ['Anna', 'Beck', 'Carl'],
        time: '01:27:32',
        totalPlayers: 11
    },
    date: '2020-01-03',
    place: 'Manhattan'
}

pick(`
    results: {
        time
    },
    place
`, tournament) //=> { results: { time: '01:27:32' }, place: 'Manhattan' }

```

## Usage:
Just call **pick(props, obj)** passing a string with the prop key names, separated by spaces or commas, and the object that you're filtering from.

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
pick(`
    name,
    age,
    city
`, person) //=> { name: 'John', age: 33, city: 'New York' }

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
    name > firstname,
    job > occupation,
    age
`, person) //=> { firstname: 'John', occupation: 'Designer', age: 33 }

```

------------

**Concatenating result with other Objects:**

If you want to join other objects to the result, you can set the pass the objects after the second parameter.

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

// joining 'location' to the result
pick('name age', person, location)
//=> { name: 'Lisa', age: 28, country: 'USA', state: 'California' }


const vehicle = {
    car: 'civic',
    car_year: 2014
}

// joining 'location' and 'vehicle'
pick('name age', person, location, vehicle)
//=> { name: 'Lisa', age: 28, country: 'USA', state: 'California', car: 'civic', car_year: 2014 }

// getting the result as an Array
pick('name age', person, location, vehicle, 'array')
//=> ['Lisa', 28, 'USA', 'California', 'civic', 2014]

```
*Beaware that the filtering will occur only on the object set in the second paramenter. So in the example above, only **person** will be filtered. **location** and **vehicle** will not be.*

------------

**Passing an Array**

What if the property key has some special characters, likes spaces or commas? In this situation, you can set the first parameter as an array of strings.

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
*Beaware that you **cannot rename the prop keys** if you are passing then in an array*

## Installation
1. Install it using npm or yarn
    - ``npm install --save prop-pick``
    - ``yarn add prop-pick``
2. Import it
    - ``import pick from 'prop-pick'``
3. Use it 😄