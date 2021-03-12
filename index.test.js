var pick = require('./index');
var resource = { a: 1, b: 2, c:3, d:4 };
var arrResource = {
    'sector one': 1,
    ' sector  two ': 2,
    ' sector, three ': 3,
    ',sector,four,': 4,
    other: false
};
test('should filter when separeted by spaces', function(){
    var result = pick('a c', resource);
    expect(result).toEqual({ a:1, c:3});

    result = pick('a    c', resource);
    expect(result).toEqual({ a:1, c:3});

    result = pick('  a   c  ', resource);
    expect(result).toEqual({ a:1, c:3});
});

test('should filter when separeted by comma', function(){
    var result = pick('a, c', resource);
    expect(result).toEqual({ a:1, c:3});

    result = pick('a,c', resource);
    expect(result).toEqual({ a:1, c:3});

    result = pick(' a, c,', resource);
    expect(result).toEqual({ a:1, c:3});

    result = pick(',a,c,', resource);
    expect(result).toEqual({ a:1, c:3});

    result = pick(',a b, c,', resource);
    expect(result).toEqual({ a:1, b:2, c:3});
});

test('should filter when passing an array', function(){

    var result = pick(['sector one'], arrResource);
    expect(result).toEqual({'sector one':1});

    var result = pick([
        'sector one',
        ' sector  two ',
        ' sector, three ',
        ',sector,four,',
        'other'
    ], arrResource);
    expect(result).toEqual({
        'sector one':1,
        ' sector  two ':2,
        ' sector, three ':3,
        ',sector,four,':4,
        other: false
    });
});

test('should return an array', function(){
    var result = pick('a c', resource, 'array');
    expect(result).toEqual([1, 3]);

    var result = pick(['sector one', 'other'], arrResource, 'array');
    expect(result).toEqual([1, false]);
});


test('should return an empty object if passing an empty string or empty array', function(){
    var result = pick('', resource);
    expect(result).toEqual({});

    var result = pick([], arrResource);
    expect(result).toEqual({});
});

test('should ignore a not found key',function(){
    var result = pick('a c f', resource);
    expect(result).toEqual({a: 1, c: 3});

    var result = pick(['sector one', 'sector five'], arrResource);
    expect(result).toEqual({'sector one': 1});

    var result = pick('f', resource);
    expect(result).toEqual({});

    var result = pick(['sector five'], arrResource);
    expect(result).toEqual({});
});

test('should return null if any paremeter has a wrong type', function(){
    var result = pick(null,resource);
    expect(result).toBe(null);

    var result = pick(123,resource);
    expect(result).toBe(null);

    var result = pick(123.1,resource);
    expect(result).toBe(null);

    var result = pick({},resource);
    expect(result).toBe(null);

    var result = pick('',[]);
    expect(result).toBe(null);

    var result = pick('',null);
    expect(result).toBe(null);

    var result = pick('',123);
    expect(result).toBe(null);

    var result = pick('',123.1);
    expect(result).toBe(null);
});

test('should concatenate objects', function(){
    var result = pick('a, c',resource, arrResource);
    expect(result).toEqual({
        a: resource.a,
        c: resource.c,
        ...arrResource
    });
    
    var result = pick('a, c',resource, arrResource, 'array');
    expect(result).toEqual([
        resource.a,
        resource.c,
        ...Object.values(arrResource)
    ]);
});

test('should rename props', function(){

    var result = pick('b>z',resource);
    expect(result).toEqual({
        z: resource.b
    });

    var result = pick('a>f b>g',resource);
    expect(result).toEqual({
        f: resource.a,
        g: resource.b
    });

    var result = pick('a>f b>g, c>h',resource);
    expect(result).toEqual({
        f: resource.a,
        g: resource.b,
        h: resource.c
    });

    var result = pick('a>c b>c',resource);
    expect(result).toEqual({
        c: resource.b
    });

    var result = pick('a>c, b>c',resource);
    expect(result).toEqual({
        c: resource.b
    });

    var result = pick('b >z',resource);
    expect(result).toEqual({
        z: resource.b
    });

    var result = pick('a  > f b>   g  ',resource);
    expect(result).toEqual({
        f: resource.a,
        g: resource.b
    });

    var result = pick('   a>f b   >g, c >   h',resource);
    expect(result).toEqual({
        f: resource.a,
        g: resource.b,
        h: resource.c
    });

    var result = pick(' a > c b > c',resource);
    expect(result).toEqual({
        c: resource.b
    });

    var result = pick('a > c , b > c ',resource);
    expect(result).toEqual({
        c: resource.b
    });

    var result = pick('a>f b>g', resource, {g: 11});
    expect(result).toEqual({
        f: resource.a,
        g: 11
    });

    var result = pick('b>z',resource, 'array');
    expect(result).toEqual([resource.b]);

    var result = pick(' a  >f b>g',resource, 'array');
    expect(result).toEqual([resource.a, resource.b]);

    var result = pick('b>z',resource, arrResource);
    expect(result).toEqual({
        z: resource.b,
        ...arrResource
    });

    var result = pick('a>   f b>  g   ',resource, arrResource);
    expect(result).toEqual({
        f: resource.a,
        g: resource.b,
        ...arrResource
    });

    var result = pick(' b > z ',resource, arrResource, 'array');
    expect(result).toEqual([
        resource.b,
        ...Object.values(arrResource)
    ]);

    var result = pick(' a  >f b>  g  ',resource, arrResource, 'array');
    expect(result).toEqual([
        resource.a,
        resource.b,
        ...Object.values(arrResource)
    ]);

    var result = pick(' b > za > c ',resource);
    expect(result).toEqual({
        za: resource.b,
    });
});