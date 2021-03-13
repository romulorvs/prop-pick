function pick(props, data, ...options) {
    if (typeof props !== 'string' && !Array.isArray(props)) return null;
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return null;
  
    var keys = typeof props === 'string'
                ? props
                    .replace(/,/g , ' ') // replacing all commas with spaces
                    .replace(/:/g , ' ') // replacing all : with spaces
                    .replace(/{/g , ' { ') // adding spaces curly brackets
                    .replace(/}/g , ' } ') // adding spaces curly brackets
                    .replace(/>/g , ' > ') // adding spaces around greater than sign
                    .replace(/\s\s+/g, ' ') // replacing multiple spaces with only one
                    .trim()
                    .split(' ')
                : props; // array

    var isReturningAnArray = false;
    var objectsToConcat = [];

    for (var optionKey in options) {
        optionKey = parseInt(optionKey)
        var currElem = options[optionKey];

        if(typeof currElem === 'string' && currElem !== 'array') return null;

        // if is neither an object or an 'array' string
        if(currElem !== 'array' &&
           (typeof currElem !== 'object' || currElem === null || Array.isArray(currElem))
        ){
            return null;
        }

        // if is an 'array' string but is not the last element of options array
        if(currElem === 'array' && (optionKey + 1) !== options.length){
            continue;
        }
        
        if(currElem === 'array'){
            isReturningAnArray = true;
        }else{ // when currElem is an object
            objectsToConcat.push(currElem)
        }
    }

    var returnArr = [];
    var returnObj = {};

    var propKeysRef = [data];
    var objRef = propKeysRef[propKeysRef.length-1];
    var parentKeyRef = '';

    var propKeysToChange = [returnObj];
    var objToChange = propKeysToChange[propKeysToChange.length-1];
    var parentKeyToChange = '';
    
    for (key in keys) {
        key = parseInt(key)
        var currKey = keys[key];
        var beforeKey = keys[key-1];
        var nextKey = keys[key+1];
        var secondNextKey = keys[key+2];
        var thirdNextKey = keys[key+3];

        if(currKey === '>' || beforeKey === '>') continue;

        if(currKey === '{'){

            if(typeof objRef[parentKeyRef] !== 'undefined'){
                propKeysRef.push(objRef[parentKeyRef]);
                objRef = propKeysRef[propKeysRef.length-1];
            }

            if(typeof objToChange[parentKeyToChange] !== 'undefined'){
                propKeysToChange.push(objToChange[parentKeyToChange]);
                objToChange = propKeysToChange[propKeysToChange.length-1];
            }

            continue;
        }else if (currKey === '}'){
            propKeysRef.pop();
            if(propKeysRef.length > 0){
                objRef = propKeysRef[propKeysRef.length-1];
            }
            
            propKeysToChange.pop();
            if(propKeysToChange.length > 0){
                objToChange = propKeysToChange[propKeysToChange.length-1];
            }

            continue;
        }

        if (typeof objRef[currKey] !== 'undefined') {
                
            if(
                typeof nextKey !== 'undefined' &&
                typeof secondNextKey !== 'undefined' &&
                nextKey === '>' &&
                secondNextKey !== '>' &&
                secondNextKey !== '{' &&
                secondNextKey !== '}'
            ){
                if(thirdNextKey === '{'){
                    objToChange[secondNextKey] = {};
                    parentKeyToChange = secondNextKey;
                }else{
                    objToChange[secondNextKey] = objRef[currKey];
                    if(isReturningAnArray){
                        if(typeof objRef[currKey] === 'object' && objRef[currKey] !== null && !Array.isArray(objRef[currKey])){
                            returnArr.push(...Object.values(objRef[currKey]));
                        }else if(Array.isArray(objRef[currKey])){
                            returnArr.push(...objRef[currKey]);
                        }else{
                            returnArr.push(objRef[currKey]);
                        }
                    }
                    parentKeyToChange = ''
                }
                parentKeyRef = currKey;
            }else{
                if(nextKey === '{'){
                    objToChange[currKey] = {};
                    parentKeyToChange = currKey;
                }else{
                    objToChange[currKey] = objRef[currKey];
                    if(isReturningAnArray){
                        if(typeof objRef[currKey] === 'object' && objRef[currKey] !== null && !Array.isArray(objRef[currKey])){
                            returnArr.push(...Object.values(objRef[currKey]));
                        }else if(Array.isArray(objRef[currKey])){
                            returnArr.push(...objRef[currKey]);
                        }else{
                            returnArr.push(objRef[currKey]);
                        }
                    }
                    parentKeyToChange = ''
                }
                parentKeyRef = currKey;
            }
        }
    }
    
    if(objectsToConcat.length > 0){
        if(isReturningAnArray){
            returnArr = returnArr.concat(...objectsToConcat.map(returnObj => Object.values(returnObj)));
        }else{
            returnObj = Object.assign({}, returnObj, ...objectsToConcat);
        }
    }
  
    return isReturningAnArray ? returnArr : returnObj;
}
module.exports = pick;