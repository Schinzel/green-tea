/**
 * The purpose of this class is to be extended and the class that extends contains test of a
 * web app.
 * A class that extends this needs to extends getPathToPageToTest.
 *
 * Each method is assumed to be a test and will be executed.
 * The following methods are not assumed to be tests:
 * - the constructor
 * - beforeTests and beforeEachTest
 * - methods that start with underscore
 */

export class AbstractTest {


    // noinspection JSMethodCanBeStatic
    /**
     * Optional to extend.
     * Is invoked before the tests in a class are invoked
     */
    beforeTests() {
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Optional to extend.
     * Is invoked before each test in the class are invoked
     */
    beforeEachTest() {
    }


}

