function pick(props, data, type = '') {
    if (typeof props !== 'string' && !Array.isArray(props)) return null;
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return null;
  
    var obj = {};
    var arr = [];
  
    var keys = typeof props === 'string'
                ? props // string
                    .replace(/\s\s+/g, ' ') // replacing multiple spaces with only one
                    .split(' ')
                : props; // array
  
    for (key of keys) {
        if (typeof data[key] !== 'undefined') {
            obj[key] = data[key];
            arr.push(data[key]);
        }
    }
  
    return type === 'array' ? arr : obj;
}
module.exports = pick;