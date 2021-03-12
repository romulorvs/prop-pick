function pick(props, data, returnTypeOrConcat = '', returnType = '') {
    if (typeof props !== 'string' && !Array.isArray(props)) return null;
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return null;
  
    var obj = {};
    var arr = [];
    var keys = typeof props === 'string'
                ? props
                    .replace(/,/g , ' ') // replacing all commas with spaces
                    .replace(/>/g , ' > ') // adding spaces around greater than sign
                    .replace(/\s\s+/g, ' ') // replacing multiple spaces with only one
                    .trim()
                    .split(' ')
                : props; // array
                
    for (key in keys) {
        key = parseInt(key)
        const beforeKey = keys[key-1];
        const currKey = keys[key];
        if(
            currKey === '>' ||
            (typeof beforeKey !== 'undefined' && beforeKey === '>')
        ){
            continue;
        }

        if (typeof data[currKey] !== 'undefined') {            
            const nextKey = keys[key+1];
            const secondNextKey = keys[key+2];
            if(
                typeof nextKey !== 'undefined' &&
                typeof secondNextKey !== 'undefined' &&
                nextKey === '>' &&
                secondNextKey !== '>'
            ){
                obj[secondNextKey] = data[currKey];
            }else{
                obj[currKey] = data[currKey];
            }
            arr.push(data[currKey]);
        }
    }

    const type = typeof returnTypeOrConcat === 'string' ? returnTypeOrConcat : returnType;
    
    if(typeof returnTypeOrConcat !== 'string'){
        if (typeof returnTypeOrConcat !== 'object' ||
            returnTypeOrConcat === null ||
            Array.isArray(returnTypeOrConcat)
        ){
            return null;
        }

        obj = Object.assign({}, obj, returnTypeOrConcat);
        arr = arr.concat(Object.values(returnTypeOrConcat));
    }
  
    return type === 'array' ? arr : obj;
}
module.exports = pick;