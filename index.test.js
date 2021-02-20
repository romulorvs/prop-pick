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