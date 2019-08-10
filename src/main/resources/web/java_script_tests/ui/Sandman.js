import * as jQuery from '../resources/jquery.js';
import {JSUITester} from "./JSUITester.js";

window.$ = $;
window.jQuery = jQuery;

/**
 * The purpose of this class is to offer functions that sleeps until
 * a condition is met.
 */
export class Sandman {

    // noinspection JSUnusedGlobalSymbols
    /**
     * Calls argument callback function when argument element comes into existence
     *
     * @param {JQuery<HTMLElement>} element
     */
    static async waitUntilExists(element) {
        return waitFor(element, WAIT_FOR_CONDITION.EXISTS);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Calls argument callback function when argument element becomes visible
     *
     * @param {JQuery<HTMLElement>} element
     */
    static async waitUntilIsVisible(element) {
        return await waitFor(element, WAIT_FOR_CONDITION.VISIBLE);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Calls argument callback function when argument element's inner
     * HTML is not empty.
     *
     * @param {JQuery<HTMLElement>} element
     */
    static async waitUntilInnerHtmlNotEmpty(element) {
        return await waitFor(element, WAIT_FOR_CONDITION.NOT_EMPTY);
    }
}


const MAX_SLEEP_TIME_IN_MS = 3000;
const TIME_BETWEEN_CALLS_IN_MS = 150;
const WAIT_FOR_CONDITION = {
    EXISTS: '*',
    VISIBLE: ':visible',
    NOT_EMPTY: ':not(:empty)'
};


/**
 * Function wait for the argument condition to have been met for the the argument element.
 *
 * @param {JQuery<HTMLElement>} element The element to wait for
 * @param {WAIT_FOR_CONDITION} condition The condition, i.e. exists, visible and so on to wait for
 */
async function waitFor(element, condition) {
    let timeSleptInMs = 0;
    //While the condition has not been met
    while (!reFind(element).is(condition)) {
        //If max time to sleep has been exceeded
        if (timeSleptInMs > MAX_SLEEP_TIME_IN_MS) {
            //Throw error
            throwMaxSleepTimeError(element, condition);
        }
        await sleep(TIME_BETWEEN_CALLS_IN_MS);
        timeSleptInMs += TIME_BETWEEN_CALLS_IN_MS;
    }
}


/**
 *
 * @param ms
 * @return {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Throws an error indicating that the argument element did
 * @param element
 * @param {WAIT_FOR_CONDITION} condition The condition, i.e. exists, visible and so on to wait for
 */
function throwMaxSleepTimeError(element, condition) {
    throw "Max sleep time of " + MAX_SLEEP_TIME_IN_MS
    + " ms exceeded when waiting for element with selector '" + element.selector + "'"
    + " to reach condition '" + condition + "'";
}


/**
 * Re-runs the selector of the argument element. Handles if to look
 * in an test-iframe or not automatically.
 * @param {JQuery<HTMLElement>} elem
 * @returns {jQuery}
 */
function reFind(elem) {
    //Re-run selector
    // noinspection JSUnresolvedVariable
    return JSUITester.find(elem.selector);
}