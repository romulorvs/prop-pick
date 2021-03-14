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

    var result = pick('', resource, []);
    expect(result).toBe(null);

    var result = pick('', resource, null);
    expect(result).toBe(null);

    var result = pick('', resource, '');
    expect(result).toBe(null);

    var result = pick('', resource, 'abc');
    expect(result).toBe(null);

    var result = pick('', resource, '', resource);
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



    var result = pick(`
        a  >f,
        b>g
    `,resource, 'array');
    expect(result).toEqual([resource.a, resource.b]);

    var result = pick(`
        a  >f
        b>g
    `,resource, 'array');
    expect(result).toEqual([resource.a, resource.b]);

    var result = pick(`
        a > f
        b > g
    `,resource, 'array');
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

    var testeObj = {
        qwe: 123456,
        asd: 'testes'
    }
    var result = pick(' b > z ',resource, arrResource, testeObj);
    expect(result).toEqual({
        z: resource.b,
        ...testeObj,
        ...arrResource
    });

    var result = pick(' b > z ',resource, arrResource, testeObj, 'array');
    expect(result).toEqual([
        resource.b,
        ...Object.values(arrResource),
        ...Object.values(testeObj),
    ]);

    var testeObj2 = {
        z: 555,
        yy: 'xcvxcvxcv'
    }
    var result = pick(' b > z ',resource, arrResource, testeObj, testeObj2);
    expect(result).toEqual({
        z: testeObj2.z,
        ...testeObj,
        ...arrResource,
        yy: testeObj2.yy
    });

    var result = pick(' b > z ',resource, arrResource, testeObj, testeObj2, 'array');
    expect(result).toEqual([
        resource.b,
        ...Object.values(arrResource),
        ...Object.values(testeObj),
        ...Object.values(testeObj2),
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

test('should filter nesting props', function(){
    var mockNestedObj = {
        a: 1,
        b: {
            ba: 1,
            bb: 2
        },
        c: 3
    }

    var result = pick(`
        a > y,
        b: {
            ba > x
        },
        b > w {
            bb> fg
        }
    `, mockNestedObj);
    
    expect(result).toEqual({
        b: {
            x: mockNestedObj.b.ba
        },
        y: mockNestedObj.a,
        w: {
            fg: mockNestedObj.b.bb
        }
    })

    var mockNestedObj = {
        a: {
            b: {
                c: {
                    d: 4,
                    e: 5
                }
            }
        },
    }
    var result = pick(`
        a: {
            b: {
                c: {
                    d,
                    e
                }
            }
        }
    `, mockNestedObj);
    expect(result).toEqual(mockNestedObj)

    var mockNestedObj = {
        a: {
            b: {
                f:{
                    dfg: 123
                },
                c: {
                    d: 4,
                    e: 5
                }
            }
        },
    }
    var result = pick(`
        a: {
            b: {
                c: {
                    e
                    d
                }
                f
            }
        }
    `, mockNestedObj);
    expect(result).toEqual({
        a: {
            b: {
                f:{
                    dfg: 123
                },
                c: {
                    e: 5,
                    d: 4
                },
            }
        },
    })

    var mockNestedObj = {
        a: {
            b: {
                c: {
                    d: 4,
                    e: 5
                }
            },
            f: {
                g: 'teste'
            },
            h:{
                i:{
                    j:{
                        k:{
                            l: 123456
                        },
                        m: 10
                    }
                },
                n:{
                    o: false,
                    p: true,
                    q: null,
                }
            }
        },
        r: 15
    }
    var result = pick(`
        a
        r
    `, mockNestedObj);
    expect(result).toEqual({
        a: {
            b: {
                c: {
                    d: 4,
                    e: 5
                }
            },
            f: {
                g: 'teste'
            },
            h:{
                i:{
                    j:{
                        k:{
                            l: 123456
                        },
                        m: 10
                    }
                },
                n:{
                    o: false,
                    p: true,
                    q: null,
                }
            }
        },
        r: 15
    })

    var mockNestedObj = {
        a: {
            b: {
                c: {
                    d: 4,
                    e: 5
                }
            },
            f: {
                g: 'teste'
            },
            h:{
                i:{
                    j:{
                        k:{
                            l: 123456
                        },
                        m: 10
                    }
                },
                n:{
                    o: false,
                    p: true,
                    q: null,
                }
            }
        },
        r: 15
    }
    var result = pick(`
        a: {
            b: {
                c: {
                    d
                    e
                }
            },
            f: {
                g
            },
            h:{
                i:{
                    j:{
                        k:{
                            l
                        },
                        m
                    }
                },
                n:{
                    o
                    p
                    q
                }
            }
        },
        r
    `, mockNestedObj);
    expect(result).toEqual({
        a: {
            b: {
                c: {
                    d: 4,
                    e: 5
                }
            },
            f: {
                g: 'teste'
            },
            h:{
                i:{
                    j:{
                        k:{
                            l: 123456
                        },
                        m: 10
                    }
                },
                n:{
                    o: false,
                    p: true,
                    q: null,
                }
            }
        },
        r: 15
    })

    var mockNestedObj = {
        a: {
            b: {
                c: {
                    d: 4,
                    e: 5
                }
            },
            f: {
                g: 'teste'
            },
            h:{
                i:{
                    j:{
                        k:{
                            l: 123456
                        },
                        m: 10
                    }
                },
                n:{
                    o: false,
                    p: true,
                    q: null,
                }
            }
        },
        r: 15
    }
    var result = pick(`
        a {
            b {
                c {
                    e>ee
                }
            }
            h{
                i{
                    j{
                        k{
                            l
                        }
                        m
                    }
                }
                n{
                    p>pp
                    q
                }
            }
        }
        r
    `, mockNestedObj);
    expect(result).toEqual({
        a: {
            b: {
                c: {
                    ee: 5
                }
            },
            h:{
                i:{
                    j:{
                        k:{
                            l: 123456
                        },
                        m: 10
                    }
                },
                n:{
                    pp: true,
                    q: null,
                }
            }
        },
        r: 15
    })

    var result = pick(`
        a {
            b {
                c {
                    e>ee
                }
            }
            h{
                i{
                    j{
                        k{
                            l
                        }
                        m
                    }
                }
                n{
                    p>pp
                    q
                }

                xcvd>cvbcvb{
                    cvb
                }
            }
        }
        z{
            zz{
                xcxc
                cvcv
            },
            dfdf
        }
    `, mockNestedObj);
    expect(result).toEqual({
        a: {
            b: {
                c: {
                    ee: 5
                }
            },
            h:{
                i:{
                    j:{
                        k:{
                            l: 123456
                        },
                        m: 10
                    }
                },
                n:{
                    pp: true,
                    q: null,
                }
            }
        },
    })

    var mockNestedObj = {
        a: 1,
        aa: {
            aaa:{
                xcv: 1
            },
            aab: 2, 
        },
        b: {
            c: {
                d: 4
            }
        }
    }
    var result = pick(`
        a: 1,
        aa: {
            aab
            aaa: {}
        },
        b: {
            c
        }
    `, mockNestedObj);
    expect(result).toEqual({
        a: 1,
        aa: {
            aab: 2,
            aaa: {},
        },
        b: {
            c: mockNestedObj.b.c
        }
    })

    var mockNestedObj = {
        a: 1,
        b: {
            ba: 1,
            bb: {
                bbx: 987
            }
        },
        c: 3,
        d:{
            e:{
                ea: 123
            },
            f:{
                ff: 55,
                g:{
                    h:654
                }
            }
        }
    }
    var result = pick(`
        a > y,
        b: {
            ba > x
        },
        b > w {
            bb> fg
        }
        d{
            f{
                g{
                    h
                }
            }
        }
    `, mockNestedObj, 'array');
    expect(result).toEqual([1,1,987,654])

    var tournament = {
        results: {
            top3: ['Anna', 'Beck', 'Carl'],
            time: '01:27:32',
            totalPlayers: 11
        },
        date: '2020-01-03',
        place: 'Manhattan'
    }
    var result = pick(`
        results: {
            time
        },
        place
    `, tournament);
    expect(result).toEqual({
        results: { time: '01:27:32' }, place: 'Manhattan'
    })

    var result = pick(`
        results: {
            top3
        },
        date
    `, tournament);
    expect(result).toEqual({
        results: {
            top3: ['Anna', 'Beck', 'Carl'],
        },
        date: '2020-01-03',
    })

    var result = pick(`
        results: {
            top3
        },
        date
    `, tournament, 'array');
    expect(result).toEqual(['Anna', 'Beck', 'Carl', '2020-01-03']);
})

test('should unnest props', function(){
    var mockNestedObj = {
        a: 1,
        b: {
            ba: 1,
            bb: 2
        },
        c: 3
    }
    var result = pick(`
        a > y,
        b: {
            ba > x
        },
        b > w {
            bb> fg
        }
    `, mockNestedObj, 'unnest');
    expect(result).toEqual({
        y: 1,
        x: 1,
        fg: 2
    })

    var workplace = {
        title: 'ABC Inc.',
        building: {
            area: 2000,
            location: {
                country: 'England',
                state: 'London'
            }
        },
        history: {
            first_CEO: 'John Doe',
            foundation: '1982-01-01'
        }
    }
    var result = pick(`
        title,
        building { location { country } }
        history { first_CEO }
    `, workplace, 'unnest');
    expect(result).toEqual({
        title: 'ABC Inc.',
        country: 'England',
        first_CEO: 'John Doe'
    })


    var workplace = {
        title: 'ABC Inc.',
        building: {
            area: 2000,
            location: {
                country: 'England',
                state: 'London'
            }
        },
        history: {
            first_CEO: 'John Doe',
            foundation: '1982-01-01'
        }
    }
    var result = pick(`
        title > company,
        building { location { country > location } }
        history { first_CEO > CEO }
    `, workplace, 'unnest');
    expect(result).toEqual({
        company: 'ABC Inc.',
        location: 'England',
        CEO: 'John Doe'
    })


    var result = pick(`
        title > company,
        building { location }
        history { first_CEO > CEO }
    `, workplace, 'unnest');
    expect(result).toEqual({
        company: 'ABC Inc.',
        country: 'England',
        state: 'London',
        CEO: 'John Doe'
    })


    var result = pick(`
        title > company,
        building
        history { first_CEO > CEO }
    `, workplace, 'unnest');
    expect(result).toEqual({
        company: 'ABC Inc.',
        area: 2000,
        location: {
            country: 'England',
            state: 'London'
        },
        CEO: 'John Doe'
    })
});