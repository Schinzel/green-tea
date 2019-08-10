/**
 * The purpose of this class is to log the results of tests executed.
 *
 */
export class TestLog {


    /**
     * Log a successful test
     *
     * @param testName The name of the test. E.g. MyOtherClassTest.squareIt_3_9
     * @param description The message from the test. E.g. 9' is equal to '9'
     */
    static logSuccessfulTest(testName, description) {
        successfulTestsArray.push({testName: testName, description: description});
    }


    /**
     * Log a failed test
     *
     * @param testName The name of the test. E.g. MyOtherClassTest.squareIt_3_9
     * @param message The message from the test. E.g. 9' is not equal to '9'
     */
    static logFailedTest(testName, message) {
        failedTestsArray.push({testName: testName, description: message});
    }


    /**
     *
     * @returns {Object.<string, string>[]} The log of all successful tests
     */
    static getSuccessLog() {
        return successfulTestsArray;
    }

    /**
     *
     * @returns {Object.<string, string>[]} The log of all failed tests
     */
    static getFailLog() {
        return failedTestsArray;
    }

}


/**
 * Log of successful tests
 * @type {Object.<string, string>[]}
 */
let successfulTestsArray = [];
/**
 * Log of failed tests
 * @type {Object.<string, string>[]}
 */
let failedTestsArray = [];
