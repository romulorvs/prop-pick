function getRealType(val){
    if(typeof val === 'object' && val !== null && !Array.isArray(val)) return 'object';
    if(val === null) return 'null';
    if(Array.isArray(val)) return 'array';

    return typeof val;
}

function pick(props, data, ...options) {
    if (!(['string','array'].includes(getRealType(props)))) return null;
    if (getRealType(data) !== 'object') return null;
  
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
    var isUnnesting = false;
    var objectsToConcat = [];

    for (var optionKey in options) {
        optionKey = parseInt(optionKey)
        var currElem = options[optionKey];

        if(typeof currElem === 'string' && currElem !== 'array' && currElem !== 'unnest') return null;

        // if is neither an object or an 'array' or 'unnest' string
        if(currElem !== 'array' && currElem !== 'unnest' && getRealType(currElem) !== 'object'){
            return null;
        }

        // if is an 'array' or 'unnest' string but is not the last element of options array
        if(currElem === 'array' && currElem === 'unnest' && (optionKey + 1) !== options.length){
            continue;
        }
        
        if(currElem === 'array'){
            isReturningAnArray = true;
        }else if(currElem === 'unnest'){
            isUnnesting = true;
        }else{ // when currElem is an object
            objectsToConcat.push(currElem)
        }
    }

    var returnArr = [];
    var returnObj = {};
    var returnUnnestedObj = {};

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
                    var currKeyType = getRealType(objRef[currKey])

                    objToChange[secondNextKey] = objRef[currKey];

                    if(currKeyType === 'object'){
                        returnUnnestedObj = {...returnUnnestedObj, ...objRef[currKey]};
                    }else{
                        returnUnnestedObj[secondNextKey] = objRef[currKey];
                    }

                    if(isReturningAnArray){
                        if(currKeyType === 'object'){
                            returnArr.push(...Object.values(objRef[currKey]));
                        }else if(currKeyType === 'array'){
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
                    var currKeyType = getRealType(objRef[currKey])

                    objToChange[currKey] = objRef[currKey];

                    if(currKeyType === 'object'){
                        returnUnnestedObj = {...returnUnnestedObj, ...objRef[currKey]};
                    }else{
                        returnUnnestedObj[currKey] = objRef[currKey];
                    }
                    
                    if(isReturningAnArray){
                        if(currKeyType === 'object'){
                            returnArr.push(...Object.values(objRef[currKey]));
                        }else if(currKeyType === 'array'){
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
  
    if(isReturningAnArray) return returnArr;

    return isUnnesting ? returnUnnestedObj : returnObj;
}
module.exports = pick;