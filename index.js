function pick(props, data, ...options) {
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

    var returnArray = false;
    var objectsToConcat = [];

    for (var optionKey in options) {
        var currElem = options[optionKey];

        if(typeof currElem === 'string' && currElem !== 'array') return null;
        if(
            currElem !== 'array' &&
            (typeof currElem !== 'object' || currElem === null || Array.isArray(currElem))
        ){
            return null;
        }

        if(currElem === 'array' && (parseInt(optionKey) + 1) !== options.length){
            continue;
        }
        
        if(currElem === 'array'){
            returnArray = true;
        }else{ // when currElem is an object
            objectsToConcat.push(currElem)
        }
    }
                
    for (key in keys) {
        key = parseInt(key)
        var beforeKey = keys[key-1];
        var currKey = keys[key];
        if(
            currKey === '>' ||
            (typeof beforeKey !== 'undefined' && beforeKey === '>')
        ){
            continue;
        }

        if (typeof data[currKey] !== 'undefined') {
            if(returnArray){
                arr.push(data[currKey]);
            }else{
                var nextKey = keys[key+1];
                var secondNextKey = keys[key+2];
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
            }
        }
    }
    
    if(objectsToConcat.length > 0){
        if(returnArray){
            arr = arr.concat(...objectsToConcat.map(obj => Object.values(obj)));
        }else{
            obj = Object.assign({}, obj, ...objectsToConcat);
        }
    }
  
    return returnArray ? arr : obj;
}
module.exports = pick;