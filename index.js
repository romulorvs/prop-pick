var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(strFunc) {
    var fnStr = strFunc.replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null) result = [];
    return result;
}
/* function above from https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically */

function pick(fn, type = '') {
    if (typeof fn !== 'function') return null;

    var data = fn({});
    if (typeof data !== 'object') return null;

    var strFn = fn.toString();
    if (typeof strFn !== 'string') return null;

    strFn = strFn.trim();
    if (!strFn) return null;
    
    var keys = getParamNames(strFn);
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