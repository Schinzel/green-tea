import {TestLog} from "../resources/TestLog.js";
import {JSUITester} from "./JSUITester.js";
import {getCallerName} from "../resources/Util.js";

/**
 * The purpose of this class is to assert. The equivalent of doing asserts with
 * jUnit tests in Java.
 *
 */

export class UIAssertThat {

    constructor(elem) {
        //Try and find the element. If there was a sandman.waitUntilExists , then is a probability
        // that the element did not exist before the wait
        this._element = find(elem);
        this._elementExists = this._element.length >= 1;
        //If the argument element does not exist
        if (!this._elementExists) {
            //Create mock element, this so that code does not break in assertions
            this._element = $('<div></div>');
            //Transfer the selector to mock element
            this._element.selector = elem.selector;
        }
    }


    // noinspection JSUnusedGlobalSymbols
    /*********************************************************************************************
     * ASSERT METHODS
     * NOTE, IN ALPHABETICAL ORDER PLEASE
     * Assert methods are all to start with a verb.
     ********************************************************************************************/

    // noinspection JSUnusedGlobalSymbols
    doesNotHaveClass(className) {
        this._assert(!this._element.hasClass(className), `Expected element to not have class '${className}'`);
    }

    // noinspection JSUnusedGlobalSymbols
    exists() {
        this._assert((this._element.length > 0), `Expected element to exists`);
    }

    hasClass(className) {
        this._assert(this._element.hasClass(className), `Expected element to have class '${className}'`);
    }

    // noinspection JSUnusedGlobalSymbols
    hasText(text) {
        let elemIsParagraph = this._element.get(0).tagName.toLowerCase() === 'p';
        //If the argument elem is a p-tag
        let actual = elemIsParagraph
            //Get the inner text. This as the .text() returns innerHtml which can contain line breaks.
            ? this._element.prop("innerText").trim()
            : this._element.text().trim();
        this._assert(actual === text, `Expected text '${text}', actual text was '${actual}'`);
    }

    // noinspection JSUnusedGlobalSymbols
    hasTextThatStartsWith(text) {
        let actualText = this._element.text().trim();
        this._assert(
            (actualText.lastIndexOf(text) === 0),
            `Expected text to start with '${text}', actual text was '${actualText}'`);
    }

    // noinspection JSUnusedGlobalSymbols
    hasValue(value) {
        this._assert(this._element.val().toString() === value, `Excepted element to have value '${value}'`);
    }

    // noinspection JSUnusedGlobalSymbols
    isChecked() {
        this._assert(this._element.is(':checked'), `Expected element to be checked`);
    }

    // noinspection JSUnusedGlobalSymbols
    isNotChecked() {
        this._assert(!this._element.is(':checked'), `Expected element not to be checked`);
    }

    // noinspection JSUnusedGlobalSymbols
    isVisible() {
        this._assert(this._element.is(':visible'), `Expected element to be visible`);
    }

    // noinspection JSUnusedGlobalSymbols
    isNotVisible() {
        this._assert(!this._element.is(':visible'), `Expected element not to be visible`);
    }

    // noinspection JSUnusedGlobalSymbols
    containsText(text) {
        let actualText = this._element.text().trim();
        this._assert(
            (actualText.lastIndexOf(text) !== -1),
            `Expected text to contain '${text}'. Actual text was '${actualText}'`);
    }


    /*********************************************************************************************
     * PRIVATE METHODS
     ********************************************************************************************/

    /**
     * All public asserts should use this function to run the test.
     *
     * @private
     * @param {boolean} testCondition
     * @param {string} assertDescription A description of the test that the describes what the
     * test expected. Let the phrase started with "Expected ... "
     */
    _assert(testCondition, assertDescription) {
        let description = this._elementExists
            ? assertDescription + getDescription(this._element)
            : 'Could not find element ' + this._element.selector;
        //If the element exists AND the test condition was true
        let logFunction = this._elementExists && testCondition
            ? TestLog.logSuccessfulTest
            : TestLog.logFailedTest;
        // noinspection JSValidateTypes
        logFunction(getCallerName(), description);
    }

}

/**
 *
 * @param elem
 * @return {JQuery<HTMLElement>}
 */
function find(elem) {
    //If argument element did not exist
    return (elem.length === 0)
        ? JSUITester.find(elem.selector)
        : elem;
}

/**
 *
 * @param {JQuery<HTMLElement>} element
 * @return {string} A human readable description of the argument element
 */
function getDescription(element) {
    //Add the element tag to description
    let desc = "Tag name: '" + element.prop("tagName").toLowerCase() + "'";
    //If element has id, add id to description
    desc += element.attr('id') ? `, id: '${element.attr('id')}'` : '';
    //If element has name, add name to description
    desc += element.prop('name') ? `, name: '${element.prop('name')}'` : '';
    return desc;
}

