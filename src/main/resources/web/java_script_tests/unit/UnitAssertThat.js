import {TestLog} from "../resources/TestLog.js";
import {getCallerName} from "../resources/Util.js";
/**
 * The purpose of this class is to perform the asserts of JavaScript unit tests
 *
 * @author schinzel
 */
export class UnitAssertThat {


    constructor(actual) {
        this.actual = actual;
        this.callerName = getCallerName();
    }

    logSuccess(message) {
        TestLog.logSuccessfulTest(this.callerName, message);
    }

    logFail(message) {
        TestLog.logFailedTest(this.callerName, message);
    }

    isEqualTo(expected) {
        if (this.actual === expected) {
            let successMessage = `'${this.actual}' is equal to '${expected}'`;
            this.logSuccess(successMessage);
        } else {
            let failMessage = `'${this.actual}' is not equal to expected '${expected}'`;
            this.logFail(failMessage);
        }
    }

    isTrue() {
        if (typeof this.actual === "boolean" && this.actual === true) {
            let successMessage = `'${this.actual}' is true`;
            this.logSuccess(successMessage);
        } else {
            let failMessage = `'${this.actual}' is not true`;
            this.logFail(failMessage);
        }
    }

    isFalse() {
        if (typeof this.actual === "boolean" && this.actual === false) {
            let successMessage = `'${this.actual}' is false`;
            this.logSuccess(successMessage);
        } else {
            let failMessage = `'${this.actual}' is not false`;
            this.logFail(failMessage);
        }
    }

    isSameInstanceOf(expectedInstance) {
        let expectedToString = expectedInstance.toString();
        // Remove all chars that is after the {-symbol Ie : class MortgageLoans { constructor(mortgageLoansObject = null) { AND SO ON...
        let expectedInstanceAsString = expectedToString.substr(0,expectedToString.indexOf('{'));
        let actualInstanceAsString = this.actual.constructor.name;

        if (this.actual instanceof expectedInstance) {
            let successMessage = `'${actualInstanceAsString}' is same instance as '${expectedInstanceAsString}'`;
            this.logSuccess(successMessage);
        } else {
            let failMessage = `'${actualInstanceAsString}' is not the same instance as '${expectedInstanceAsString}'`;
            this.logFail(failMessage);
        }
    }
}




