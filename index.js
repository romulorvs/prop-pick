function pick(props = '', data = null, type = '') {
    if (typeof props !== 'string' || typeof data !== 'object' ) return null;
    if (Array.isArray(data)) return null;    

    // replace multiple spaces with one
    var propsOneSpace = props.replace(/\s\s+/g, ' ');
    var keys = propsOneSpace.split(' ');
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

export default pick