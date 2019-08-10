import {ResultsToHtml} from "../resources/ResultsToHtml.js";
import {TestLog} from "../resources/TestLog.js";
import {getTestMethodNames} from "../resources/Util.js";

export class JSUnitTester {

    static runTests(objectWithTests) {
        let testMethodNames = getTestMethodNames(objectWithTests);
        runInstanceTests(objectWithTests, testMethodNames);
        document.body.innerHTML += ''
            + ResultsToHtml.getTestsSummary(TestLog.getFailLog().length, TestLog.getSuccessLog().length)
            + ResultsToHtml.getFailedTestsTable(TestLog.getFailLog())
            + ResultsToHtml.getSuccessfulTestsTable(TestLog.getSuccessLog());

    }
}


/**
 *
 * @param testClassInstance An instance of a class with unit tests
 * @param testMethodNames The names of the unit test methods
 */
function runInstanceTests(testClassInstance, testMethodNames) {
    //Go through all test methods
    for (let i = 0; i < testMethodNames.length; i++) {
        //Get the current test method name
        let currentTestMethodName = testMethodNames[i];
        //Execute the test function
        testClassInstance[currentTestMethodName]();
    }
}
