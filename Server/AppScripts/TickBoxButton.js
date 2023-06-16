/* eslint-disable no-unused-vars */

// TODO Write doc string.

/**
 * Description placeholder
 * @date 6/16/2023 - 6:44:51 PM
 *
 * @param {*} targetCell - The cell to check for a tickbox.
 * @return {boolean} - Returns true if a tick-box exists in the provided cell.
 */
function doesCheckboxExist(targetCell) {
  // TODO add range type to doc
  Logger.log(typeof targetCell);

  const validations = targetCell.getDataValidations();
  const validation = validations[0][0];

  if (validation === null) {
    return false;
  }

  criteria = validation.getCriteriaType();
  hasCheckbox = criteria === SpreadsheetApp.DataValidationCriteria.CHECKBOX;

  return hasCheckbox;
}

/**
 * Checks if a the tickbox in the provided cell is ticked,
 * If ticked, untick it and return true.
 * If unticked or nonexistent, return false.
 * @date 6/16/2023 - 6:03:33 PM
 *
 * @param {object} targetSpreadSheet
 * @param {string} tickBoxA1Notation - The cell reference in global A1 notation.
 * @return {boolean} - Returns true if the tickbox existed and was true.
 * @throws {Error} - Throws an error if tickBoxA1Notation is not a
 *  non empty string.
 */
function tickboxButtonPress(targetSpreadSheet, tickBoxA1Notation) {
  if (typeof tickBoxA1Notation !== "string" || tickBoxA1Notation === "") {
    throw new Error("tickBox_GAON must be a non empty string");
  }

  const range = targetSpreadSheet.getRange(tickBoxA1Notation);

  wasPressed = false;
  if (doesCheckboxExist(range)) {
    cellValue = range.getValue();
    if (cellValue == true) {
      range.setValue(false);
      wasPressed = true;
    }
  }
  return wasPressed;
}

/**
 * This is a test function to test various functions in this file.
 * @date 6/16/2023 - 6:46:45 PM
 */
function TestButtonPress() {
  if (tickboxButtonPress(ss, "Test!E10")) {
    ss.getRange("Test!E11").setValue(Math.random());
  }
}
