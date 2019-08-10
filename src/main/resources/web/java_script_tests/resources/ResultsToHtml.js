/**
 * The purpose of this class is to take the test results and generate html.
 */
export class ResultsToHtml {


    /**
     * The number of failed tests are placed in a div tag with an id so that this number can readily be read by a
     * Selenium test to determine if the test was successful of not.
     *
     * @param failCount Number of failed tests
     * @param successCount Number of successful tests
     * @returns {string} An html table with a summary of the test results.
     */
    static getTestsSummary(failCount, successCount) {
        return CSS + `<h1>Results Summary</h1>` +
            `<table cellpadding="5" cellspacing="5">`
            + getRow(SUCCESS_COLOR, ['Success', successCount])
            + getRow(FAIL_COLOR, [`Fail`, `<div id="jsTestsFailCount">${failCount}</div>`])
            + getRow(NEUTRAL_COLOR, [`Total`, successCount + failCount])
            + `</table>`;
    }


    /**
     *
     * @param {Object.<string, string>[]} failedTestsLog
     * @returns {string} An html table with the failed tests
     */
    static getFailedTestsTable(failedTestsLog) {
        return getResultsTable(failedTestsLog, FAIL_COLOR, "Failed Tests", "failedTestsTable");
    }

    /**
     *
     * @param {Object.<string, string>[]} successfulTestsLog
     * @return {string} An html table with the successful tests
     */
    static getSuccessfulTestsTable(successfulTestsLog) {
        return getResultsTable(successfulTestsLog, SUCCESS_COLOR, "Passed Tests", "successfulTestsTable");
    }


}

const FAIL_COLOR = "#F1948A";
const SUCCESS_COLOR = "#7DCEA0";
const NEUTRAL_COLOR = "#F4F6F6";

const CSS = `
    <style>
        body {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 200;
            color: #212529;
        }
    </style>
`;

/**
 *
 * @param {Object.<string, string>[]} resultsArray Holds the results
 * @param color The color of the rows with log entries
 * @param heading Heading of the table
 * @param tableId Id of the table that will be rendered
 * @returns {string} The argument array as an html table.
 */
function getResultsTable(resultsArray, color, heading, tableId) {
    let table = `<h1>${heading}</h1>`
        + `<table cellpadding="5" cellspacing="5" id="${tableId}">`
        + `<tr><th>#</th><th>Test name</th><th>Description</th></tr>`;
    let rowCounter = 0;
    for (let testResult of resultsArray) {
        table += getRow(color, [rowCounter++, testResult.testName, testResult.description]);
    }
    return table + '</table>';
}

/**
 *
 * @param color The color of the row
 * @param cellValues An array of string values. Each value will be a cell in the row.
 * @returns {string} A html table row. Example: <tr bgcolor="red"><td>value 1</td><td>value 2</td></tr>
 */
function getRow(color, cellValues) {
    return ``
        + `<tr bgcolor="${color}">`
        + cellValues.map(cellValue => `<td>${cellValue}</td>`).join('')
        + `</tr>`;
}
