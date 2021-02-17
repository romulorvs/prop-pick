function arrowFn(strFn) {
    if (!strFn.includes('{') || !strFn.includes('}')) {
        return null;
    };

    var arrKeys = strFn.split('{');

    if (arrKeys.length > 0) {
        arrKeys = arrKeys[1].split('}');
    } else {
        return null;
    }

    var keys = arrKeys.length > 0 ? arrKeys[0].trim().split(',') : null;

    if (keys === null) {
        return null
    };

    return keys;
}

function normalFn(strFn) {
    if (!strFn.includes('(') || !strFn.includes(')')) {
        return null
    };

    var arrKeys = strFn.split('(');

    if (arrKeys.length > 0) {
        arrKeys = arrKeys[1].split(')');
    } else {
        return null;
    }

    var param = arrKeys[0].trim();

    if (!param) {
        return null;
    };

    var paramArr = strFn.split(param);

    if (paramArr.length === 0) {
        return null;
    };

    var keys = [];

    for (var i = 0; i < paramArr.length; i++) {
        var key = paramArr[i];

        if (key[0] === '.') {
            var newParam = key.substring(1);

            newParam = newParam.trim();
            if (newParam.indexOf(';') >= 0) {
                newParam = newParam.substring(0, newParam.indexOf(';'));
            }

            newParam = newParam.trim();
            if (newParam.indexOf(',') >= 0) {
                newParam = newParam.substring(0, newParam.indexOf(','));
            }

            newParam = newParam.trim();
            if (newParam.indexOf(' ') >= 0) {
                newParam = newParam.substring(0, newParam.indexOf(' '));
            }

            newParam = newParam.trim();
            if (newParam) {
                keys.push(newParam);
            }
        }
    }

    return keys;
}

function pick(fn, type = '') {
    if (typeof fn !== 'function') {
        return null;
    }

    var data = fn({});

    if (typeof data !== 'object') {
        return null
    };

    var strFn = fn.toString();

    if (typeof strFn !== 'string') {
        return null
    };

    strFn = strFn.trim();

    if (!strFn) {
        return null;
    };

    var keys = strFn.indexOf('function') === 0 ? normalFn(strFn) : arrowFn(strFn);

    if (keys === null) {
        return null;
    };

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

module.exports = pick