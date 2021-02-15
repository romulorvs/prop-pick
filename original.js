function pickProps(fn, type = '') {

    if (typeof fn !== 'function') return null;

    var data = fn({});

    if (typeof data !== 'object') return null;

    var strFn = fn.toString();

    if (typeof strFn !== 'string') return null;

    strFn = strFn.trim();

    if (!strFn) return null;

    if (!strFn.includes('{') || !strFn.includes('}')) return null;

    var arrKeys = strFn.split('{');

    if (arrKeys.length > 0) {
        arrKeys = arrKeys[1].split('}');
    } else {
        return null;
    }

    var keys = arrKeys.length > 0 ? arrKeys[0].trim().split(',') : null;

    if (!keys) return null;

    var obj = {};
    var arr = [];

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof data[key.trim()] !== 'undefined') {
            obj[key.trim()] = data[key.trim()];
            arr.push(data[key.trim()]);
        }
    }

    return type === 'array' ? arr : obj;
}

module.exports = pickProps