/**
 *
 *
 * @param objectWithTests
 * @return {string[]} An array with method names
 */
export function getTestMethodNames(objectWithTests) {
    // noinspection JSUnresolvedVariable
    return Object
    //Get all methods of argument object
        .getOwnPropertyNames(objectWithTests.constructor.prototype)
        //Remove methods that are not test methods
        .filter((p) =>
            p !== 'constructor' && //Exclude constructor
            p !== 'beforeTests' && //Exclude method named
            p !== 'beforeEachTest' && //Exclude method named
            p !== 'getPathToPageToTest' && //Exclude method named
            !p.startsWith('_')//exclude private methods
        )
        //Sort in alphabetical order
        .sort();
}


/**
 * @returns {String} The name of the class and the function of a test. Example: MyOtherClassTest.squareIt_3_9
 */
export function getCallerName() {
    let callStack = (new Error()).stack;
    if (isChrome) {
        return getCallerNameChrome(callStack);
    } else if (isFirefox || isSafari) {
        return getCallerNameFirefoxSafari(callStack);
    } else {
        throw("Cannot get caller name. Unknown browser.");
    }
}

//Flags for what the current browser is
let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


/**
 *
 * @param callStack The call stack as a string
 * @returns {string} The class and function of the caller
 */
function getCallerNameChrome(callStack) {
    return callStack.split('at ')[4].split(' ')[0];
}


/**
 *
 * @param callStack The call stack as a string
 * @returns {string} The class and function of the caller
 */
function getCallerNameFirefoxSafari(callStack) {
    //Get the row with the caller
    let row = callStack.split('\n')[2];
    //Get the name of the function from the row
    let functionName = row.substring(0, row.indexOf('@'));
    //Get the file name from the row, which is standard is followed should be the class name
    let fileName = row.substring(row.lastIndexOf('/') + 1, row.indexOf('.html'));
    return fileName + '.' + functionName;
}

