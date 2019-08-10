import {ResultsToHtml} from "../resources/ResultsToHtml.js";
import {TestLog} from "../resources/TestLog.js";
import {Sandman} from "./Sandman.js";
import {AbstractTest} from "./AbstractTest.js";
import {getTestMethodNames} from "../resources/Util.js";

const TEST_IFRAME_NAME = 'testIframe';

export class JSUITester {

    /**
     * Does a jquery-find in the iframe that contains the web app being testet.
     * @param {string} selector A jquery selector. For example 'h1', '#myDivId'
     * @return {JQuery<Text | Comment | Document > | jQuery}
     */
    static find(selector){
        return $("#" + TEST_IFRAME_NAME)
            .contents()
            .find(selector);
    }


    /**
     *
     * @param {AbstractTest} val
     * @return {JSUITester} This for chaining
     */
    setTestObject(val) {
        this._objectWithTests = val;
        return this;
    }

    /**
     *
     * @param {string} val
     * @return {JSUITester} This for chaining
     */
    setPathToPageToTest(val) {
        this._pathToPageToTest = val;
        return this;
    }


    /**
     *
     * @return {Promise<void>}
     */
    async startTests() {
        //clear browser storage
        clearBrowserStorage();
        //Render the iframe for the web app to test
        document.body.innerHTML = getHtmlForIframe(this._pathToPageToTest);
        //Wait until content in iframe has loaded
        await Sandman.waitUntilExists(JSUITester.find('script'));
        //Get the names of the methods to test
        let testMethodNames = getTestMethodNames(this._objectWithTests);
        //Invoke the test methods
        await invokeMethods(this._objectWithTests, testMethodNames);
        //Render the results
        renderResults();
    }

}




/**
 * @param {string} pageToLoad
 * @return {string}
 */
function getHtmlForIframe(pageToLoad) {
    return `<iframe id="${TEST_IFRAME_NAME}" src="${pageToLoad}" 
            width="400" height="800"></iframe>`;
}

/**
 *
 * @param objectWithTests An object with tests to execute
 * @param {string[]} methodNames The names of the methods to execute
 * @return {Promise<void>}
 */
async function invokeMethods(objectWithTests, methodNames) {
    //Call code to run before any test is run
    objectWithTests.beforeTests();
    //Go through all methods with tests
    for (let methodName of methodNames) {
        //Call the code run before each test
        objectWithTests.beforeEachTest();
        //Run the current test method
        await objectWithTests[methodName]();
    }
}


function renderResults() {
    document.body.innerHTML = ''
        + ResultsToHtml.getTestsSummary(TestLog.getFailLog().length, TestLog.getSuccessLog().length)
        + ResultsToHtml.getFailedTestsTable(TestLog.getFailLog())
        + ResultsToHtml.getSuccessfulTestsTable(TestLog.getSuccessLog());
}


/**
 * Clear browser state. Cookies, local and session storage
 */
function clearBrowserStorage() {
    localStorage.clear();
    sessionStorage.clear();
    clearAllCookies();
}


/**
 * Clears all cookies
 */
function clearAllCookies() {
    let cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
}