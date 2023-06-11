//https://spreadsheet.dev/working-with-checkboxes-in-google-sheets-using-google-apps-script
function containsCheckbox(a1Notation) {
  var range = ss.getRange(a1Notation);
  var validations = range.getDataValidations();
  return validations[0][0] != null
    && validations[0][0].getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX;
}

//tests if a tick-box is set to true, returns its value and sets the value back to false.
function ButtonPress(tickBox_GAON) {
  returnValue = false;
  if (containsCheckbox(tickBox_GAON)) {
    cellValue = ss.getRange(tickBox_GAON).getValue();
    if (cellValue == true) {
      ss.getRange(tickBox_GAON).setValue(false);
      returnValue = true;
    }
  }
  return returnValue;
}

function TestButtonPress() {

  Logger.log(ButtonPress("Inboxes!I2"))

}